import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },// Ramp-up to 10 users over 1 minute
    { duration: '3m', target: 10 },// Stay at 10 users for 3 minutes
    { duration: '1m', target: 0 },// Ramp-down to 0 users
  ],
};

const BASE_URL = 'http://165.232.174.152:8075';
const LOGIN_URL = `${BASE_URL}/web/login`;
const DASHBOARD_URL = `${BASE_URL}/web#action=675&cids=1&menu_id=473`;

export default function () {
  // Step 1: Load the login page to retrieve CSRF token
  let res = http.get(LOGIN_URL);
  console.log('Login page response status:', res.status);

  // Extract the CSRF token
  let csrfToken = res.html().find('script[id="web.layout.odooscript"]').text();
  csrfToken = /csrf_token: ["']([\w]+)["']/.exec(csrfToken)?.[1];
  console.log('Extracted CSRF Token:', csrfToken);

  check(csrfToken, { 'CSRF token retrieved': (token) => token !== undefined });

  if (!csrfToken) {
    console.error('Failed to retrieve CSRF token');
    return;
  }

  // Step 2: Login with credentials
  const payload = {
    csrf_token: csrfToken,
    login: 'kaungphonewai1999@gmail.com',
    password: '12345678',
    redirect: '',
  };

  const params = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': BASE_URL,
      'Referer': LOGIN_URL,
    },
  };

  // Include cookies from the initial response
  const cookies = res.cookies;
  if (cookies) {
    params.headers['Cookie'] = Object.keys(cookies)
      .map((key) => `${key}=${cookies[key][0].value}`)
      .join('; ');
    console.log('Cookies sent with login:', params.headers['Cookie']);
  }

  res = http.post(LOGIN_URL, payload, params);
  console.log('Login POST response status:', res.status);
  console.log('Login response body:', res.body);

  // Check if session info exists in the response body
  const sessionInfoExists = res.body.includes('odoo.__session_info__');
  check(sessionInfoExists, { 'Session info exists': (exists) => exists });

  if (!sessionInfoExists) {
    console.error('Login failed: No session info in response body');
    return;
  }

  // Step 3: Navigate to the dashboard to confirm login
  const dashboardRes = http.get(DASHBOARD_URL, {
    headers: {
      Cookie: params.headers['Cookie'],
    },
  });


  console.log('Dashboard response status:', dashboardRes.status);
  check(dashboardRes, {
    'Dashboard loaded': (r) => r.status === 200 && r.body.includes('Dashboard'),
  });

  sleep(1);
}

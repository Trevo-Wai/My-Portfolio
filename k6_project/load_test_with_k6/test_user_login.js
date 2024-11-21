import http from 'k6/http';
import { check, group } from 'k6';
import { sleep } from 'k6';

const BASE_URL = 'http://165.232.174.152:8075';
const LOGIN_URL = `${BASE_URL}/web/login`;

const users = [
  { username: 'kaungphonewai1999@gmail.com', password: '12345678' },
  { username: 'ebade094-99a2-438d-a6ef-16e52ea24f84@mailslurp.biz', password: '12345678' },
];

export let options = {
  vus: 2, // Simulate virtual users
  iterations: 2, // Each user will perform the test once
};

export default function () {
  // Get a unique user for each VU
  const user = users[__VU - 1]; // __VU is the virtual user ID (1-indexed)

  // Step 1: Load the login page to get CSRF token
  const loginPageRes = http.get(LOGIN_URL);
  check(loginPageRes, {
    'Login page loaded': (r) => r.status === 200,
  });

  // Extract CSRF token
  const csrfTokenMatch = loginPageRes.body.match(/csrf_token:\s+"([a-f0-9]+o[0-9]+)"/);
  const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

  if (!csrfToken) {
    console.error(`User ${user.username}: Failed to extract CSRF token`);
    return;
  }

  console.log(`User ${user.username}: Extracted CSRF Token: ${csrfToken}`);

  // Step 2: Log in with the user's credentials
  const loginPayload = {
    csrf_token: csrfToken,
    login: user.username,
    password: user.password,
    redirect: '',
  };

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  check(loginRes, {
    'Login successful': (r) => r.status === 303 || r.status === 200,
  });

  // Extract session cookie
  const sessionCookie = loginRes.cookies.session_id ? loginRes.cookies.session_id[0].value : null;

  if (!sessionCookie) {
    console.error(`User ${user.username}: Session cookie not found after login`);
    return;
  }

  console.log(`User ${user.username}: Session Cookie: ${sessionCookie}`);

  // Step 3: Handle the redirect or find the user's unique dashboard URL
  const dashboardUrl = loginRes.headers.Location || `${BASE_URL}/web#action=675&cids=1&menu_id=473`;
  console.log(`User ${user.username}: Dashboard URL: ${dashboardUrl}`);

  // Step 4: Navigate to the dashboard
  const dashboardRes = http.get(dashboardUrl, {
    headers: { Cookie: `session_id=${sessionCookie}` },
  });

 
  console.log(`User ${user.username}: Dashboard Response Status: ${dashboardRes.status}`);
  //console.log(`User ${user.username}: Dashboard Response Body Snippet: ${dashboardRes.body.substring(0, 200)}`);

  

  // Log the result
  console.log(`User ${user.username}: Test completed.`);
  sleep(1); // Simulate a pause before the next iteration
}

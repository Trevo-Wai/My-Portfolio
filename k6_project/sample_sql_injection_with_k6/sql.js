import http from 'k6/http';
import { check } from 'k6';

// Base URL of the application
const BASE_URL = 'http://165.232.174.152:8075/home';

export default function () {
    // SQL Injection in URL Parameters
    let sqlInjectionUrlRes = http.get(`${BASE_URL}/profile?user_id=1' OR '1'='1`);

    // Check if the SQL Injection attempt is handled correctly
    check(sqlInjectionUrlRes, {
        'SQL injection in URL parameters rejected': (r) => r.status === 400 || r.status === 403,
    });
}
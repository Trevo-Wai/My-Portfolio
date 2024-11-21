### Files
## 1. `test_user_login.js`
This script tests the user login functionality with multiple users. It simulates login behavior using virtual users and validates:
- CSRF token retrieval
- Successful login with credentials
- Session cookie generation
- Redirection to the user's dashboard

## 2. `test_dashboard_load.js`
This script tests the dashboard's load handling under different stages:
-Ramp-up to 10 users over 1 minute.
-Maintain 10 users for 3 minutes.
-Ramp-down to 0 users over 1 minute.

 Note* you can change duration (10m) and target (100) to perform stress testing 



### How to Run
1. Open the terminal in this folder.
2. Run the following command:
   ```bash
   k6 run test_user_login.js
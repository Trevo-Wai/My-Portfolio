### Files
## 1. `ME_register.cy.js`
This test script performs user registration and OTP verification using Cypress. It leverages:
-MailSlurp for creating mock email addresses and handling OTP verification.
-Faker.js for generating random user details such as names and addresses.

# Features
-Automates user registration on the specified environment (Testing, UAT, or Production).
-Mocks email addresses using MailSlurp for OTP verification.
-Uses Faker.js to generate realistic, random user data.
-Tests all major aspects of the registration flow, including form filling, email OTP handling, and agreement verification.

# Prerequisites: Install Dependencies
-Cypress should install

-Install MailSlurp
 ```bash
  
  npm install cypress-mailslurp mailslurp-client --save-dev
  
  ```
-Install Faker.js
 ```bash
  
  npm install @faker-js/faker --save-dev
  
  ```
# Script Details
# MailSlurp Integration
  -The script integrates MailSlurp to:
   Create a unique email inbox for each test run.
   Wait for the OTP email and extract the OTP from the email body.

# Faker.js Integration
  -The script uses Faker.js to randomly generate:
  First and last names.
  Other user-related data for a more dynamic and realistic test.

  Note * Ensure the MailSlurp API key is active and has sufficient limits.

---

## 2. `test_dashboard_load.js`
This Cypress test script verifies the calculation of **Point Given** values against **PPE (Give)** values on the Mediearth UAT platform. It loops through table rows, validates calculations, and logs discrepancies.

---

# How the Test Works
**1.Navigation**
The script visits the specified URL, logs in, and waits for the page to load.

**2.Row Iteration**
Loops through each table row and navigates to a detailed member page.

**3.Validation**
Checks if Point Given === Math.floor(PPE (Give) / 20).
Logs results for each row in the console.

**4.Skipping Rows**
If .o_stat_info contains "0", the script skips further actions for that row.

**5.Return Navigation**
Returns to the main table after each validation.

---
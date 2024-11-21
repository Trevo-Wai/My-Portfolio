// Import dependencies
import 'cypress-mailslurp';
const { faker } = require('@faker-js/faker');
const { MailSlurp } = require('mailslurp-client');

const apiKey = '6c0da93c148097fcfc183be851706a4b1fefade95c990743aff7867596a941a2';
const mailslurp = new MailSlurp({ apiKey });

describe('Register and Verify OTP with MailSlurp', () => {
  const baseURLs = {
    testing:    'http://165.232.174.152:8075/web/login',
    uat:        'https://www.mediearthuat.blue-stone.net/web/login',
    production: '',
  };

  const referralCode = '3BDD4FBE';
  const sponsorshipCode = '3BDD4FBE';
  const password = '12345678';
  const phoneNumber = '1234567889';
  const address = {
    street1: 'lasdjlf street',
    street2: 'aka street',
    city: 'Test City',
    zip: '12112',
    state: 'Adana',
    country: 'Thailand',
  };
  const bankDetails = {
    bankName: 'kbank',
    accountNumber: '1010292929',
    bankOption: 'thai',
  };
  const dateOfBirth = '2000-06-15';

  it('Registers a new user and verifies OTP', () => {
    // Create a new email inbox using MailSlurp
    cy.wrap(mailslurp.createInbox()).then((inbox) => {
      const emailAddress = inbox.emailAddress;
      const inboxId = inbox.id;

      //cy.log('Generated Email:', emailAddress);

      // Visit the Testing URL
      cy.visit(baseURLs.testing);

      // Click on "Sign Up"
      cy.get('[href="/web/signup"]').click();

      // Generate random user details using Faker
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const fullName = `${firstName} ${lastName}`;
      

      // Fill in user details
      cy.get('[name="name"]').type(firstName);
      cy.get('[name="last_name"]').type(lastName);
      cy.get('#referal_input').type(referralCode);
      cy.get('#verify_button').click().wait(2000);
      cy.get('#sponsorship_input').type(sponsorshipCode);
      cy.get('#verify_sponsorship').click().wait(2000);
      cy.get('[name="phone"]').type(phoneNumber);
      cy.get('#password').type(password);
      cy.get('#confirm_password').type(password);
      cy.get('#check-agree').click();

      // Fill in address details
      cy.get('[name="street"]').type(address.street1);
      cy.get('[name="street2"]').type(address.street2);
      cy.get('[name="city"]').type(address.city);
      cy.get('[name="zip_code"]').type(address.zip);
      cy.get('[name="state_id"]').select(address.state);
      cy.get('[name="country_id"]').select(address.country);

      // Fill in DOB and email
      cy.get('[name="date_of_birth"]').type(dateOfBirth);
      cy.get('#login').type(emailAddress);

      // Fill in bank details
      cy.get('select[name="bank_options"]').select(bankDetails.bankOption);
      cy.get('#bank_name').type(bankDetails.bankName);
      cy.get('#bank_acc_no').type(bankDetails.accountNumber);

      // Agree of personal information
      Cypress.Commands.add('clickAgree1', () =>{
      cy.get(':nth-child(12) > .col-md-12 > .btn-sm').click();
      cy.get('.modal-body > .mb-3 > .row > .col-md-12 > input').click();
      cy.get('#confirmButton').should('be.visible').click();
      });
      cy.clickAgree1();


      // Agree of Service Terms and Conditions
      cy.get('button.btn-sm.privacy').click();
      cy.get(':nth-child(2) > .row > .col-md-12 > input').as('checkbox');
      cy.get('@checkbox').click();
      cy.get('#confirmButton').should('be.visible').click();


      // Submit the form
      cy.get('.text-center > button.btn').should('be.visible').click();

      // Wait for OTP email
      cy.wrap(mailslurp.waitForLatestEmail(inboxId, 10000)).then((email) => {
        const otpMatch = /Your OTP is: (\d{6})/.exec(email.body);
        if (otpMatch) {
          const otp = otpMatch[1];
          cy.log('Received OTP:', otp);

          // Enter OTP and verify
          cy.get('#otp').type(otp);
          cy.get('#verify_btn').click();
        } else {
          throw new Error('OTP not found in email body');
        }
      });

      // Log user details for reference
      cy.log('Registered User Details:');
      cy.log(`First Name: ${firstName}`);
      cy.log(`Last Name: ${lastName}`);
      cy.log(`Email: ${emailAddress}`);
      cy.log(`Password: ${password}`);
    });
  });
});



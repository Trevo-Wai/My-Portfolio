

describe('Hop Shop Cart Functionality', () => {
    const HOP_SHOP_URL = "https://www.fairmart.app/store/hop-shop";
  
    beforeEach(() => {
    cy.viewport(1920, 1080);

      cy.visit(HOP_SHOP_URL);
      cy.wait(5000);
    });
  
    it('Should allow shoppers to add multiple products to the cart and display correct prices', () => {

      // Adding first product to the cart
      cy.get('div[id*="Virgil\'s"]').as('rootBeerProduct');
      cy.get('@rootBeerProduct').click();
      

      cy.contains('span', 'Add to Cart').should('be.visible').click();
      cy.get('.MuiTypography-root > .MuiButtonBase-root').click();
      cy.go('back');

      // Adding second product to the cart
      cy.get('#Deschutes\\%20Fresh\\%20Haze\\%20Beer\\%206pk\\%20Cans')
      .within(() => {
      // target the button directly inside the container
      cy.get('.MuiButtonBase-root.MuiButton-root').should('be.visible').click();});
      
      //close cart window
      cy.get('.MuiTypography-root > .MuiButtonBase-root').should('be.visible').click();

      // Open the cart to verify products
      cy.get('button[aria-label="shopping cart"][title="Cart"]').click();

      // Verify that both products are present in the cart
      cy.get(':nth-child(1) > .cartProductItem > :nth-child(1) > div > img').should('exist');
      cy.get(':nth-child(2) > .cartProductItem > :nth-child(1) > div > img').should('exist');

      // Verify individual product prices
      cy.get('.MuiDialogContent-root > .hideScrollbar > :nth-child(1)').should('contain', '$16.90');
      cy.get('.MuiDialogContent-root > .hideScrollbar > :nth-child(2)').should('contain', '$55.00');
       
      // Verify total price calculation
      const price1 = 16.90;
      const price2 = 55;
      const total = price1 + price2;
      cy.get('[data-testid="totalPrice"]').should('contain', total.toFixed(2));
      cy.wait(5000);
    

      
    });
  
    it('Should update cart total when quantities are changed', () => {
      // Another test code here
    });
  });
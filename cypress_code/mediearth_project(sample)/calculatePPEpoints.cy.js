describe('Verify PPE (Give) Calculation', () => {
    it('should check if PPE (Give) divided by 20 equals Point Given', () => {
      // Visit the page containing the table
      cy.visit('https://www.mediearthuat.blue-stone.net/web#active_id=382&model=received.nft.point&view_type=list&cids=1&menu_id=505'); // Replace with your actual URL
      cy.get('#login').type('admin');
      cy.get('#password').type('example');//will not user real admin data for security
      cy.get('.clearfix > .btn').click();
      cy.wait(15000); // Wait for page to load
  
      // Function to click a row, check PPE (Give) and Point Given, then return to the main page
      function clickRowAndReturn(rowIndex) {
        // Click on the row based on index
        cy.get('table tbody tr').eq(rowIndex).click();
  
        // Step 5: Wait for member detail page to load
        cy.wait(2000);
  
        // Step 6: Click the button or link to buy the sale order
        cy.get('.o_stat_info > .o_field_widget > span').invoke('text').then((statText) => {
            if (statText.trim() === "0") {
              // If the span contains "0", skip the button click
              cy.log('Skipping the button click because the stat is 0');
            } else {
              // If the span does not contain "0", click the button
              cy.get('.o-form-buttonbox > .btn').click();

            // Get all rows in the table (excluding the header)
            cy.get('table tbody tr').filter(':contains("E00010")').each(($row, index) => {
                cy.wrap($row).find('td:nth-child(8)').then(($ppeCell) => {
    
            
                // Get the PPE (Give) value from the row
                cy.wrap($ppeCell).invoke('text').then((ppeGive) => {
                    // Clean and convert PPE (Give) to a number
                    const ppeGiveValue = parseFloat(ppeGive.trim());
            
                    // If PPE (Give) is a valid number, proceed with the calculation
                    if (ppeGiveValue) {
                    // Get the Point Given value from the same row
                    cy.wrap($row).find('td:nth-child(9)').invoke('text').then((pointGiven) => {
                        // Clean and convert Point Given to a number
                        const pointGivenValue = parseFloat(pointGiven.trim());
            
                        // Ensure Point Given is a valid number
                        if (pointGivenValue) {
                        // Calculate the expected Point Given by integer dividing PPE (Give) by 20
                        const expectedPointGiven = Math.floor(ppeGiveValue / 10);
            
                        // Compare expected point given with actual point given
                        expect(pointGivenValue).to.equal(expectedPointGiven, `Row ${index + 1}`);
                        } else {
                        cy.log('validation Failed');
                        
                        }
                    });
                    } 
            });
          });
        });
      }
    });
    
        // Step 7: Wait for the order to be processed
        cy.wait(3000);
  
        // Step 9: Return to the members list
        cy.go('back');  // Go back to the previous page (member list)
        cy.go('back');  // Go back to the previous page (member list)
  
        // Step 10: Wait for the members list to load again
        cy.wait(2000);
      }
  
      // Get the number of rows in the table and loop over them
      cy.get('table tbody tr').then(($rows) => {
        const rowCount = $rows.length;
  
        // Loop over each row
        for (let i = 0; i < rowCount; i++) {
          clickRowAndReturn(i);
        }
      });
    });
  });
  
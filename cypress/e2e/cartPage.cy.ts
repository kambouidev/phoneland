import { ICartDevice } from '../../src/types';

describe('Cart Page', () => {
  beforeEach(() => {
    // Load the cart state from the JSON file in fixtures
    cy.fixture('cart').then((cart) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Visit the cart page
    cy.visit('/cart');
  });

  it('should display the cart details correctly', () => {
    // Get the cart from localStorage
    cy.fixture('cart').then((cart) => {
      // Verify that the cart page loads correctly
      cy.get('[data-cy="cart-page"]').should('be.visible');

      // Verify that the cart title is displayed correctly
      cy.get('[data-cy="cart-title"]').should('be.visible').and('contain.text', `cart (${cart.length})`);

      // Verify that the list of devices in the cart is displayed correctly
      cy.get('[data-cy="cart-device-list"]').should('be.visible');
      cy.get('[data-cy^="cart-card-device-"]').should('have.length', cart.length);

      // Verify that each device in the cart is displayed correctly
      cart.forEach((device: ICartDevice) => {
        cy.get(`[data-cy="cart-card-device-${device.id}"]`).within(() => {
          cy.get('[data-cy="cart-device-image-container"]').should('be.visible');
          cy.get('[data-cy="cart-device-image"]').should('have.attr', 'src').and('include', encodeURIComponent(device.imageUrl));
          cy.get('[data-cy="cart-device-name"]').should('be.visible').and('contain.text', device.name);
          cy.get('[data-cy="cart-device-storage-color"]')
            .should('be.visible')
            .and('contain.text', `${device.storage} | ${device.colorName}`);
          cy.get('[data-cy="cart-device-price"]').should('be.visible').and('contain.text', `${device.price} EUR`);
          cy.get('[data-cy="cart-device-delete-button"]').should('be.visible');
        });
      });

      // Verify that the total is displayed correctly
      const total = cart.reduce((acc: number, device: ICartDevice) => acc + device.price, 0);
      cy.get('[data-cy="cart-total-label"]').should('be.visible').and('contain.text', 'Total');
      cy.get('[data-cy="cart-total-amount"]').should('be.visible').and('contain.text', `${total} EUR`);

      // Verify that the pay button is displayed correctly if there are devices in the cart
      if (cart.length > 0) {
        cy.get('[data-cy="pay-button"]').should('be.visible');
      }
      // Verify that the continue shopping button is displayed correctly
      cy.get('[data-cy="continue-shopping-button"]').should('be.visible').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });

  it('should remove a device from the cart when the delete button is clicked', () => {
    // Get the cart from localStorage
    cy.fixture('cart').then((cart) => {
      // Verify that there are devices in the cart
      if (cart.length > 0) {
        const deviceToRemove = cart[0];

        // Click the delete button of the first device
        cy.get(`[data-cy="cart-card-device-${deviceToRemove.id}"] [data-cy="cart-device-delete-button"]`).click();

        // Verify that the device has been removed from the cart
        cy.get(`[data-cy="cart-card-device-${deviceToRemove.id}"]`).should('not.exist');

        // Verify that the total has been updated correctly
        const newTotal = cart.slice(1).reduce((acc: number, device: ICartDevice) => acc + device.price, 0);
        cy.get('[data-cy="cart-total-amount"]').should('contain.text', `${newTotal} EUR`);
      }
    });
  });

  it('should not display the pay button and total text when the cart is empty', () => {
    // Clear the cart in localStorage
    localStorage.setItem('cart', JSON.stringify([]));

    // Verify that the pay button is not displayed
    cy.get('[data-cy="pay-button"]').should('not.exist');

    // Verify that the total text is not displayed
    cy.get('[data-cy="cart-total-label"]').should('not.exist');
    cy.get('[data-cy="cart-total-amount"]').should('not.exist');
  });

  it('should display the correct number of items in the cart in the navbar', () => {
    // Get the cart from localStorage
    cy.fixture('cart').then((cart) => {
      // Verify that the cart count in the navbar is displayed correctly
      cy.get('[data-cy="navbar-cart-count"]').should('be.visible').and('contain.text', cart.length);
    });
  });
});

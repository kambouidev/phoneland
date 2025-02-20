import { IDeviceDetails } from '../../src/types';

describe('Device Info Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the device details correctly', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.wait('@getDevices');
    cy.intercept('GET', '**/products/*').as('getDevice');
    cy.get('[data-cy="device-home-grid"]').children().first().click();

    cy.wait('@getDevice').then((interception) => {
      const response = interception.response?.body || [];
      const firstDevice: IDeviceDetails = response;
      cy.url().should('include', '/device/');
      cy.get('[data-cy="device-info-page"]').should('be.visible');

      cy.get('[data-cy="device-info-back-button"]').should('be.visible');

      cy.get('[data-cy="device-info-image-container"]').should('be.visible');
      cy.get('[data-cy="device-info-image"]')
        .should('have.attr', 'src')
        .and('include', encodeURIComponent(firstDevice.colorOptions[0].imageUrl));

      cy.get('[data-cy="device-info-brand"]').should('be.visible').and('contain.text', firstDevice.brand);
      cy.get('[data-cy="device-info-name"]').should('be.visible').and('contain.text', firstDevice.name);
      cy.get('[data-cy="device-info-price"]')
        .should('be.visible')
        .and(
          'contain.text',
          new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            maximumFractionDigits: 0,
          }).format(firstDevice.basePrice) + ' EUR'
        );

      cy.get('[data-cy="device-info-storage-options"]').should('be.visible');
      cy.get('[data-cy="device-info-storage-options"] button').should('have.length', firstDevice.storageOptions.length);

      cy.get('[data-cy="device-info-color-options"]').should('be.visible');
      cy.get('[data-cy="device-info-color-options"] button').should('have.length', firstDevice.colorOptions.length);

      cy.get('[data-cy="device-info-add-to-cart-button"]').should('be.disabled');

      cy.get('[data-cy="device-info-storage-options"] button').first().click();
      cy.get('[data-cy="device-info-color-options"] button').first().click();

      cy.get('[data-cy="device-info-add-to-cart-button"]').should('not.be.disabled');

      cy.get('[data-cy="device-info-specifications"]').should('be.visible');
      cy.get('[data-cy="device-info-specifications"] div').should('have.length.greaterThan', 0);

      cy.get('[data-cy="device-info-similar-devices"]').scrollIntoView().should('be.visible');
      cy.get('[data-cy^="device-card-"]').should('have.length', firstDevice.similarProducts.length);
    });
  });

  it('should update the price when a different storage option is selected', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.wait('@getDevices');
    cy.intercept('GET', '**/products/*').as('getDevice');
    cy.get('[data-cy="device-home-grid"]').children().first().click();

    cy.wait('@getDevice').then((interception) => {
      const response = interception.response?.body || [];
      const firstDevice: IDeviceDetails = response;
      cy.url().should('include', '/device/');
      cy.get('[data-cy="device-info-page"]').should('be.visible');

      cy.get('[data-cy="device-info-storage-options"]').should('be.visible');
      cy.get('[data-cy="device-info-storage-options"] button').should('have.length.greaterThan', 1);

      cy.get('[data-cy="device-info-storage-options"] button').first().click();
      cy.get('[data-cy="device-info-price"]').should(
        'contain.text',
        new Intl.NumberFormat('es-ES', {
          style: 'decimal',
          maximumFractionDigits: 0,
        }).format(firstDevice.storageOptions[0].price) + ' EUR'
      );

      if (firstDevice.storageOptions.length > 1) {
        cy.get('[data-cy="device-info-storage-options"] button').eq(1).click();
        cy.get('[data-cy="device-info-price"]').should(
          'contain.text',
          new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            maximumFractionDigits: 0,
          }).format(firstDevice.storageOptions[1].price) + ' EUR'
        );
      }
    });
  });

  it('should add the device to the cart and navigate to the cart page', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.wait('@getDevices');
    cy.intercept('GET', '**/products/*').as('getDevice');
    cy.get('[data-cy="device-home-grid"]').children().first().click();

    cy.wait('@getDevice').then((interception) => {
      const response = interception.response?.body || [];
      const firstDevice: IDeviceDetails = response;
      cy.url().should('include', '/device/');
      cy.get('[data-cy="device-info-page"]').should('be.visible');

      cy.get('[data-cy="device-info-storage-options"] button').first().click();
      cy.get('[data-cy="device-info-color-options"] button').first().click();

      cy.get('[data-cy="device-info-add-to-cart-button"]').should('not.be.disabled').click();

      cy.url().should('include', '/cart');

      cy.get('[data-cy="cart-page"]').should('be.visible');

      cy.get(`[data-cy^="cart-card-device-${firstDevice.id}"]`)
        .should('be.visible')
        .within(() => {
          cy.get('[data-cy="cart-device-name"]').should('contain.text', firstDevice.name);
          cy.get('[data-cy="cart-device-storage-color"]').should('contain.text', firstDevice.storageOptions[0].capacity);
          cy.get('[data-cy="cart-device-price"]').should('contain.text', `${firstDevice.storageOptions[0].price} EUR`);
        });
    });
  });
});

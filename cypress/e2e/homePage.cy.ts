describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the search bar', () => {
    cy.get('[data-cy="search-home-input"]').should('be.visible');
  });

  it('should display the correct number of results', () => {
    cy.get('p').contains('results').should('be.visible');
  });

  it('should display devices in the grid', () => {
    cy.get('[data-cy="device-home-grid"]').children().should('have.length.greaterThan', 0);
  });

  it('should navigate to device details page on device click', () => {
    cy.get('[data-cy="device-home-grid"]').children().first().click();
    cy.url().should('include', '/device/');
  });

  it('should clear the search input when clear button is clicked', () => {
    cy.get('[data-cy="search-home-input"]').type('iPhone');
    cy.get('[data-cy="search-home-clear-button"]').click();
    cy.get('[data-cy="search-home-input"]').should('have.value', '');
  });

  it('should disable the previous button on the first page', () => {
    cy.get('[data-cy="pagination-home-previous-button"]').should('be.disabled');
  });

  it('should enable the next button if there are more devices', () => {
    cy.get('[data-cy="pagination-home-next-button"]').should('not.be.disabled');
  });

  it('should paginate correctly when next and previous buttons are clicked', () => {
    cy.get('[data-cy="pagination-home-next-button"]').click();
    cy.get('[data-cy="pagination-home-previous-button"]').should('not.be.disabled');
    cy.get('[data-cy="pagination-home-previous-button"]').click();
    cy.get('[data-cy="pagination-home-previous-button"]').should('be.disabled');
  });

  it('should search for devices and display results', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.get('[data-cy="search-home-input"]').type('iPhone');
    cy.wait('@getDevices').then((interception) => {
      const response = interception.response?.body || [];
      const numberOfResults = response.length;
      cy.get('[data-cy="device-home-grid"]').children().should('have.length', numberOfResults);
      cy.get('p').contains(`${numberOfResults} results`).should('be.visible');
    });
  });

  it('should enable the next button if there are 20 devices', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.get('[data-cy="search-home-input"]').type('iPhone');
    cy.wait('@getDevices').then((interception) => {
      const response = interception.response?.body || [];
      const numberOfResults = response.length;

      if (numberOfResults === 20) {
        cy.get('[data-cy="pagination-home-next-button"]').should('not.be.disabled');
        cy.get('[data-cy="pagination-home-next-button"]').click();
        cy.get('[data-cy="pagination-home-previous-button"]').should('not.be.disabled');
        cy.get('[data-cy="pagination-home-previous-button"]').click();
        cy.get('[data-cy="pagination-home-previous-button"]').should('be.disabled');
      } else {
        cy.log('The number of results is not 20, skipping the pagination test.');
      }
    });
  });

  it('should apply hover effect on device card', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.get('[data-cy="search-home-input"]').type('iPhone');
    cy.wait('@getDevices');
    cy.get('[data-cy="device-home-grid"]').children().first().trigger('mouseover');
    cy.get('[data-cy="device-home-grid"]').children().first().find('.absolute').should('have.class', 'md:group-hover:translate-y-0');
  });

  it.only('should display image, name, brand, and base price on device card', () => {
    cy.intercept('GET', '**/products*').as('getDevices');
    cy.get('[data-cy="search-home-input"]').type('iPhone');
    cy.wait('@getDevices').then((interception) => {
      const response = interception.response?.body || [];
      const firstDevice = response[0];

      cy.get('[data-cy="device-home-grid"]')
        .children()
        .first()
        .within(() => {
          cy.get('img').should('have.attr', 'src').and('include', encodeURIComponent(firstDevice.imageUrl));
          cy.contains(firstDevice.name).should('be.visible');
          cy.contains(firstDevice.brand).should('be.visible');
          cy.contains(
            new Intl.NumberFormat('es-ES', {
              style: 'decimal',
              maximumFractionDigits: 0,
            }).format(firstDevice.basePrice) + ' EUR'
          ).should('be.visible');
        });
    });
  });
});

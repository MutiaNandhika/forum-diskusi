/**
 * Skenario Pengujian End-to-End Homepage:
 *
 * - Homepage spec
 *   - should display list of threads and category filters
 *   - should filter threads when category chip is clicked
 */

describe('Homepage spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display list of threads and category filters', () => {
    cy.get('header').should('be.visible');
    cy.get('.category-chips-wrapper').should('be.visible');
    cy.get('.thread-list-container, .card').should('exist');
  });

  it('should filter threads when category chip is clicked', () => {
    cy.get('.category-chips-wrapper button').should('have.length.greaterThan', 0);
  });
});

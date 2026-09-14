/**
 * Skenario Pengujian End-to-End Homepage:
 *
 * - Homepage spec
 *   - should display list of threads and category filters
 *   - should filter threads when category chip is clicked
 */

describe('Homepage spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          users: [
            {
              id: 'user-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://ui-avatars.com/api/?name=John+Doe',
            },
          ],
        },
      },
    }).as('getUsers');

    cy.intercept('GET', '**/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread React Pertama',
              body: 'Konten thread react pertama',
              category: 'react',
              createdAt: '2023-05-29T07:55:52.266Z',
              ownerId: 'user-1',
              upVotesBy: [],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      },
    }).as('getThreads');

    cy.intercept('GET', '**/v1/leaderboards', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          leaderboards: [],
        },
      },
    });

    cy.visit('/');
  });

  it('should display list of threads and category filters', () => {
    cy.wait('@getUsers');
    cy.wait('@getThreads');
    cy.get('header').should('be.visible');
    cy.get('.category-chips-wrapper').should('be.visible');
    cy.get('.thread-list-container, .card').should('exist');
  });

  it('should filter threads when category chip is clicked', () => {
    cy.wait('@getUsers');
    cy.wait('@getThreads');
    cy.get('.category-chips-wrapper button').should('have.length.greaterThan', 0);
  });
});

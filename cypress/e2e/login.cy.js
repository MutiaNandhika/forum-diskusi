/**
 * Skenario Pengujian End-to-End Login:
 *
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    // Intercept preload profile request agar tidak terjadi delay/re-render di tengah test
    cy.intercept('GET', '**/v1/users/me', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Missing authentication',
      },
    }).as('preloadProfile');

    cy.visit('/login');
    cy.get('#email-input').should('be.visible');
    cy.get('#password-input').should('be.visible');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen form login muncul di layar
    cy.get('h1.auth-title').should('contain', 'Selamat Datang Kembali');
    cy.get('#email-input').should('be.visible');
    cy.get('#password-input').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // intercept API login untuk simulasi gagal
    cy.intercept('POST', '**/v1/login', {
      statusCode: 400,
      body: {
        status: 'fail',
        message: 'email or password is wrong',
      },
    }).as('loginFail');

    // mengisi email dan password yang salah
    cy.get('#email-input').type('wrong_user@example.com');
    cy.get('#password-input').type('wrongpassword');

    // menekan tombol submit
    cy.get('button[type="submit"]').click();

    // memverifikasi request dipanggil dan window alert muncul
    cy.wait('@loginFail');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // intercept API login dan profile setelah login berhasil
    cy.intercept('POST', '**/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'fake-jwt-token-12345',
        },
      },
    }).as('loginSuccess');

    cy.intercept('GET', '**/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe',
          },
        },
      },
    }).as('getOwnProfile');

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
            },
          ],
        },
      },
    });

    cy.intercept('GET', '**/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread Pertama',
              body: 'Konten thread pertama',
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
    });

    cy.intercept('GET', '**/v1/leaderboards', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          leaderboards: [],
        },
      },
    });

    // mengisi email dan password dengan akun yang valid
    cy.get('#email-input').type('john@example.com');
    cy.get('#password-input').type('password123');

    // menekan tombol submit
    cy.get('button[type="submit"]').click();

    // memverifikasi request selesai dan diarahkan ke homepage
    cy.wait('@loginSuccess');
    cy.wait('@getOwnProfile');
    cy.url().should('not.include', '/login');
    cy.get('header').should('be.visible');
  });
});

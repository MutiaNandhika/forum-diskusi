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
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen form login muncul di layar
    cy.get('h1.auth-title').should('contain', 'Selamat Datang Kembali');
    cy.get('#email-input').should('be.visible');
    cy.get('#password-input').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email dan password yang salah
    cy.get('#email-input').type('wrong_user@example.com');
    cy.get('#password-input').type('wrongpassword');

    // menekan tombol submit
    cy.get('button[type="submit"]').click();

    // memverifikasi window alert muncul dengan pesan error dari API
    cy.on('window:alert', (str) => {
      expect(str).to.be.a('string');
      expect(str.length).to.be.greaterThan(0);
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email dan password dengan akun yang valid
    cy.get('#email-input').type('tester123@gmail.com');
    cy.get('#password-input').type('password123');

    // menekan tombol submit
    cy.get('button[type="submit"]').click();

    // memverifikasi diarahkan ke homepage atau elemen aplikasi tersedia
    cy.url().should('not.include', '/login');
  });
});

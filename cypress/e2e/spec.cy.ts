describe('template spec', () => {
  it('Loga na aplicação e testa se o toggle do tema funciona.', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#root input[type="email"]').clear().type('teste@teste.com');
    cy.get('#root input[type="password"]').clear().type('123');
    cy.get('#root button[type="submit"]').click();
    cy.get('#root .cy-container .cy-input-toggle > .react-switch-bg').click();
  })
  // it('passes', () => {
  //   cy.visit('https://example.cypress.io')
  // })
})
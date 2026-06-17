describe("template spec", () => {
  it("Deve logar com sucesso", () => {
    cy.start();
    cy.submitLoginForm("hermessonyuri@webdojo.com", "1234567Teste");

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Hermesson Yuri");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and(
        "have.text",
        "Olá QA, esse é o seu Dojo para aprender Automação de Testes.",
      );
  });

  it("Não deve logar com credenciais inválidas", () => {
    cy.start();
    cy.submitLoginForm("hermessonyuri@webdojo.com", "senhaerrada");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com credenciais inválidas", () => {
    cy.start();
    cy.submitLoginForm("qatester@webdojo.com", "1234567Teste");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});

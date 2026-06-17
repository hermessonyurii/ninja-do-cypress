describe("Formulário de Consultoria", () => {
  beforeEach(() => {
    cy.login(); // Faz login antes de cada teste, vinculado no Commands.js
    cy.goTo("Formulários", "Consultoria"); // Navega para a página de Consultoria
  });
  it("Deve solicitar consultoria individual", () => {
    // Teste para solicitar consultoria individual

    const consultancyForm = {
      name: "Hermesson Yuri",
      email: "hermessonyuri@webdojo.com",
      phone: "48999999999",
      consultancyType: "Individual",
      personType: "Pessoa Física",
      cpf: "63421947007",
      discoveryChannels: [
        "Instagram",
        "LinkedIn",
        "Udemy",
        "YouTube",
        "Indicação de Amigo",
      ],
      document: "document.pdf",
      details: "Testando o formulário de consultoria.",
      technologies: [
        "Cypress",
        "JavaScript",
        "PHP",
        "Python",
        "Selenium",
        "Postman",
        "Playwright",
        "PostgreSQL",
        "Docker",
      ],
      termsAccepted: true,
    };

    cy.get("#name").type(consultancyForm.name);
    cy.get("#email").type(consultancyForm.email);
    cy.get('input[placeholder="(00) 00000-0000"]').type(
      consultancyForm.phone,
    );
    //should("have.value", "(48) 99999-9999");

    if (consultancyForm.consultancyType === "cpf") {
      cy.contains("label", "Pessoa Física")
        .parent()
        .find("input")
        .check()
        .should("be.checked");

      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("not.be.checked");
    }

    if (consultancyForm.personType === "cnpj") {
      cy.contains("label", "Pessoa Jurídica")
        .find("input")
        .should("be.checked");

      cy.contains("label", "Pessoa Física").parent().find("input").check();
    }

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type(consultancyForm.cpf);
    //  .should("have.value", "634.219.470-07");

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });
    
    cy.get("input[type='file']").selectFile("cypress/fixtures/" + consultancyForm.document, {
      force: true,
    });

    cy.get("textarea[placeholder='Descreva mais detalhes sobre sua necessidade']",
    ).type(consultancyForm.details);

    consultancyForm.technologies.forEach((tech) => {
      cy.get("input[placeholder='Digite uma tecnologia e pressione Enter']")
        .type(tech)
        .type("{enter}")

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    if (consultancyForm.termsAccepted === true) {
      cy.contains("label", "termos de uso").find("input").check();
    }

    cy.contains("button", "Enviar formulário")
      .click()

    cy.get(".modal", { timeout: 7000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and( "have.text", "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",);

    cy.contains("button", "Fechar")
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  });

  it("Deve verificar os campos obrigatórios", () => {
    // Teste para verificar os campos obrigatórios do formulário
    cy.start();
    cy.submitLoginForm("hermessonyuri@webdojo.com", "1234567Teste");

    cy.goTo("Formulários", "Consultoria");

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .should("be.visible")
      .and("contain", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Emai")
      .parent()
      .find("p")
      .should("be.visible")
      .and("contain", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .and("contain", "Você precisa aceitar os termos de uso")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });
});

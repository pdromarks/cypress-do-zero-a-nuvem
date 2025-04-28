describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> { //executa antes de todos os testes

    cy.visit('./src/index.html') 
    //visita a página local    
  })

  it ('Verifica o título da aplicação',() => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
    // verifica se o tittle é igual...
  })

  it.only ('Preenche os campos obrigatórios e envia o formulário',() => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('pedro@gmail.com') 
    cy.get('#open-text-area').type('Obrigado')
    //o cy.get pega um elemento html pelo class '.' ou pelo id '#', além disso o .type digita no campo informado no get
    cy.get('button[type="submit"]').click()
    // o .click clica no item indicado no get
    cy.get('.success').should('be.visible')
    // o .should valida a condição que está em (''), que nesse caso é se está visível
  })

})
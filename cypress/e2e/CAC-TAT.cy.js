describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> { //executa antes de todos os testes

    cy.visit('./src/index.html') 
    //visita a página local    
  })

//exercício 1  
  it ('Verifica o título da aplicação',() => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
    // verifica se o tittle é igual...
  })

//exercício 2 (extra 1)
  it ('Preenche os campos obrigatórios e envia o formulário',() => {
    const longText = Cypress._.repeat('1234567890', 10) //ao declarar o longText ele irá repetir a strint '1234567890' 10 vezes

    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('pedro@gmail.com') 
    cy.get('#open-text-area').type(longText, { delay: 0 })
    //o cy.get pega um elemento html pelo class '.' ou pelo id '#', além disso o .type digita no campo informado no get
    //o {delay: $valor} dita o valor em milisegundos do delay para a ação
    cy.get('button[type="submit"]').click()
    // o .click clica no item indicado no get
    cy.get('.success').should('be.visible')
    // o .should valida a condição que está em (''), que nesse caso é se está visível
  })

  //extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('pedrogmailcom') //teste com a formatação do e-mail incorreta
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    // o .should valida a condição que está em (''), que nesse caso é se está visível
  })

  //extra 3
  it('campo telefone continua vazio quando vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value','')
    //o should está pegando o valor do #phone e verificando se é vazio
  })

  //extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Marques')
    cy.get('#email').type('pedro@gmail.com') 
    cy.get('#phone-checkbox').check() //marcando o checkbox para validar o campo obrigatório
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    // o .should valida a condição que está em (''), que nesse caso é se está visível
  })

  //extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName').type('Pedro').should('have.value', 'Pedro').clear().should('have.value', '')
    cy.get('#lastName').type('Marques').should('have.value', 'Marques').clear().should('have.value', '')
    cy.get('#email').type('pedro@gmail.com').should('have.value', 'pedro@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('00123456789').should('have.value', '00123456789').clear().should('have.value', '')

    //verifica o valor quando for preenchido e após limpar com o .clear()

  })

  //extra 6
  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  
})
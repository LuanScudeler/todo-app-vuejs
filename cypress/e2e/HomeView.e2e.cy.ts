import { PHRASES } from '../../src/composables/usePhrases'

const setupTest = () => {
  cy.visit('/')
}

describe('<HomeView>', () => {
  it('fill and submit todo form on click', () => {
    setupTest()

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(todoTestTitle)

    cy.findByRole('button', { name: PHRASES.addBtnName }).click()

    cy.findByRole('listitem').should('contain', todoTestTitle)
  })

  it('fill and submit todo form on enter', () => {
    setupTest()

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(`${todoTestTitle}{enter}`)

    cy.findByRole('listitem').should('contain', todoTestTitle)
  })

  it('submit and list multiple todos', () => {
    setupTest()

    findFormTextbox().as('formTextbox')

    cy.get('@formTextbox').type(`Todo1{enter}`)
    cy.get('@formTextbox').type(`Todo2{enter}`)
    cy.get('@formTextbox').type(`Todo3{enter}`)

    cy.findAllByRole('listitem').should('have.length', 3)
  })
})

const findFormTextbox = () =>
  cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })

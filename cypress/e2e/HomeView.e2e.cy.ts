import { PHRASES } from '../../src/composables/usePhrases'

const setupTest = () => {
  cy.visit('/')
}

const resetDatabase = () => cy.exec('npm run reset:database')

describe('<HomeView>', () => {
  beforeEach(resetDatabase)
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

  it.only('edit a todo on enter', () => {
    setupTest()

    const todoTitle = 'Todo1'
    findFormTextbox().as('formTextbox')
    cy.get('@formTextbox').type(`${todoTitle}{enter}`)

    cy.findAllByRole('listitem', { name: todoTitle }).within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()
      cy.findByRole('textbox').as('editTextbox').clear()

      const todoTitleEdited = 'edited'
      cy.get('@editTextbox').type(`${todoTitleEdited}{enter}`)

      // cy.findByRole('button', { name: PHRASES.saveBtnName }).click()
    })
    cy.findAllByRole('listitem', { name: 'edited' })
  })

  it.only('edit a todo on clicking save button', () => {
    setupTest()

    const todoTitle = 'Todo1'
    findFormTextbox().as('formTextbox')
    cy.get('@formTextbox').type(`${todoTitle}{enter}`)

    cy.findAllByRole('listitem', { name: todoTitle }).within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()
      cy.findByRole('textbox').as('editTextbox').clear()

      const todoTitleEdited = 'edited'
      cy.get('@editTextbox').type(`${todoTitleEdited}`)
      cy.findByRole('button', { name: PHRASES.saveBtnName }).click()
    })
    cy.findAllByRole('listitem', { name: 'edited' })
  })
})

const findFormTextbox = () =>
  cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })

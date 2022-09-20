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

  it('edit a todo on enter', () => {
    setupTest()

    const todoTitle = 'Todo1'
    createTodo(todoTitle)

    cy.findAllByRole('listitem', { name: todoTitle }).within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()
      cy.findByRole('textbox').as('editTextbox').clear()

      cy.get('@editTextbox').type(`edited{enter}`)
    })
    cy.findAllByRole('listitem', { name: 'edited' })
  })

  it('edit a todo on clicking save button', () => {
    setupTest()

    const todoTitle = 'Todo1'
    createTodo(todoTitle)

    cy.findAllByRole('listitem', { name: todoTitle }).within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()
      cy.findByRole('textbox').as('editTextbox').clear()

      cy.get('@editTextbox').type(`${'edited'}`)
      cy.findByRole('button', { name: PHRASES.saveBtnName }).click()
    })
    cy.findAllByRole('listitem', { name: 'edited' })
  })

  it('delete a the last todo in the list', () => {
    setupTest()

    const todoTitle = 'Todo1'
    createTodo(todoTitle)

    cy.findAllByRole('listitem', { name: todoTitle }).within(() => {
      cy.findByRole('button', { name: PHRASES.deleteBtnName }).click()
    })
    cy.findAllByRole('list').should('not.exist')
  })

  it('delete a todo', () => {
    setupTest()

    const todoTitle1 = 'Todo1'
    createTodo(todoTitle1)

    const todoTitle2 = 'Todo2'
    createTodo(todoTitle2)

    cy.findAllByRole('listitem', { name: todoTitle2 }).within(() => {
      cy.findByRole('button', { name: PHRASES.deleteBtnName }).click()
    })
    cy.findByRole('listitem', { name: todoTitle2 }).should('not.exist')
    cy.findByRole('listitem', { name: todoTitle1 })
  })
})

const createTodo = (todoTitle: string) => {
  findFormTextbox().as('formTextbox')
  cy.get('@formTextbox').type(`${todoTitle}{enter}`)
}

const findFormTextbox = () =>
  cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })

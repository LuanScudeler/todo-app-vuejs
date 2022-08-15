import { PHRASES } from '../../src/composables/usePhrases'
import HomeView from '../../src/views/home/HomeView.vue'

const setupTest = () => {
  cy.mount(HomeView)
}

describe('<HomeView>', () => {
  it('fill and submit todo form on click', () => {
    setupTest()

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(todoTestTitle)

    const button = cy.findByRole('button', { name: PHRASES.addBtnName })
    button.click()

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })

  it('fill and submit todo form on enter', () => {
    setupTest()

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(`${todoTestTitle}{enter}`)

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })

  it('submit and list multiple todos', () => {
    setupTest()

    findFormTextbox().as('formTextbox')

    cy.get('@formTextbox').type(`Todo1{enter}`)
    cy.get('@formTextbox').type(`Todo2{enter}`)
    cy.get('@formTextbox').type(`Todo3{enter}`)

    cy.findAllByRole('listitem').should('have.length', 3)
  })

  it('do not submit if textbox is empty', () => {
    setupTest()

    findFormTextbox().as('formTextbox').invoke('val').should('be.empty')

    cy.get('@formTextbox').type(`{enter}`)

    cy.findByRole('listitem').should('not.exist')
  })

  it('do not submit if textbox has only white spaces', () => {
    setupTest()

    findFormTextbox().as('formTextbox').type(`    {enter}`)

    cy.findByRole('listitem').should('not.exist')
  })

  it('do not display list element if there are no list items', () => {
    setupTest()

    cy.findByRole('listitem').should('not.exist')
    cy.findByRole('list').should('not.exist')
  })

  it('enter edit mode', () => {
    setupTest()
    populateTodoList()

    const firstListItem = cy
      .findAllByRole('listitem')
      .first()
      .as('firstTodoItem')
    firstListItem.within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()

      cy.findByRole('button', { name: PHRASES.saveBtnName }).should('exist')
      cy.findByRole('button', { name: PHRASES.returnBtnName }).should('exist')
      cy.findByRole('textbox').should('exist')

      cy.get('@firstTodoItem')
        .nextAll()
        .each(($element) => {
          cy.wrap($element)
            .as('currentElement')
            .findByRole('button', { name: PHRASES.editBtnName })
            .should('be.disabled')

          cy.get('@currentElement')
            .findByRole('button', { name: PHRASES.deleteBtnName })
            .should('be.disabled')
        })
    })
  })

  it('exit edit mode', () => {
    setupTest()
    populateTodoList()

    const firstListItem = cy
      .findAllByRole('listitem')
      .first()
      .as('firstTodoItem')
    firstListItem.within(() => {
      cy.findByRole('button', { name: PHRASES.editBtnName }).click()

      cy.findByRole('button', { name: PHRASES.saveBtnName }).should('exist')
      cy.findByRole('textbox').should('exist')

      cy.findByRole('button', { name: PHRASES.returnBtnName }).click()
    })

    cy.findAllByRole('listitem').each(($element) => {
      cy.wrap($element)
        .as('currentElement')
        .findByRole('button', { name: PHRASES.editBtnName })
        .should('be.enabled')

      cy.get('@currentElement')
        .findByRole('button', { name: PHRASES.deleteBtnName })
        .should('be.enabled')
    })
  })
})

const populateTodoList = () => {
  findFormTextbox().as('formTextbox').type(`Todo1{enter}`)
  cy.get('@formTextbox').type(`{enter}`).type(`Todo2{enter}`)
  cy.get('@formTextbox').type(`{enter}`).type(`Todo3{enter}`)
}

const findFormTextbox = () =>
  cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })

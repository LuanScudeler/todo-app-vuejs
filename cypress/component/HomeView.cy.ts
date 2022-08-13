import { PHRASES } from '../../src/composables/usePhrases'
import HomeView from '../../src/views/home/HomeView.vue'

describe('<HomeView>', () => {
  it('fill and submit todo form on click', () => {
    cy.mount(HomeView)

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(todoTestTitle)

    const button = cy.findByRole('button', { name: PHRASES.addBtnName })
    button.click()

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })

  it('fill and submit todo form on enter', () => {
    cy.mount(HomeView)

    const todoTestTitle = 'Todo test'
    findFormTextbox().type(`${todoTestTitle}{enter}`)

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })

  it('submit and list multiple todos', () => {
    cy.mount(HomeView)

    findFormTextbox().as('formTextbox')

    cy.get('@formTextbox').type(`Todo1{enter}`)
    cy.get('@formTextbox').type(`Todo2{enter}`)
    cy.get('@formTextbox').type(`Todo3{enter}`)

    cy.findAllByRole('listitem').should('have.length', 3)
  })

  it('do not submit if textbox is empty', () => {
    cy.mount(HomeView)

    findFormTextbox().as('formTextbox').invoke('val').should('be.empty')

    cy.get('@formTextbox').type(`{enter}`)

    cy.findByRole('listitem').should('not.exist')
  })

  it('do not submit if textbox has only white spaces', () => {
    cy.mount(HomeView)

    findFormTextbox().as('formTextbox').type(`    {enter}`)

    cy.findByRole('listitem').should('not.exist')
  })

  it('do not display list element if there are no list items', () => {
    cy.mount(HomeView)

    cy.findByRole('listitem').should('not.exist')
    cy.findByRole('list').should('not.exist')
  })
})

const findFormTextbox = () =>
  cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })

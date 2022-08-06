import { PHRASES } from '../../src/composables/usePhrases'
import HomeView from '../../src/views/HomeView.vue'

describe('<HomeView>', () => {
  it('fill and submit todo form on click', () => {
    cy.mount(HomeView)

    const todoTestTitle = 'Todo test'
    const textbox = cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })
    textbox.type(todoTestTitle)

    const button = cy.findByRole('button', { name: PHRASES.addBtnName })
    button.click()

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })

  it('fill and submit todo form on enter', () => {
    cy.mount(HomeView)

    const todoTestTitle = 'Todo test'
    const textbox = cy.findByRole('textbox', { name: PHRASES.todoTitleLabel })
    textbox.type(`${todoTestTitle}{enter}`)

    const listitem = cy.findByRole('listitem')
    listitem.should('contain', todoTestTitle)
  })
})

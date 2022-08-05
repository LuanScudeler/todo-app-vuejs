import HomeView from '../../src/views/HomeView.vue'

describe('<HomeView>', () => {
  it('mounts', () => {
    cy.mount(HomeView)
    const button = cy.findByRole('button', { name: /ADDs/i })
    button.should('exist')
  })
})

import HomeView from '../../src/views/HomeView.vue'

describe('<HomeView>', () => {
  it('mounts', () => {
    cy.mount(HomeView)
  })
})

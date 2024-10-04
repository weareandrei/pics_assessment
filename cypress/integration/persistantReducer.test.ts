describe('Story persistence across reloads', () => {
  const newStory = { id: 'id_story3', name: 'New Persistent Story' }

  beforeEach(() => {
    cy.visit('/')
  })

  it('should persist newly created story after page reload', () => {
    cy.get('input[data-testid="new-story-input"]').type(newStory.name)
    cy.get('button[data-testid="add-story-button"]').click()

    cy.contains(newStory.name).should('exist')

    cy.reload()

    cy.contains(newStory.name).should('exist')
  })
})

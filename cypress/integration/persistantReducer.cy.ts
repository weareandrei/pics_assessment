describe('Comment Persistence', () => {
  const newComment = 'new test comment'

  beforeEach(() => {
    cy.visit('/')
  })

  it('should add a new comment and persist it across page reloads', () => {
    cy.get('[data-testid="comment-input"]').type(newComment)

    cy.get('[aria-label="send"]').click()

    cy.contains(newComment).should('exist')

    cy.reload()

    cy.contains(newComment).should('exist')
  })
})

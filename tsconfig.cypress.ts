import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/integration/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    fixturesFolder: 'cypress/fixtures',
  },
})

// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@testing-library/cypress/add-commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue'
import '../../src/assets/main.css'
import '../../src/assets/base.css'
import { API_DEV_URL, apolloClient, globalDirectives } from '../../src/main'
import { provideApolloClient } from '@vue/apollo-composable'
import { aliasQuery, hasOperationName } from '../utils/graphql-test-utils'
import { GET_TODOS } from '../../src/views/home/apiOperations.const'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  options.global ||= {}
  options.global.directives = globalDirectives

  provideApolloClient(apolloClient)

  return mount(component, options)
})

export const TODOS_MOCK = {
  todos: [
    {
      id: '630e23633680db4343956685',
      title: 'updated',
      __typename: 'Todo'
    },
    {
      id: '630f8ce74ce5045819fc8264',
      title: 'Todo',
      __typename: 'Todo'
    }
  ]
}

beforeEach(() => {
  cy.intercept('POST', API_DEV_URL, (req) => {
    // Queries
    aliasQuery(req, GET_TODOS)
    if (hasOperationName(req, GET_TODOS)) {
      req.reply(
        JSON.stringify({
          data: TODOS_MOCK
        })
      )
    }
  })
})

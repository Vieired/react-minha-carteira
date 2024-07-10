import React from 'react'
import MainHeader from './index'

describe('<MainHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MainHeader />)
  })
})
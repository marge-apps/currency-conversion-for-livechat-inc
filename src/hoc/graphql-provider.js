import React from 'react'
import { nest } from 'recompose'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient()

const Apollo = ({ children }) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Component => nest(Apollo, Component)

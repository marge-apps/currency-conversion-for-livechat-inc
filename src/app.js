import React from 'react'
import { compose } from 'recompose'
import graphqlProvider from './hoc/graphql-provider'
import livechat from './hoc/livechat'
import CurrencyConversion from './screens/currency-conversion'
import './app.css'

const App = props => (
	<div>
		<link
			rel="stylesheet"
			type="text/css"
			href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.css"
		/>
		<CurrencyConversion />
	</div>
)

export default compose(livechat, graphqlProvider)(App)

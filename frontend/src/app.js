import React from 'react'
import { compose } from "recompose";
import graphqlProvider from './hoc/graphql-provider'
import livechat from './hoc/livechat'
import CurrencyConversion from './screens/currency-conversion'
import './app.css'

const availableCurrencies = [
	'EUR', 'USD', 'GBP'
]

const converters = [
	{id: '1', amount: 10, currency: 'USD', rate: 1, availableCurrencies},
	{id: '2', amount: 10, currency: 'GBP', rate: 0.6, availableCurrencies},
	{id: '3', amount: 10, currency: 'EUR', rate: 0.8, availableCurrencies},
]

const App = props => (
	<div>
		<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.0/normalize.css" />
		<CurrencyConversion/>
	</div>
)

export default compose(
	livechat,
	graphqlProvider
)(App)

import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withStateHandlers, withProps} from 'recompose';
import {map, tap} from 'ramda'
import {withStyles} from '@material-ui/core/styles';
import {ConversionScreen} from '../components/conversion-screen'

const availableCurrencies = [
	'EUR', 'USD', 'GBP'
]

const styles = theme => ({
	container: {
		padding: '0 1rem 1rem'
	}
})

const currenciesQuery = gql`
	query ($base: String!, $currencies: [String]) {
		conversionRate(base: $base, currencies: $currencies) {
			name
			rate
			abbreviation
		}
	}`

const state = withStateHandlers(props => ({
	base: 'USD',
	amount: 10,
	currencies: ["AED", "EUR", "AUD"]
}))

export default compose(
	state,
	graphql(currenciesQuery, {
		options: props => ({
			variables: {
				base: props.base,
				currencies: props.currencies,
			}
		})
	}),
	withProps(props => ({
		converters: map(c => ({
			amount: props.amount,
			currency: c.abbreviation,
			rate: c.rate,
			name: c.name,
		}), props.data.conversionRate || [])
	})),
	withStyles(styles),
)(
	props => (
		<div className={props.classes.container}>
			<ConversionScreen
				availableCurrencies={availableCurrencies}
				converters={props.converters}
				loading={props.data.loading}
			/>
		</div>
	)
)

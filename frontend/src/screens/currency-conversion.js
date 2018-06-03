import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withStateHandlers, withProps} from 'recompose';
import {map, addIndex, update, remove} from 'ramda'
import {withStyles} from '@material-ui/core/styles';
import {ConversionScreen} from '../components/conversion-screen'

const mapIndexed = addIndex(map);

const availableCurrencies = [
	'EUR', 'USD', 'GBP'
]

const styles = theme => ({
	container: {
		padding: '1rem'
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
	currencies: ['USD', "AED", "EUR", "AUD"]
}), {
	pin: ({currencies}) => i => {
		const newState = ({
			base: currencies[i],
			currencies: [currencies[i], ...remove(i, 1, currencies)]
		})

		console.log(newState)

		return newState
	},
	changeAmount: () => amount => ({amount}),
	changeCurrency: ({currencies}) => (i, currency) => ({ currencies: update(i, currency, currencies) }),
	createConverter: ({base, currencies}) => () => ({ currencies: [...currencies, base]}),
	removeConverter: ({currencies}) => i => ({currencies: remove(i, 1, currencies)}),
})

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
		converters: mapIndexed((c, i) => ({
			availableCurrencies,
			amount: props.amount,
			currency: c.abbreviation,
			rate: c.rate,
			name: c.name,
			position: i,
			onPin: () => props.pin(i),
			onDelete: () => props.removeConverter(i),
			onChangeAmount: evt => {
				const amount = new Number(evt.target.value)
				props.changeAmount(amount)
			},
			onChangeCurrency: currency => props.changeCurrency(i, currency)
		}), props.data.conversionRate || []),
	})),
	withProps(props => console.log(props.converters)),
	withStyles(styles),
)(
	props => (
		<div className={props.classes.container}>
			<ConversionScreen
				availableCurrencies={availableCurrencies}
				converters={props.converters}
				loading={props.data.loading}
				onCreate={() => {props.createConverter(); console.log('onCreate'); }}
			/>
		</div>
	)
)

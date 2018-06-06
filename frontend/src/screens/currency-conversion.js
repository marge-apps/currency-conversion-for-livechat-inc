import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {compose, withStateHandlers, withProps} from 'recompose';
import {map, addIndex, update, remove} from 'ramda'
import {withStyles} from '@material-ui/core/styles';
import {ConversionScreen} from '../components/conversion-screen'
import {retrieveFromState, storeToState} from '../hoc/persisted-state'
const styles = theme => ({
	container: {
		padding: '1rem'
	}
})

const state = withStateHandlers(props => ({
	amount: props.amount || 1,
	base: props.base || 'USD',
	converters: props.converters || [{currency: 'USD'}]
}), {
	pin: ({converters}) => i => ({
		converters: [converters[i], ...remove(i, 1, converters)],
		base: converters[i].currency
	}),
	createConverter: ({converters}) => () => ({ converters: [...converters, {currency: 'GBP'}]}),
	removeConverter: ({converters}) => i => ({converters: remove(i, 1, converters)}),
	changeCurrency: ({converters}) => (i, currency) => ({converters: update(i, {currency}, converters)}),
	setAmount: () => amount => ({amount})
})

export default compose(
	retrieveFromState,
	state,
	storeToState,
	withProps(props => console.log(props.converters)),
	withStyles(styles),
)(
	props => (
		<div className={props.classes.container}>
			<ConversionScreen
				amount={props.amount}
				base={props.base}
				converters={props.converters}
				onCreate={props.createConverter}
				onDelete={props.removeConverter}
				onChangeCurrency={props.changeCurrency}
				onPin={props.pin}
				onChangeAmount={props.setAmount}
			/>
		</div>
	)
)

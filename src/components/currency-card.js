import React from 'react'
import debounce from 'debounce';
import {graphql} from 'react-apollo';

import {is, ifElse, pipe, map, omit, find, pathOr, pick, propEq, prop, T} from 'ramda';
import {branch, renderComponent, compose, withState, withStateHandlers, withProps, defaultProps, setPropTypes} from 'recompose';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import {Delete, KeyboardArrowDown, ExpandLess, ExpandMore, Done} from '@material-ui/icons';
import currenciesQuery from '../queries/currency'

const largeInputStyles = theme => ({
	input: {
		fontSize: '2.5rem',
	},
	underline: {
		'&:before': {
			borderBottomColor: 'white'
		}
	}
})

export const LargeInput = withStyles(largeInputStyles)(
	props => <TextField
		InputProps={{ classes: props.classes}}
		InputLabelProps={{
			shrink: true
		}}
		{...omit(['classes'], props)}
		/>
	)

const currencyCardDefaults = defaultProps({
	onChangeCurrency: T,
	onChangeAmount: T,
	onDelete: T,
	onPin: T,
	amount: 0,
	currency: 'USD',
	base: 'USD',
	rate: 1,
	isBaseCard: false,
	expanded: false,
	availableCurrencies: []
})

const currencyCardStateHandlers = withStateHandlers(
	props => ({
		expanded: props.expanded || false,
	}),
	{
		toggleCard: ({expanded}) => () => ({expanded: !expanded}),
	}
)

const currencyCardStyle = theme => ({
	expandButton: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		zIndex: 9,
	},
	currencyCard: {
		position: 'relative',
	},
	currencyCardBase: {
		position: 'relative',
		marginBottom: '1rem',
	}
})

const BaseCard = props => <Card
	className={props.classes.currencyCardBase}
	square={props.square}
	elevation={2}
	>
	<CardContent>
		<LargeInput
			value={props.amount.toString()}
			placeholder="0.00"
			label={props.currency}
			onChange={evt => {
				props.onChangeAmount(new Number(evt.target.value) || 0)
			}}
			type="number"
			fullWidth />
		<Collapse in={props.expanded}>
			<TextField
				label="Currency"
				value={props.currency}
				margin="normal"
				onChange={e => props.onChangeCurrency(props.key, e.target.value)}
				select
				fullWidth
			>
				{map(option => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				), props.availableCurrencies)}
			</TextField>
		</Collapse>
	</CardContent>
</Card>

const handleBaseCard = branch( prop('isBaseCard'), renderComponent(BaseCard) )

const LoadingCard = props => ( <Card
	className={props.classes.currencyCardBase}
	square={props.square}
	>
		Loading...
	</Card>
)

const handleLoading = branch(pathOr(false, ['data', 'loading']), renderComponent(LoadingCard))

export const CurrencyCard = compose(
	currencyCardDefaults,
	currencyCardStateHandlers,
	withStyles(currencyCardStyle),
	handleBaseCard,
	graphql(currenciesQuery, {
		options: props => ({
			variables: {
				base: props.base,
				currencies: [props.currency],
			}
		})
	}),
	handleLoading,
	withProps(props => ({
		rate: props.data.conversionRate[0].rate || 0
	}))
	//handle loading
)(props => <Card
	className={props.classes.currencyCard}
	square={props.square}
	elevation={props.elevation}
	margin="normal"
	>
	<IconButton
		className={props.classes.expandButton}
		onClick={props.toggleCard}
	>
		{props.expanded ? (<ExpandLess />) : (<ExpandMore />)}
	</IconButton>

	<CardContent>
		<LargeInput
			value={(props.amount * props.rate).toFixed(2)}
			placeholder="0.00"
			label={`${props.amount} ${props.base} > ${props.currency}`}
			// onChange={evt => {
			// 	props.onChangeAmount((new Number(evt.target.value) || 0) / props.rate)
			// 	console.log(props.onChangeAmount)
			// }}
			fullWidth />
		<Collapse in={props.expanded}>
			<TextField
				label="Currency"
				value={props.currency}
				margin="normal"
				onChange={evt => props.onChangeCurrency(props.pos, evt.target.value)}
				select
				fullWidth
			>
				{map(option => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				), props.availableCurrencies)}
			</TextField>
			<TextField
				disabled
				label="Rate"
				value={props.rate.toFixed(4)}
				margin="normal"
				fullWidth
			/>
		</Collapse>
	</CardContent>

	<CardActions>
		<Collapse in={props.expanded}>
		<Button
			onClick={props.onPin}>
			Pin to top
		</Button>
		<Button
			onClick={props.onDelete}
			color="secondary">
			Delete
		</Button>
		</Collapse>
	</CardActions>
</Card>
)

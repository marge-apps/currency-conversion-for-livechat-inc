import React from 'react'
import { graphql } from 'react-apollo'

import { map, omit, pathOr, prop, T } from 'ramda'
import {
	branch,
	renderComponent,
	compose,
	withState,
	withStateHandlers,
	withProps,
	defaultProps,
	setPropTypes,
} from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import {
	Card,
	CardContent,
	CardActions,
	Collapse,
	TextField,
	MenuItem,
	Button,
	IconButton,
	LinearProgress,
} from '@material-ui/core'

import {
	Delete,
	KeyboardArrowDown,
	ExpandLess,
	ExpandMore,
	Done,
} from '@material-ui/icons'
import currenciesQuery from '../queries/currency'

const largeInputStyles = theme => ({
	input: {
		fontSize: '2.5rem',
	},
	underline: {
		'&:before': {
			borderBottomColor: 'white',
		},
	},
})

export const LargeInput = withStyles(largeInputStyles)(props => (
	<TextField
		InputProps={{
			classes: props.classes,
			disableUnderline: props.disableUnderline,
		}}
		InputLabelProps={{
			shrink: true,
		}}
		{...omit(['classes', 'disableUnderline'], props)}
	/>
))

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
	availableCurrencies: [],
})

const currencyCardStateHandlers = withStateHandlers(
	props => ({
		expanded: props.expanded || false,
	}),
	{
		toggleCard: ({ expanded }) => () => ({ expanded: !expanded }),
	},
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
	},
})

const BaseCard = props => (
	<Card
		className={props.classes.currencyCardBase}
		square={props.square}
		elevation={2}>
		<CardContent>
			<LargeInput
				value={props.amount.toString()}
				placeholder="0.00"
				label={props.base}
				onChange={evt => {
					props.onChangeAmount(new Number(evt.target.value) || 0)
				}}
				type="number"
				fullWidth
			/>
			<TextField
				label="Currency"
				value={props.base}
				margin="normal"
				onChange={e => {
					props.onChangeCurrency(props.key, e.target.value)
					props.onChangeBaseCurrency(e.target.value)
				}}
				select
				fullWidth>
				{map(
					option => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					),
					props.availableCurrencies,
				)}
			</TextField>
		</CardContent>
	</Card>
)

const handleBaseCard = branch(prop('isBaseCard'), renderComponent(BaseCard))

const LoadingCard = props => (
	<Card className={props.classes.currencyCardBase} square={props.square}>
		<CardContent>
			<LinearProgress />
		</CardContent>
	</Card>
)

const handleLoading = branch(
	pathOr(false, ['data', 'loading']),
	renderComponent(LoadingCard),
)

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
			},
		}),
	}),
	handleLoading,
	withProps(props => console.log(props.data)),
	withProps(props => ({
		rate: props.data.conversionRate.rates[0].rate || 0,
		onDelete: () => {
			props.toggleCard()
			props.onDelete()
		},
	})),
	//handle loading
)(props => (
	<Card
		className={props.classes.currencyCard}
		square={props.square}
		elevation={props.elevation}
		margin="normal">
		<IconButton
			className={props.classes.expandButton}
			onClick={props.toggleCard}>
			{props.expanded ? <ExpandLess /> : <ExpandMore />}
		</IconButton>

		<CardContent>
			<LargeInput
				value={(props.amount * props.rate).toFixed(2)}
				label={`${props.amount} ${props.base} > ${props.currency}`}
				disableUnderline
				fullWidth
			/>
			<Collapse in={props.expanded}>
				<TextField
					label="Currency"
					value={props.currency}
					margin="normal"
					onChange={evt =>
						props.onChangeCurrency(props.pos, evt.target.value)
					}
					select
					fullWidth>
					{map(
						option => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						),
						props.availableCurrencies,
					)}
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
				<Button onClick={props.onPin}>Pin to top</Button>
				<Button onClick={props.onDelete} color="secondary">
					Delete
				</Button>
			</Collapse>
		</CardActions>
	</Card>
))

import React from 'react'
import debounce from 'debounce';
import {is, ifElse, pipe, map, find, propEq, prop} from 'ramda';
import {compose, withState, withStateHandlers, withProps} from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Icon } from '@material-ui/core';

const styles = theme => ({
	largeField: {
		fontSize: '2.5rem',
		'&:before': {
			borderBottomColor: 'white'
		},
	},
	expandButton: {
		position: 'absolute',
		top: '10px',
		right: '10px',
		zIndex: 99,
	}
})

export const LargeInput = withStyles(styles)(
	props => <TextField
		InputProps={{
			classes: {
				input: props.classes.largeField,
				underline: props.classes.largeField
			}
		}}
		InputLabelProps={{
			shrink: true
		}}
		{...props}
	/>
)

export const CurrencyCard = compose(
	withStateHandlers(
		props => ({
			expanded: false,
			currency: 'USD',
			rate: 1,
		}),
		{
			toggleCard: ({expanded}) => () => ({expanded: !expanded}),
			setRate: ({rate}) => ifElse(is(Number), value => ({rate: value}), () => ({rate})),
			setCurrency: () => value => ({
				currency: value
			})
		}
	),
	withProps(props => ({
		setRate: e => props.setRate(parseFloat(e.target.value) || 0),
		setCurrency: e => props.setCurrency(e.target.value),
	})),
	withStyles(styles)
)(props => <Card {...props} style={{ position: 'relative' }}>
	<IconButton
		className={props.classes.expandButton}
		onClick={props.toggleCard}
		>
		{props.expanded ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
	</IconButton>

	<CardContent>
		<LargeInput
			value={(props.amount * props.rate).toFixed(2)}
			placeholder="0.00"
			label={props.currency}
			onChange={props.onChangeAmount}
			fullWidth />
		<Collapse in={props.expanded}>
			<TextField
				label="Currency"
				value={props.currency}
				margin="normal"
				onChange={props.setCurrency}
				select
				fullWidth
			>
				{map(option => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				), props.availableCurrencies)}
				{console.log(props)}
			</TextField>
			<TextField
				label="Rate"
				value={props.rate}
				onChange={props.setRate}
				inputProps={{
					type: 'number',
					step: 0.001,
					min: 0
				}}
				margin="normal"
				fullWidth
			/>
		</Collapse>
	</CardContent>


	<CardActions>
		<Collapse in={props.expanded}>
			<Button color="secondary"><Delete /> Delete</Button>
		</Collapse>
	</CardActions>
</Card>
)

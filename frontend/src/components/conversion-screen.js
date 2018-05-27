import React from 'react'
import {map} from 'ramda'
import {withProps, compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import {CurrencyCard} from './currency-card'

export const CreateButton = props =>
<Button
	{...props}
	color="primary"
	classes={props.classes}
	variant="fab"
	>
	<AddIcon />
</Button>

const conversionScreenStyle = theme => ({
	conversionScreen: {
		position: 'relative',
	},
	fab: {
		position: 'fixed',
		bottom: '1rem',
		right: '1rem',
		zIndex: 9
	}
})

export const ConversionScreen = compose(
	withStyles(conversionScreenStyle)
)(props =>
<div className={props.classes.conversionScreen}>
	{
		map(c => <CurrencyCard {...c}
			key={c.id}
			square
			/>, props.converters)
	}

	<div className={props.classes.fab}>
		<CreateButton onClick={props.onCreate}/>
	</div>
</div>
)

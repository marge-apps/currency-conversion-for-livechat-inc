import React from 'react'
import {map, equals} from 'ramda'
import {branch, renderComponent, withProps, compose} from 'recompose'
import {withStyles} from '@material-ui/core/styles';
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress'
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
		left: '50%',
		right: '50%',
		zIndex: 9
	},
	loadingIndicator: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
	}
})

export const ConversionScreen = compose(
	withStyles(conversionScreenStyle)
)(props =>
<div className={props.classes.conversionScreen}>
	<div className={props.classes.loadingIndicator}>
		{ props.loading && <LinearProgress/>}
	</div>
	{
		map(c => <CurrencyCard {...c}
			key={c.position}
			elevation={1}
			square
			/>, props.converters)
	}

	<div className={props.classes.fab}>
		<CreateButton onClick={props.onCreate}/>
	</div>
</div>
)

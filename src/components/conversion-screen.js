import React from 'react'
import { map, addIndex } from 'ramda'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { CurrencyCard } from './currency-card'

import availableCurrencies from '../lib/availableCurrencies'

const mapIndexed = addIndex(map)

export const CreateButton = props => (
	<Button {...props} color="primary" classes={props.classes} variant="fab">
		<AddIcon />
	</Button>
)

const conversionScreenStyle = theme => ({
	conversionScreen: {
		position: 'relative',
	},
	fab: {
		position: 'fixed',
		bottom: '1rem',
		left: '50%',
		right: '50%',
		zIndex: 9,
	},
})

export const ConversionScreen = compose(withStyles(conversionScreenStyle))(
	props => (
		<div className={props.classes.conversionScreen}>
			{mapIndexed(
				(c, i) => (
					<CurrencyCard
						{...c}
						isBaseCard={i === 0}
						pos={i}
						amount={props.amount}
						onChangeCurrency={props.onChangeCurrency}
						onChangeBaseCurrency={props.onChangeBaseCurrency}
						onPin={() => props.onPin(i)}
						onDelete={() => props.onDelete(i)}
						onChangeAmount={props.onChangeAmount}
						key={i}
						base={props.base}
						availableCurrencies={availableCurrencies}
						square
					/>
				),
				props.converters,
			)}

			<div className={props.classes.fab}>
				<CreateButton onClick={props.onCreate} />
			</div>
		</div>
	),
)

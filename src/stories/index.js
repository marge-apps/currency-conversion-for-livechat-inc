import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

import { CurrencyCard, LargeInput } from '../components/currency-card'
import { ConversionScreen } from '../components/conversion-screen'

storiesOf('Welcome', module).add('to Storybook', () => (
	<Welcome showApp={linkTo('Button')} />
))

storiesOf('LargeInput', module)
	.add('default', () => <LargeInput label="USD" placeholder="0.00" />)
	.add('with value', () => (
		<LargeInput label="USD" value={43.24} placeholder="0.00" />
	))

const availableCurrencies = ['EUR', 'USD', 'GBP']

storiesOf('CurrencyCard', module)
	.add('default', () => (
		<CurrencyCard
			amount={15}
			rate={1}
			currency="USD"
			availableCurrencies={availableCurrencies}
			onPin={action('onPin')}
			onChangeCurrency={action('onChangeCurrency')}
			onChangeAmount={action('onChangeAmount')}
			onDelete={action('onDelete')}
		/>
	))
	.add('expanded', () => (
		<CurrencyCard
			expanded
			amount={15}
			rate={1.3}
			currency="EUR"
			availableCurrencies={availableCurrencies}
			onPin={action('onPin')}
			onChangeCurrency={action('onChangeCurrency')}
			onChangeAmount={action('onChangeAmount')}
			onDelete={action('onDelete')}
		/>
	))

const actions = {
	onChangeRate: action('onChangeRate'),
	onChangeCurrency: action('onChangeCurrency'),
	onChangeAmount: action('onChangeAmount'),
	onDelete: action('onDelete'),
}

const converters = [
	{
		id: '1',
		amount: 10,
		currency: 'USD',
		rate: 1,
		availableCurrencies,
		...actions,
	},
	{
		id: '2',
		amount: 10,
		currency: 'GBP',
		rate: 0.6,
		availableCurrencies,
		...actions,
	},
	{
		id: '3',
		amount: 10,
		currency: 'EUR',
		rate: 0.8,
		availableCurrencies,
		...actions,
	},
]
storiesOf('ConversionScreen', module)
	.add('default', () => (
		<ConversionScreen
			converters={converters}
			onCreate={action('onCreate')}
		/>
	))
	.add('loading', () => (
		<ConversionScreen
			loading
			converters={converters}
			onCreate={action('onCreate')}
		/>
	))

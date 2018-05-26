import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import { CurrencyCard, LargeInput } from '../components/currency-card'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('LargeInput', module)
	.add('default', () => <LargeInput
		label="USD"
		placeholder="0.00"
	/>)
	.add('with value', () => <LargeInput
		label="USD"
		value={43.24}
		placeholder="0.00"
	/>)

const availableCurrencies = [
	'EUR', 'USD', 'GBP'
]

storiesOf('CurrencyCard', module)
	.add('default', () => <CurrencyCard
							id="1"
							amount={15}
							rate={1}
							currency="USD"
							availableCurrencies={availableCurrencies}
							onChangeRate={() => action('onChangeRate')}
							onChangeCurrency={() => action('onChangeCurrency')}
							onChangeAmount={() => action('onChangeAmount')}
							onDelete={() => action('onDelete')}
							/>)
	.add('expanded', () => <CurrencyCard
							expanded
							id="2"
							amount={15}
							rate={1.3}
							currency="EUR"
							availableCurrencies={availableCurrencies}
							onChangeRate={() => action('onChangeRate')}
							onChangeCurrency={() => action('onChangeCurrency')}
							onChangeAmount={() => action('onChangeAmount')}
							onDelete={() => action('onDelete')}
							/>)

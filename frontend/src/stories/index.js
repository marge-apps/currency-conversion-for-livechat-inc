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


const currencies = [
	{
		name: 'EUR',
		rate: 1.3
	},
	{
		name: 'USD',
		rate: 1.0
	},
	{
		name: 'GBP',
		rate: 1.6
	},
]
storiesOf('CurrencyCard', module)
	.add('default', () => <CurrencyCard
							amount={15}
							currencies={currencies}
							onChangeAmount={action('onChangeAmount')}
							/>)

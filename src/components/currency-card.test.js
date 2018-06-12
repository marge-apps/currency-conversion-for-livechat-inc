import React from 'react'
import { shallow, render } from 'enzyme'
import { LargeInput, CurrencyCard } from './currency-card'

describe('LargeInput', () => {
	test('renders without issues', () => {
		expect(() => render(<LargeInput />)).not.toThrow()
	})

	test('show label', () => {
		const wrapper = render(<LargeInput label="test" />)

		expect(wrapper.find('label').text()).toEqual('test')
	})

	test('show value', () => {
		const wrapper = render(<LargeInput value="test" />)

		expect(wrapper.find('input').attr('value')).toEqual('test')
	})
})

describe('CurrencyCard', () => {
	test('renders without issues', () => {
		expect(() => render(<CurrencyCard id="id-1" />)).not.toThrow()
	})

	test('onChangeRate')
	test('onChangeCurrency')
	test('onChangeAmount')
	test('onDelete')
})

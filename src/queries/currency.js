import gql from 'graphql-tag'

export default gql`
	query($base: String!, $currencies: [String]) {
		conversionRate(base: $base, currencies: $currencies) {
			base
			timestamp
			rates {
				rate
				abbreviation
			}
		}
	}
`

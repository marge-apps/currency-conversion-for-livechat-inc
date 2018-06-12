import gql from 'graphql-tag'

export default gql`
	query($base: String!, $currencies: [String]) {
		conversionRate(base: $base, currencies: $currencies) {
			name
			rate
			abbreviation
		}
	}
`

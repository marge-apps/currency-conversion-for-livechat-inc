const typeDefs = `
scalar JSON

type Rate {
	rate: Float,
	abbreviation: String
}
type ConversionType {
	base: String
	timestamp: String
	rates: [Rate]
}
type Query {
	conversionRate(base: String!, currencies: [String]): ConversionType
}
`

module.exports = { typeDefs }

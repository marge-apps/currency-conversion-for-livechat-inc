const {tap, map, pipeP, } = require('ramda')

const toSingleObject = async (r,a,ctx,i) => ({r,a,ctx,i})

const getRates = async ({r, a, ctx, i}) => {
	const {fetchRates} = ctx;

	const rates = await fetchRates()

	return {r, a, ctx: {...ctx, rates}, i}
}

const calculateRates = async (props) => {
	const {r,a,ctx,i} = props
	const {rates} = ctx;
	const {base, currencies} = a

	const baseRate = rates.rates[base]  // Refactor this
	const calculate = map(currency => ({
		abbreviation: currency,
		rate: rates.rates[currency] / baseRate
	}))

	return {r, a, ctx: {...ctx, rates: calculate(currencies)}, i}
}

const resolver = async ({a, ctx}) => ({
	base: a.base,
	timestamp: ctx.timestamp(),
	rates: ctx.rates
})

module.exports = pipeP(
	toSingleObject,
	getRates,
	calculateRates,
	resolver,
	tap(console.log),
)

const express = require('express')
const path = require('path')
const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const monk = require('monk')
const { map, keys, isNil, isEmpty } = require('ramda')
const { typeDefs } = require('./type-defs')

const url = process.env.MONGODB_URI

const db = monk(url)

const fetchRates = async () => {
	const res = await fetch(
		`https://openexchangerates.org/api/latest.json?app_id=${
			process.env.API_KEY
		}`,
	)
	return res.json()
}

const saveRates = async () => {
	const rates = await fetchRates()
	const bases = keys(rates.rates)

	const collection = db.get('rates')

	bases.forEach(base => {
		const rate = keys(rates.rates).map(key => ({
			abbreviation: key,
			rate: rates.rates[key] / rates.rates[base],
		}))

		const conversionRate = {
			base,
			rates: rate,
			timestamp: rates.timestamp,
		}

		collection.findOneAndUpdate(
			{ base: conversionRate.base },
			{ $currentDate: { lastModified: true }, $set: conversionRate },
			{ upsert: true, returnNewDocument: true },
		)
	})
}

const buildRates = (rates, currencies) => {
	if (!isNil(currencies) && !isEmpty(currencies)) {
		return currencies.map(currency =>
			rates.find(rate => rate.abbreviation === currency),
		)
	}
	return rates
}

const getFromRatesFromDb = base => {
	const collection = db.get('rates')
	return collection.findOne({ base })
}

const resolvers = {
	Query: {
		conversionRate: async (_, { base, currencies }) => {
			const rates = await getFromRatesFromDb(base)

			const euro = map(r => r / rates.rates['EUR'])(rates.rates)

			return {
				timestamp: rates.timestamp,
				base: rates.base,
				rates: buildRates(rates.rates, currencies),
			}
		},
	},
}
const server = new GraphQLServer({ typeDefs, resolvers })

saveRates()

server.express.use(express.static(path.join(__dirname, '../build')))

server.start(
	{
		endpoint: '/graphql',
		port: process.env.PORT || 4000,
	},
	({ port }) => {
		console.log(`Server is listening at port ${port}`)
	},
)

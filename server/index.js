const express = require('express')
const path = require('path')
const {GraphQLServer} = require('graphql-yoga')
const {typeDefs} = require('./type-defs')
const conversionRate = require('./resolver')
const mem = require('mem')
const fetch = require('node-fetch')

const fetchRates = mem(async () => fetch(`https://openexchangerates.org/api/latest.json?app_id=${
	process.env.API_KEY
}`).then(res => res.json(), {maxAge: 60 * 60 * 1000}))

const timestamp = mem(() => new Date(), {maxAge: 60 * 60 * 1000})

const start = async () => {
	const resolvers = {
		Query: {
			conversionRate
		},
	}

	const context = req => ({
		...req,
		fetchRates,
		timestamp,
	})

	const server = new GraphQLServer({typeDefs, resolvers, context})

	server.express.use(express.static(path.join(__dirname, '../build')))

	server.start(
		{
			endpoint: '/graphql',
			port: process.env.PORT || 4000,
		},
		({port}) => {
			console.log(`Server is listening at port ${port}`)
		},
	)
}

start()


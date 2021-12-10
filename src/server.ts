import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './db/db';
import typeDefs from './typeDefs/index';
import resolvers from './resolvers/index';

dotenv.config();

async function startApolloServer(typeDefs: any, resolvers: any) {
	const app: express.Application = express();
	const corsOptions = {
		origin: '*',
		credentials: true, // <-- REQUIRED backend setting
	};
	app.use(cors(corsOptions));
	const httpServer: http.Server = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({ token: req.headers.authorization || null }),
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();
	server.applyMiddleware({
		app,
		path: '/',
	});

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

	await connectDB(`${process.env.MONGO_URI}`)
		.then((data) => {
			console.log(
				`🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
			);
		})
		.catch((err) => {
			console.log(err);
		});
}

startApolloServer(typeDefs, resolvers);

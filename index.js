const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

// TODO: subscription은 일단 포기.. 하는 방법이 너무 어려우니 나중에. apollo-server-express를 사용하라고 가이드가 되어 있음
// https://www.apollographql.com/docs/apollo-server/data/subscriptions/
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) =>  ({ req, pubsub })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
      console.log(`MongoDB connected`)
      return server.listen({port: 5000});
  })
  .then((res) => {
      console.log(`Server running at ${res.url}`)
  })
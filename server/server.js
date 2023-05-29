const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/getFact', (req, res) => {
  const apiKey = 'aInKWxB6C9ppm5/rm126Ew==V2Ziy66hV5hb82LJ'
  var name = 'cheetah'
  $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/animals?name=' + name,
      headers: { 'X-Api-Key': apiKey},
      contentType: 'application/json',
      success: function(result) {
          console.log(result);
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
  });
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();

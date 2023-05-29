# Project 3 starter code

This code is based off the `22-State/01-Activities/18-JWT-Review/Solved` activity and should provide a starting point for the final project.
The frontend has been updated to use the `react-bootstrap` library, however if you wish to use a different library, this can be removed and refactored.

### Things to update:
1. The `name` property in the `package.json` files.
2. In `server/config/connection.js` update `project3-db` to your desired db name.
3. In `client/public/index.html` update the `<title>` attribute to the name of your application.
4. In `client/src/components/Header/index.js` update the title of you application.


### Steps to add functionality to the starter code.
#### Server side
- Add any new models and realationships in the `server/models` folder.
- Add the new type to the `server/schema/typeDefs.js`
- Add any new queries or mutations related to the new type in the typeDefs.
- Add the queries and mutations to the `server/schema/resolvers.js` file to link up the typedefs to the mongoose models.
- Add any seeds to `server/seeders` if desired. Having seeds makes testing and prototyping easier.

- Test the queries and mutations in the graphql playground to ensure they behave as expected

#### Client side
- Create a new front-end route if needed by adding another `<Route>` to the existing ones in `client/src/App.js`
- Create the new page in `client/src/pages/<page name>.js` also create any sub components if needed in `client/src/components/<component name>/index.js`
- Add the new queries and mutations to the `client/src/utils/mutations.js` or `queries.js` (these should be confirmed working in the graphql playground first);
- Add the query/mutations using the `useQuery` or `useMutation` hooks from apollo.

TO DO

Add animal facts api using axios
store user credentials into the database 
search function included in the user log in section 

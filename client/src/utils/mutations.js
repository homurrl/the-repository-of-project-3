import { gql, useMutation } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER_SEARCH_TERMS = gql`
mutation addUsersearchTerm ($userId: ID, $searchTerm: String!) {
  addUsersearchTerm(userId:$userId,searchTerm:$searchTerm){
    _id
    username
    searchTerms
  }
}
`

export const GET_USER_SEARCH_TERMS = gql`
mutation getUsersearchTerm ($userId: ID) {
  getUsersearchTerm(userId:$userId){
    _id
    username
    searchTerms
  }
}
`
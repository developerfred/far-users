import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    getUsers: [User]
    getPfpByAddress(address: String!): String!
    pfpByFid(fid: Int!): User
    getUserByAddress(address: String!): User
  }

  type User {
    fid: ID!
    username: String
    pfp_url: String
    addresses: [Address]
  }

  type Address {
    id: ID!
    protocol: String
    address: String
  }
`;

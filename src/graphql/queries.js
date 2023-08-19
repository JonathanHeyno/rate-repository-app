import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
            node {
              id
              ownerName
              description
              forksCount
              fullName
              language
              ownerAvatarUrl
              ratingAverage
              reviewCount
              stargazersCount
            }
        }
    }
  }
`;

// other queries...

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const API_OPERATIONS = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  IS_AUTHENTICATED: 'IsAuthenticated'
}

export const loginMutation = () =>
  useMutation(
    gql`
      mutation ${API_OPERATIONS.LOGIN}($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                name
                email
            }
        }
      }
    `
  )

export const logoutMutation = () =>
  useMutation(
    gql`
        mutation ${API_OPERATIONS.LOGOUT} {
          logout
        }
      `
  )

export const isAuthenticated = () => {
  return useQuery(
    gql`
    query ${API_OPERATIONS.IS_AUTHENTICATED} {
      isAuthenticated
    }
  `,
    null,
    {
      fetchPolicy: 'no-cache'
    }
  )
}

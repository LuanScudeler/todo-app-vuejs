import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const API_OPERATIONS = {
  LOGIN: 'Login'
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

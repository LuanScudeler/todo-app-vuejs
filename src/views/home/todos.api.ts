import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {
  DELETE_TODO,
  GET_TODOS,
  POST_TODO,
  UPDATE_TODO
} from './apiOperations.const'

export const fetchTodos = () => {
  return useQuery(
    gql`
  query ${GET_TODOS} {
    todos {
      id
      title
    }
  }
`,
    null,
    {
      fetchPolicy:
        process.env.NODE_ENV === 'development' ? 'network-only' : 'cache-first'
    }
  )
}

export const createMutation = () =>
  useMutation(
    gql`
      mutation ${POST_TODO}($title: String!) {
        post(title: $title) {
          id
          title
        }
      }
    `,
    {
      refetchQueries: [GET_TODOS]
    }
  )

export const editMutation = () =>
  useMutation(
    gql`
      mutation ${UPDATE_TODO}($id: ID!, $title: String!) {
        update(id: $id, title: $title) {
          id
          title
        }
      }
    `,
    {
      refetchQueries: [GET_TODOS]
    }
  )

export const deleteMutation = () =>
  useMutation(
    gql`
      mutation ${DELETE_TODO}($id: ID!) {
        delete(id: $id) {
          id
          title
        }
      }
    `,
    {
      refetchQueries: [GET_TODOS]
    }
  )

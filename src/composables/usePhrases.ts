import { ref } from 'vue'

export const PHRASES = {
  loginEmailLabel: 'Email',
  loginPasswordLabel: 'Password',
  loginBtnName: 'LOGIN',
  logoutBtnName: 'LOGOUT',
  titleText: 'Todo Vue App',
  todoTitleLabel: 'Todo title',
  addBtnName: 'Add',
  editBtnName: 'Edit',
  deleteBtnName: 'Delete',
  saveBtnName: 'Save',
  returnBtnName: 'Return'
}

// global state, created in module scope
const phrases = ref(PHRASES)

export function usePhrases() {
  return {
    phrases
  }
}

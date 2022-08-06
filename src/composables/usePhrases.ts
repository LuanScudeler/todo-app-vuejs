import { ref } from 'vue'

export const PHRASES = {
  titleText: 'Todo Vue App',
  todoTitleLabel: 'Todo title',
  addBtnName: 'Add'
}

// global state, created in module scope
const phrases = ref(PHRASES)

export function usePhrases() {
  return {
    phrases
  }
}

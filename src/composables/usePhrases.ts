import { ref } from 'vue'

// global state, created in module scope
const phrases = ref({
  titleText: 'Todo Vue App',
  todoTitleLabel: 'Todo title'
})

export function usePhrases() {
  return {
    phrases
  }
}

import { ref, computed } from 'vue'

export function usePasswordStrength(passwordRef) {
  const specialCharRegex = /[<>?#^*!@()]/ // removed `i` as it's unnecessary

  const hasSpecialChars = computed(() =>
    specialCharRegex.test(passwordRef.value || ''),
  )

  const passwordStrengthBar = ref('bg-gray-300 w-0')

  const isStrongPassword = computed(() => {
    const pwd = passwordRef.value || ''
    return (
      pwd.length >= 8 &&
      /\d/.test(pwd) &&
      /[A-Z]/.test(pwd) &&
      hasSpecialChars.value
    )
  })

  const checkPasswordStrength = () => {
    if (isStrongPassword.value) {
      passwordStrengthBar.value = 'bg-green-500 w-full'
    } else if (passwordRef.value?.length >= 6) {
      passwordStrengthBar.value = 'bg-yellow-400 w-2/3'
    } else if (passwordRef.value?.length > 0) {
      passwordStrengthBar.value = 'bg-red-500 w-1/3'
    } else {
      passwordStrengthBar.value = 'bg-gray-300 w-0'
    }
  }

  return {
    hasSpecialChars,
    passwordStrengthBar,
    isStrongPassword,
    checkPasswordStrength,
  }
}

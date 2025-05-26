import { ref, computed } from 'vue'

export function usePasswordStrength(passwordRef) {
  const specialCharRegex = /[<>?#^*!@()]/i

  const hasSpecialChars = computed(() =>
    specialCharRegex.test(passwordRef.value || ''),
  )

  const passwordStrengthBar = ref('bg-gray-300 w-0')

  const checkPasswordStrength = () => {
    const pwd = passwordRef.value || ''
    const hasNumber = /\d/.test(pwd)
    const hasUpper = /[A-Z]/.test(pwd)
    const len = pwd.length
    const hasSpecial = hasSpecialChars.value

    if (len >= 8 && hasNumber && hasUpper && hasSpecial) {
      passwordStrengthBar.value = 'bg-green-500 w-full'
    } else if (len >= 6 && (hasNumber || hasSpecial)) {
      passwordStrengthBar.value = 'bg-yellow-400 w-2/3'
    } else if (len > 0) {
      passwordStrengthBar.value = 'bg-red-500 w-1/3'
    } else {
      passwordStrengthBar.value = 'bg-gray-300 w-0'
    }
  }

  return {
    hasSpecialChars,
    passwordStrengthBar,
    checkPasswordStrength,
  }
}

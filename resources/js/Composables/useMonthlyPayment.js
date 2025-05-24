import { computed, unref } from 'vue'

export const useMonthlyPayment = (total, interestRate, duration) => {
  const monthlyPayment = computed(() => {
    // unref() also isRef(total) ? total.value : total
    const principle = unref(total)
    const monthlyInterest = unref(interestRate) / 100 / 12
    const numberOfPaymentMonths = unref(duration) * 12

    return principle * monthlyInterest * (Math.pow(1 + monthlyInterest, numberOfPaymentMonths)) / (Math.pow(1 + monthlyInterest, numberOfPaymentMonths) - 1)
  })

  const totalPaid = computed(() => {
    return unref(duration) * 12 * monthlyPayment.value
  })

  const totalInterest = computed(() => totalPaid.value - unref(total))

  return { monthlyPayment, totalPaid, totalInterest }
}

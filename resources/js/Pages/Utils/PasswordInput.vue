<template>
  <div class="relative">
    <input
      :id="id"
      v-model="internalValue"
      :type="showPassword ? 'text' : 'password'"
      class="input pr-10"
      autocomplete="new-password"
    />

    <button
      type="button"
      class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
      tabindex="-1"
      aria-label="Toggle password visibility"
      @click="showPassword = !showPassword"
    >
      <svg
        v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor"
      >
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7
             -1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>

      <svg
        v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor"
      >
        <path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943
             -9.542-7a9.955 9.955 0 012.362-3.568m1.758-1.435A9.969 9.969
             0 0112 5c4.477 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.191 5.159M3 3l18 18"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

// This local ref will sync with modelValue to use v-model inside input
const internalValue = ref(props.modelValue)

watch(() => props.modelValue, val => {
  internalValue.value = val
})

watch(internalValue, val => {
  emit('update:modelValue', val)
})
</script>

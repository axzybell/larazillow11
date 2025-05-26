<template>
  <form @submit.prevent="register">
    <div class="w-1/2 mx-auto">
      <!-- Name -->
      <div>
        <label for="name" class="label">Your Name</label>
        <input id="name" v-model="form.name" type="text" class="input" />
        <div v-if="form.errors.name" class="input-error">{{ form.errors.name }}</div>
      </div>

      <!-- Email -->
      <div class="mt-4">
        <label for="email" class="label">Email</label>
        <input id="email" v-model="form.email" type="text" class="input" />
        <div v-if="form.errors.email" class="input-error">{{ form.errors.email }}</div>
      </div>

      <!-- Password -->
      <div class="mt-4">
        <label for="password" class="label">Password</label>
        <!-- <input
          id="password" v-model="form.password"
          type="password" class="input"
        /> -->
        <PasswordInput
          id="password"
          v-model="form.password"
          @input="checkPasswordStrength"
        />
        <!-- Password Strength Bar -->
        <div
          class="h-2 mt-2 rounded transition-all duration-300"
          :class="passwordStrengthBar"
        />
        <!-- Special character warning -->
        <div v-if="form.password && !hasSpecialChars" class="input-error">
          Must include at least one special character: <code>&lt;&gt; ? # ^ * ! @ ( )</code>
        </div>
        <div v-if="form.errors.password" class="input-error">{{ form.errors.password }}</div>
      </div>

      <!-- Password Confirmation -->
      <div class="mt-4">
        <label for="password_confirmation" class="label">Confirm Password</label>
        <PasswordInput
          id="password_confirmation"
          v-model="form.password_confirmation"
        />
        <div v-if="form.password_confirmation && !passwordsMatch" class="input-error">
          Passwords do not match.
        </div>
      </div>

      <div class="mt-4">
        <button class="btn-primary w-full" type="submit">Create Account</button>
        <div class="mt-2 text-center">
          <Link :href="route('login')" class="text-sm text-gray-500">
            Already have an account? Click here!
          </Link>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { useForm, Link } from '@inertiajs/vue3'
import { route } from 'ziggy-js'
import { computed, toRef, watch } from 'vue'
import PasswordInput from '../Utils/PasswordInput.vue'
import { usePasswordStrength } from '@/Composables/usePasswordStrength'


const form = useForm({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})

// Create a reactive ref to the password inside form to pass to composable
const passwordRef = toRef(form, 'password')

const {
  hasSpecialChars,
  passwordStrengthBar,
  checkPasswordStrength,
} = usePasswordStrength(passwordRef)

// Run strength check whenever password changes
watch(passwordRef, () => {
  checkPasswordStrength()
})

// Password confirmation match check
const passwordsMatch = computed(() => form.password === form.password_confirmation)

const register = () => form.post(route('user-account.store'))
</script>

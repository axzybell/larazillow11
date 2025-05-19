<template>
  <div>Index</div>
  <Link href="/hello">Show Page</Link>
  <div>
    The message is {{ message }} and this is the number {{ number }}
  </div>
</template>

<script setup>
import {Link} from '@inertiajs/vue3'
defineProps({
  message: String,
  number: Number,
})
</script>


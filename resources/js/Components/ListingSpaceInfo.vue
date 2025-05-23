<template>
  <div>
    <span>{{ listing.beds }}</span> beds <span class="text-gray-400">| </span>
    <span>{{ listing.baths }}</span> baths <span class="text-gray-400">| </span>
    <span>{{ listing.area }}</span> ft²
  </div>
</template>

<script setup>
defineProps({
  listing: Object,
})
</script>

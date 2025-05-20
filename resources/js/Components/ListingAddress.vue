<template>
  <span>
    {{ listing.street }} {{ listing.street_nr }},
    {{ listing.city }}, for RM {{ listing.price }}
  </span>
</template>

<script setup>
defineProps({
  listing: Object,
})
</script>

<template>
  <Box>
    <div>
      <Link :href="route('listing.show', {listing: listings.id})">
        <div class="flex items-center gap-1">
          <Price :price="listings.price" class="text-2xl font-bold" />
          <div class="text-xs text-gray-500">
            <Price :price="monthlyPayment" /> / month
          </div>
        </div>
        <ListingSpaceInfo :listing="listings" class="text-lg" />
        <ListingAddress :listing="listings" class="text-gray-500" />
      </Link>
    </div>
  </Box>
</template>

<script setup>
import ListingAddress from '@/Components/ListingAddress.vue'
import ListingSpaceInfo from '@/Components/ListingSpaceInfo.vue'
import Price from '@/Components/Price.vue'
import Box from '@/Components/UI/Box.vue'
import { Link } from '@inertiajs/vue3'
import { useMonthlyPayment } from '@/Composables/useMonthlyPayment'

const props = defineProps({
  listings: Object,
})

const { monthlyPayment } = useMonthlyPayment(
  props.listings.price, 2.5, 25,
)
</script>

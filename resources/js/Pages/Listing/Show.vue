<template>
  <div class="flex flex-col-reverse md:grid md:grid-cols-12 gap-4">
    <Box v-if="listing.images.length" class="md:col-span-7 flex flex-col items-center w-full">
      <div class="relative w-full max-w-lg h-[500px] flex items-center justify-center group">
        <img
          :key="listing.images[currentImageIndex].id"
          :src="listing.images[currentImageIndex].src"
          class="w-full h-full max-w-[90%] max-h-[90%] object-contain rounded"
        />

        <!-- Left -->
        <button
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white text-3xl px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
          :disabled="currentImageIndex === 0"
          @click="prevImage"
        >
          ‹
        </button>

        <!-- Right -->
        <button
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white text-3xl px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
          :disabled="currentImageIndex === listing.images.length - 1"
          @click="nextImage"
        >
          ›
        </button>
      </div>

      <p class="mt-2 text-sm text-gray-500">
        Image {{ currentImageIndex + 1 }} of {{ listing.images.length }}
      </p>
    </Box>

    <EmptyState v-else class="md:col-span-7 flex items-center w-full">
      No Images
    </EmptyState>

    <div class="md:col-span-5 flex flex-col gap-4">
      <Box>
        <template #header>
          Basic Info
        </template>
        <Price :price="listing.price" class="text-2xl font-bold" />
        <ListingSpaceInfo :listing="listing" class="text-lg" />
        <ListingAddress :listing="listing" class="text-gray-500" />
      </Box>

      <Box>
        <template #header>
          Monthly Payment
        </template>
        <div>
          <label>Interest Rate ({{ interestRate }}%)</label>
          <input
            v-model.number="interestRate"
            type="range" min="0.1" max="30" step="0.1"
            class="slider"
          />

          <label>Duration ({{ duration }} Years)</label>
          <input
            v-model.number="duration"
            type="range" min="3" max="35" step="1"
            class="slider"
          />

          <div class="text-gray-600 dark:text-gray-300 mt-2">
            <div class="text-gray-400">Your Monthly Payment</div>
            <Price :price="monthlyPayment" class="text-3xl" />
          </div>

          <div class="mt-2 text-gray-500">
            <div class="flex justify-between">
              <div>Total Paid</div>
              <div>
                <Price :price="totalPaid" class="font-medium" />
              </div>
            </div>
            <div class="flex justify-between">
              <div>Principal Paid</div>
              <div>
                <Price :price="listing.price" class="font-medium" />
              </div>
            </div>
            <div class="flex justify-between">
              <div>Interest Paid</div>
              <div>
                <Price :price="totalInterest" class="font-medium" />
              </div>
            </div>
          </div>
        </div>
      </Box>

      <MakeOffer
        v-if="user && !offerMade"
        :listing-id="listing.id"
        :price="listing.price"
        @offer-updated="offer = $event"
      />

      <OfferMade v-if="user && offerMade" :offer="offerMade" />
    </div>
  </div>
</template>

<script setup>
import ListingAddress from '@/Components/ListingAddress.vue'
import ListingSpaceInfo from '@/Components/ListingSpaceInfo.vue'
import Price from '@/Components/Price.vue'
import Box from '@/Components/UI/Box.vue'
import MakeOffer from '@/Pages/Listing/Show/Components/MakeOffer.vue'
import { computed, ref } from 'vue'
import { useMonthlyPayment } from '@/Composables/useMonthlyPayment'
import { usePage } from '@inertiajs/vue3'
import OfferMade from './Show/Components/OfferMade.vue'
import EmptyState from '@/Components/UI/EmptyState.vue'


const interestRate = ref(2.5)
const duration = ref(25)
const currentImageIndex = ref(0)

const props = defineProps({
  listing: Object,
  offerMade: Object,
})

const offer = ref(props.listing.price)

const { monthlyPayment, totalPaid, totalInterest } = useMonthlyPayment(
  offer, interestRate, duration,
)

const page = usePage()
const user = computed(
  () => page.props.user,
)

const nextImage = () => {
  if (currentImageIndex.value < props.listing.images.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}
</script>

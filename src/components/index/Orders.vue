<template>
  <div>
    <div class="text-center text-md-body-1">
      Orders
    </div>
    <v-data-table
      :headers="headers"
      :items="orders"
    >
      <template v-slot:item.timestamp="{ item }">
        {{ dateTimeFormatting(item.timestamp) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import dateTimeMixin from '@/mixins/dateTimeMixin'

export default {
  name: 'Orders',
  mixins: [
    dateTimeMixin,
  ],
  data: () => ({
    headers: [
      { text: 'Order ID', align: 'center', value: 'orderID' },
      { text: 'Symbol', align: 'center', value: 'symbol' },
      { text: 'Qty', align: 'center', value: 'orderQty' },
      { text: 'Side', align: 'center', value: 'side' },
      { text: 'Price', align: 'center', value: 'price' },
      { text: 'Status', align: 'center', value: 'ordStatus' },
      { text: 'Timestamp', align: 'center', value: 'timestamp' },
    ],
  }),
  computed: mapGetters({
    orders: 'bitmexOrder/orders'
  }),
  mounted() {
    this.$store.dispatch('bitmexOrder/get')
  }
}
</script>

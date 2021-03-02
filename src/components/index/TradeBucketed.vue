<template>
  <div>
    <div class="text-center text-md-body-1">
      Bucketed Trades
    </div>
    <v-data-table
      :headers="headers"
      :items="tradeBucketed"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>

      <template v-slot:item.timestamp="{ item }">
        {{ dateTimeFormatting(item.timestamp) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateTimeMixin from '@/mixins/dateTimeMixin'

export default {
  name: 'TradeBucketed',
  mixins: [
    dateTimeMixin,
  ],
  data: () => ({
    search: '',
    headers: [
      { text: 'Symbol', align: 'center', value: 'symbol'},
      { text: 'Opening price', align: 'center', value: 'open'},
      { text: 'Max price', align: 'center', value: 'high'},
      { text: 'Min price', align: 'center', value: 'low'},
      { text: 'Closing price', align: 'center', value: 'close'},
      { text: 'Volume of transactions', align: 'center', value: 'grossValue'},
      { text: 'Time', align: 'center', value: 'timestamp' },
    ],
  }),
  computed: mapGetters({
    tradeBucketed: 'bitmex/tradeBucketed',
  })
}
</script>

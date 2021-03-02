<template>
  <div>
    <div class="text-center text-md-body-1">
      Instrument
    </div>
    <v-data-table
      :headers="headers"
      :items="instrument"
      item-key="symbol"
      :search="search"
      :custom-filter="filter"
      @click:row="clickOnInstrument"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Instrument',
  data: () => ({
    search: '',
    headers: [
      { text: 'Symbol', align: 'center', value: 'symbol' },
      { text: 'Last Price', align: 'center', value: 'lastPrice'},
    ],
  }),
  computed: mapGetters({
    instrument: 'bitmex/instrument'
  }),
  mounted() {
    this.$store.dispatch('bitmex/getInstrument')
  },
  methods: {
    clickOnInstrument(instrument) {
      this.$store.dispatch('bitmex/tradeBucketed', instrument.symbol)
    },
    filter(value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
    },
  }
}
</script>

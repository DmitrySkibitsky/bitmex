<template>
  <div>
    <div class="text-center text-md-body-1">
      Instrument
    </div>
    <v-data-table
      class="row-pointer"
      :headers="headers"
      :items="instrument"
      item-key="symbol"
      :search="search"
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
    instrument: 'bitmexInstrument/instrument',
    activeSymbol: 'bitmexInstrument/activeSymbol',
  }),
  mounted() {
    this.$store.dispatch('bitmexInstrument/get')

    this.wsSubscribe()
  },
  methods: {
    wsSubscribe() {
      if (!this.$socket.readyState) {
        this.$socket.onopen = async () => {
          await this.$socket.send('{"op": "subscribe", "args": "instrument"}')

          console.log('subscribed: instrument')
        }
      }

      const self = this

      this.$socket.onmessage = (event) => {
        let data = JSON.parse(event.data)

        if (typeof data.table !== 'undefined') {
          data = data.data.filter(item => typeof item.lastPrice !== 'undefined')

          self.$store.dispatch('bitmexInstrument/handlerWsInstrument', data)
        }
      }
    },
    async clickOnInstrument(instrument) {
      await this.$store.dispatch('bitmexInstrument/setActiveSymbol', instrument.symbol)
      await this.$store.dispatch('bitmexInstrument/updateOldActiveSymbol', this.activeSymbol)
      await this.$store.dispatch('bitmexTradeBucketed/get', instrument.symbol)
    },
  }
}
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>

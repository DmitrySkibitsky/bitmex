<template>
  <div>
    <div class="text-center text-md-body-1">
      Bucketed Trades
    </div>
    <v-alert
      v-if="alertMessage !== null"
      dense
      text
      :type="alertType"
    >
      {{ alertMessage }}
    </v-alert>
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
import alertMixin from '@/mixins/alertMixin'

export default {
  name: 'TradeBucketed',
  mixins: [
    dateTimeMixin,
    alertMixin,
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
    tradeBucketed: 'bitmexTradeBucketed/tradeBucketed',
    activeSymbol: 'bitmexInstrument/activeSymbol',
    oldActiveSymbol: 'bitmexInstrument/oldActiveSymbol',
  }),
  watch: {
    async 'activeSymbol'() {
      if (this.oldActiveSymbol !== null) {
        await this.wsUnsubscribe(this.oldActiveSymbol)
      }

      this.wsHandler()
    }
  },
  mounted() {
    this.wsHandler()
  },
  methods: {
    async wsSend(activeSymbol, op = 'subscribe') {
      await this.$socket.send(`{"op": "${op}", "args": "tradeBin1m:${activeSymbol}"}`)

      console.log(`${op}: ${activeSymbol}`)
    },
    async wsUnsubscribe(activeSymbol) {
      await this.wsSend(activeSymbol, 'unsubscribe')
    },
    async wsSubscribe(activeSymbol) {
      await this.wsSend(activeSymbol)
    },
    wsHandler() {
      if (this.activeSymbol === null) {
        return false
      }

      const self = this

      if (this.$socket.readyState) {
        this.wsSubscribe(this.activeSymbol)
      } else {
        this.$socket.onopen = () => {
          this.wsSubscribe(self.activeSymbol)
        }
      }

      this.$socket.onmessage = (event) => {
        let data = JSON.parse(event.data)

        if (typeof data.table !== 'undefined'
          && typeof data.action !== 'undefined'
          && typeof data.data !== 'undefined'
          && data.table === 'tradeBin1m'
          && data.action === 'insert') {
          self.$store.dispatch('bitmexTradeBucketed/insert', data.data)

          this.alertMessage = 'Data updated'
          this.resetAlert()
        }
      }
    },
  }
}
</script>

<template>
  <v-row>
    <v-col cols="2">
      <instrument />
    </v-col>

    <v-col cols="6">
      <trade-bucketed />
    </v-col>
  </v-row>
</template>

<script>
import Instrument from '@/components/index/Instrument'
import TradeBucketed from '@/components/index/TradeBucketed'

export default {
  name: 'Index',
  components: {
    TradeBucketed,
    Instrument,
  },
}
</script>

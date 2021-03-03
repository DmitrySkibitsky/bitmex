<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
    >
      <instrument />
    </v-col>

    <v-col
      cols="12"
      lg="6"
    >
      <trade-bucketed />
    </v-col>

    <v-col
      cols="12"
      lg="2"
    >
      <form-order />
    </v-col>

    <v-col cols="12">
      <orders />
    </v-col>
  </v-row>
</template>

<script>
import Instrument from '@/components/index/Instrument'
import TradeBucketed from '@/components/index/TradeBucketed'
import FormOrder from '@/components/index/FormOrder'
import Orders from '@/components/index/Orders'

export default {
  name: 'Index',
  components: {
    Orders,
    FormOrder,
    TradeBucketed,
    Instrument,
  },
}
</script>

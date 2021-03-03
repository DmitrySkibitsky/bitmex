<template>
  <div>
    <div class="text-center text-md-body-1">
      Order
    </div>

    <div class="mt-11" />

    <template v-if="activeSymbol === null">
      <v-alert
        dense
        outlined
        type="info"
      >
        Select Instrument
      </v-alert>
    </template>

    <validation-observer
      v-if="activeSymbol !== null"
      ref="observerOrder"
    >
      <v-form
        ref="formOrder"
        @submit.prevent="submit"
      >
        <validation-provider
          v-slot="{ errors, valid }"
          name="Qty"
          rules="required|numeric"
        >
          <v-text-field
            v-model="orderQty"
            label="Qty"
            required
            :error-messages="errors"
            :success="valid"
          />
        </validation-provider>

        <v-alert
          v-if="alertMessage !== null"
          dense
          text
          :type="alertType"
        >
          {{ alertMessage }}
        </v-alert>

        <v-item-group class="v-btn-toggle">
          <v-btn
            block
            depressed
            large
            @click="submit('Sell')"
            v-text="'Sell'"
          />
          <v-btn
            block
            depressed
            large
            @click="submit('Buy')"
            v-text="'Buy'"
          />
        </v-item-group>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import veeValidationMixin from '@/mixins/veeValidationMixin'
import {mapGetters} from 'vuex'
import alertMixin from '@/mixins/alertMixin'

export default {
  name: 'FormOrder',
  mixins: [
    veeValidationMixin,
    alertMixin,
  ],
  data: function () {
    return {
      orderQty: 1,
    }
  },
  computed: mapGetters({
    activeSymbol: 'bitmexInstrument/activeSymbol',
  }),
  watch: {
    'orderQty'(value) {
      if (value <= 0) {
        this.orderQty = 1
      }
    }
  },
  methods: {
    submit(side) {
      this.$refs.observerOrder.validate().then((valid) => {
        if (!valid) {
          return false
        }

        this.$store.dispatch('bitmexOrder/create', {
          activeSymbol: this.activeSymbol,
          qty: this.orderQty,
          side
        }).then(() => {
          this.orderQty = 1

          this.alertMessage = 'Successful order'
          this.alertType = 'success'

          this.resetAlert()
        }).catch((e) => {
          if (typeof e.response.data.error.message !== 'undefined') {
            this.alertMessage = e.response.data.error.message
            this.alertType = 'error'

            this.resetAlert()
          }
        })
      })
    }
  }
}
</script>

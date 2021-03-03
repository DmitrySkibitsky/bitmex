import { required, numeric } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  created() {
    setInteractionMode('eager')

    extend('required', {
      ...required
    })

    extend('numeric', {
      ...numeric
    })
  },
}

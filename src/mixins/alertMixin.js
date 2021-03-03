export default {
  data: () => ({
    alertType: 'success',
    alertMessage: null,
  }),
  methods: {
    resetAlert() {
      setTimeout(() => {
        this.alertMessage = null
      }, 4000)
    }
  }
}

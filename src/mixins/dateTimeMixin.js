export default {
  methods: {
    dateTimeFormatting(dateTime) {
      return this.$dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss')
    },
  }
}

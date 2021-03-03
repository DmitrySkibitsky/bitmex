<template>
  <v-app id="inspire">
    <v-app-bar
      app
      rounded="lg"
      color="white"
      flat
    >
      <v-tabs
        centered
        class="ml-n9"
        color="indigo darken-1"
      >
        <v-tab to="/">
          <div class="text-lg-h6">
            {{ appName }}
          </div>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3 mt-4">
      <v-col
        cols="12"
      >
        <v-sheet
          min-height="80vh"
          rounded="lg"
        >
          <router-view />
        </v-sheet>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Default',
  computed: mapGetters({
    appName: 'app/appName'
  }),
}
</script>

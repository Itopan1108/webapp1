<template>
  <v-app id="app-root">
    <v-app-bar app
     dark
     color="primary"
    >
      <v-toolbar-title>
        書籍管理のアプリ
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <book-app />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="js">
import Vue from 'vue'
import BookApp from '@/view/BookApp'

export default Vue.extend({
  components: {
    BookApp
  },
  data () {
    return {}
  },
  created () {}
})
</script>

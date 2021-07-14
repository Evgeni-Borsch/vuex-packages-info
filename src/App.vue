<template>
  <v-app id="inspire">
    <vue-app-bar ></vue-app-bar>
    <v-main>
      <table-packages ></table-packages>
    </v-main>
    <footer-lower ></footer-lower>
  </v-app>
</template>

<script>
import vueAppBar from '@/components/vueAppBar'
import tablePackages from '@/components/tablePackages'
import footerLower from '@/components/footerLower';

export default {
  name: 'App',
  components: {
    vueAppBar,
    tablePackages,
    footerLower
  },
};
</script>

<style lang="scss">
#inspire {
  background: linear-gradient(to bottom, #008080 0%, #000000 101%);
}

.positionApp {
  display: block;
  margin: 0 auto;
}
.v-toolbar__content{
  justify-content: center
}
</style>
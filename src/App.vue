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
*::-webkit-scrollbar{
  width: 6px;
  height: 6px;
}
*:-webkit-scrollbar-track{
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
  border-radius: 10px;
}
*::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background: linear-gradient(180deg, #b1f6ff, darkred);
}
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
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
  background: darkred;
}
</style>
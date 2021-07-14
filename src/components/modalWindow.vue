<template>
    <v-card
      height="426px"
      color="black"
      class="card"
      max-width="344"
    >
      <v-expand-transition >
        <v-card
          class="transition-fast-in-fast-out"
          dark
          shaped
          elevation="24"
          width="400px"
          min-height="426px"
        >
          <v-card-text 
            class="ModalCardText pb-0"
            text-sm-body-2
          >
            <h5 class="subtitle-1">
              Name: "{{title}}"              
            </h5>
            <h5 class="subtitle-1">
              Type: "{{isType}}"
            </h5>
            <div>
              <p class="aboutDownloads">
                Общее число скачиваний:  <span class="aboutDownloads_versions"> {{ info.total }} </span>
              </p>
              
            </div>
            <div class="graphState">
              <span> {{ info.versions }} </span>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0">
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
</template>

<script>

import axios from 'axios'

export default {
    data: () => ({
      info: ''
    }),
    props:{
      isType: {
        type: String
      },
      title: {
        type: String,
      }
    },
    mounted(){  
      axios
        .get(`https://data.jsdelivr.com/v1/package/${this.isType}/${this.title}/stats`)
        .then(response => {
            this.info = response.data;
        });
    }
}

</script>

<style>
.ModalCardText{
}
.aboutDownloads_versions{
  font-family: sans-serif;
  color: red;
}
</style>
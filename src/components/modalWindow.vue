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
              Название: "{{title}}"              
            </h5>
            <h5 class="subtitle-1">
              Тип: "{{isType}}"
            </h5>
            <div>
              <p class="aboutDownloads">
                Общее число скачиваний:  <span class="aboutDownloads_versions"> {{ info.total }} </span>
              </p>
              
            </div>
            <div class="graphState">
              <canvas ref="canvas"></canvas>
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
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data: () => ({
      info: '',
      versions:[],
      chartdata: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
      chartoptions:{
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
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
            this.versions = Object.keys(this.info.versions);
            console.log(this.info.versions);
        });
      this.renderChart({
        labels: this.versions,
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    })
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
<template>
    <div class="modal-card">
        <v-card
          color="rgb(0 56 56)"
          shaped
          elevation="24"
          width="400px"
          max-height="392px"
          tile
        >
          <v-card-text 
            class="modal-card-text pb-0"
            text-sm-body-2
          >
            <div class="modal-card-text__header">
              <h2>
               {{title}}  <span> ({{isType}}) </span> 
              </h2>
              <img src="../assets/close.png" alt="close" width="10%" height="10%" class="close-btn" @click="this.$emit('closeModal')">
            </div>
              <p class="about-downloads__versions"> {{ info.total }} <span>downloads</span></p>
             
              
            <div class="graphState">
              <canvas ref="canvas" width="400px" height="400px"></canvas>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0">
          </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import axios from 'axios'
import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    data() {
      return {
        info: '',
        versions:[],
        totalDownloads:[],
      }
    },

    props:{
      isType: {
        type: String
      },
      title: {
        type: String,
      },
      showModal:{
        type: Boolean
      }
    },
    mounted(){  
      axios
        .get(`https://data.jsdelivr.com/v1/package/${this.isType}/${this.title}/stats`)
        .then(response => {
            this.info = response.data;
            this.resultData(response.data.versions)
        });
    },
    methods:{
      resultData(info){
        this.versions = Object.keys(info).slice(-5);
        this.totalDownloads = Object.values(info).slice(-5);
        this.renderChart({
        labels: this.versions,
        datasets: [{
            label: '# of Votes',
            data: this.totalDownloadsVersions,
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
            borderWidth: 2
          }]
        })
      }
    },
    computed:{
      totalDownloadsVersions(){
        return this.totalDownloads.map( v => v.total)
      }
    },
}

</script>

<style>
.modal-card-text__header{
  color: #fff;
  border: 1px solid;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}
.modal-card-text__header > h2{
  display: flex;
  flex-direction: column;
}
.modal-card-text__header > h2 > span  {
      font-size: 12px;
    font-weight: 100;
}
.modal-card{
  color: #fff;
  max-width: 295px;
  height: 426px;
}
.about-downloads__versions{
  font-family: sans-serif;
  color: red;
  text-align: center;
  font-weight: 800;
}
.about-downloads__versions > span {
  font-weight: 400;
  color: #fff;
}
.close-btn {
  position: absolute;
  top: 0.5%;
  right: 0.5%;
  width: 6%;
  height: 4%;
  background: #fae7e7;
  border-radius: 30px;
  cursor: pointer;
  opacity: 0.7;
}
.close-btn:hover{
  background: red;
  box-shadow: 0 0 10px red, 0 0 40px rgb(0, 0, 0);
}
</style>
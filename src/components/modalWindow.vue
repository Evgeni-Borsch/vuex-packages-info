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
              <h3>
               {{title}}  <span> ({{isType}}) </span> 
              </h3>
              <img src="../assets/close.png" alt="close" class="close-btn" @click="closeModal">
            </div>
              <p class="about-downloads__versions"> {{ info.total }} <span>downloads</span></p>
             
              
            <div class="graphState">
              <canvas ref="canvas" width="370px" height="370px"></canvas>
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
import { EventBus } from './EventBus';


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
      this.getRequest(this.isType,this.title);
    },
    watch:{
      reqParams(newValue){
        this.getRequest(newValue.type, newValue.title);
      }
    },
    methods:{
      closeModal(){
        EventBus.$emit('closeModal', false);
      },
      getRequest(type,title){
        axios
          .get(`https://data.jsdelivr.com/v1/package/${type}/${title}/stats`)
          .then(response => {
              this.info = response.data;
              this.resultData(response.data.versions)
          });
      },
      resultData(info){
        this.versions = Object.keys(info).slice(-5);
        this.totalDownloads = Object.values(info).slice(-5);
        if( this.versions.length === 0 ){
          let graphClass = document.querySelector(".graphState");
          graphClass.style.color = '#77bd13';
          return graphClass.innerHTML = 'no versions available'; 
        } 
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
      reqParams(){
        return{
          type: this.isType,
          title: this.title
        }
      },
      totalDownloadsVersions(){
        try {
          return this.totalDownloads.map( v => v.total)
        } catch (err) {
          return console.log(err);
        }
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
.modal-card-text__header > h3{
  display: flex;
  flex-direction: column;
}
.modal-card-text__header > h3 > span  {
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
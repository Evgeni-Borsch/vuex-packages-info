<template>
  <v-container class="col-md-4">
    <v-row>
      <v-text-field 
        dark
        v-model="search"
        label="Введите название пакета"
        append-icon="mdi-magnify"
        @keyup.enter="search = ''"  
      >
      </v-text-field>     
    </v-row>
    <v-row class="mainSection">
      <v-simple-table 
        dense 
        shaped
        width="400px"
        height="392px"
        class="table-content"
      >
        <template v-slot:default>
          <thead class="table-content_header">
              <tr>
                <th >
                  <h2> Package name </h2>
                </th>
                <th >
                  <h2> Type </h2>
                </th>
              </tr>
          </thead>              
          <tbody>
            <tr
              class="trTable"
              v-for="(item, index) in paginatedTable"
              :key="index"
              :search="search"
              @click="getPackage(item)"
            >
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      
      <modal-window 
        class="modalWindow" 
        v-if="showModal" 
        :title="title"
        :isType="isType"
      >
      </modal-window>
    </v-row>

    <v-row class="col-md-12" justify="center">
      <v-col class="page" 
        v-for="page in pages" 
        :key="page"
        :class="{'pageSelected': page === pageNumber}"
        @click="pageClick(page)"
      >
        {{ page }}
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import modalWindow from './modalWindow'
import { EventBus } from './EventBus';


export default {
  data() {
    return {
      showModal: false,
      isActive: false,
      packagesPerPage: 10,
      pageNumber: 1,
      reveal: false,
      title: {
        type: Object,
        required: false
      },
      isType: '',
      search: ''
    }
  },
  components: {
    modalWindow
  },

  mounted() {
    document.querySelector(".mainSection > .theme--light.v-data-table").style.margin = '0 auto'
    EventBus.$on('closeModal', (e)=>{ this.showModal = e });
    this.showDateInTable();
  },
  
  watch:{
    paginatedTable(newValue){
      if(newValue.length < 10){
        this.pageNumber = 1
      }
    },
    showModal(){
      try {
        if(false === this.showModal){
          document.querySelector(".mainSection > .theme--light.v-data-table").style.margin = '0 auto'
        }
      }catch(err){
        console.error(err);
      }
    }
  },
  
  computed: {
    ...mapGetters(["allPackages"]),
    pages() {
      return Math.ceil(this.allPackages.length / 10);
    },
    paginatedTable() {
      let from = (this.pageNumber - 1)* this.packagesPerPage;
      let to = from + this.packagesPerPage;
      return this.filtredNames.slice(from,to);
    },
    filtredNames() {
      return this.allPackages.filter((item) => {
        return item.name.match(this.search)
      })
    }
  },  
  
  
  methods: {
    ...mapActions(["showDateInTable"]),
    pageClick(page) {
      this.pageNumber = page;
    },
    getPackage(item){
      this.title = item.name;
      this.isType = item.type;
      this.showModal = true;
    }
   
  }
};

</script>

<style>
@font-face {
  font-family: "Roboto";
  src: url("../fonts/Roboto-Regular.ttf");
}
* {
  font-family: "Roboto";
  color: #fff;
}
.container {
  max-width: 700px;
}
.page {
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 30%;
}
.page:hover {
  background: rgb(0 56 56);
  transition: 0.2s;
  color: white;
  box-shadow: 0 0 10px #fff, 0 0 40px teal;
  transition: 0.5s;
  transition-delay: 0.04s;
}
.pageSelected {
  background: darkred;
  color: white;
}
.modalWindow{
  background: rgb(0 56 56);
  transition: 0.2s;
  color: white;
  box-shadow: 0 0 10px #fff, 0 0 40px teal;
  transition: 0.5s;
  transition-delay: 0.04s;
  height: 392px;
}
.mainSection {
  display: flex;
  justify-content: space-between;
}
.mainSection > .theme--light.v-data-table {
  background: rgb(0 56 56);
  color: #fff;
  width: 295px;
}
.table-content {
  max-width: 295px;
  max-height: 392px;
  text-align: center;
  padding: 20px;
}
.trTable{
  cursor: pointer;
}
@media (max-width: 960px){
  .container {
    max-width: 700px;
  }
}
@media (max-width: 750px){
  .container {
    max-width: 500px;
  }
  .mainSection > .theme--light.v-data-table {
    margin: 20px auto;
  }
  .modalWindow{
    margin: 0 auto;
  }
}
@media (max-width: 550px){
  .container {
    max-width: 300px;
  }
}
</style>
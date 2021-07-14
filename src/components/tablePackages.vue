<template>
  <v-container class="col-md-6">
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
        fixed-header 
        dark
        dense 
        class="table_content"
      >
          <template >
              <thead>
                  <tr>
                    <th >
                        <h2 class="table_content"> Package name </h2>
                    </th>
                    <th >
                        <h2 class="table_content"> Type </h2>
                    </th>
                  </tr>
              </thead>              
              <tbody >
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
    this.showDateInTable();
  },
  
  watch:{
    paginatedTable(newValue){
      if(newValue.length < 10){
        this.pageNumber = 1
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
      console.log(item);
      this.title = item.name;
      this.isType = item.type;
      this.showModal = !this.showModal;
    },
   
  }
};

</script>

<style>
.page {
  padding: 10px;
  color: black;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 30%;
}
.page:hover {
  background: rgb(17, 10, 10);
  transition: 0.2s;
  color: white;
}
.pageSelected {
  background: rgb(17, 10, 10);
  color: white;
}
.modalWindow{
  max-width: 344px;
  height: 300px;
  overflow-y: scroll;
  transition-delay:0.6s
}
.trTable{
  cursor: pointer;
}
.mainSection {
  display: flex;
  justify-content: space-between;
}
</style>
<template>
  <div class="models">
    <b-table striped hover :items="job.models" :fields="fields">
      <template #cell(name)="row">
        {{ row.item.firstName }} {{ row.item.lastName }}
      </template>
      <template #cell(actions)="row">
        <b-button v-on:click="deleteModel(row.item.efModelId)" v-show="isManager">Delete</b-button>
      </template>
    </b-table>
    <b-button v-on:click="addModel()" v-show="isManager">Add model</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Models",
  data() {
    return {
      id: "new",
      isManager: false,
      fields: ["name", "email", "phoneNo", "actions"],
      job: {}
    }
  },
  methods: {
    addModel() {
      this.$router.push(`/model/${this.id}/new`);
    },
    deleteModel(id) {
      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};
      axios.delete(`/api/Jobs/${this.id}/model/${id}`, config).then(() => {
        this.getData();
      }).catch(error => {
        this.$bvToast.toast(error?.response?.data[""], {
          title: "Failed to delete model",
          toaster: "b-toaster-top-right",
          solid: true,
          appendToast: true
        });
      });
    },
    getData() {
      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};
      axios.get("/api/Models", config).then(response => {
        this.models = response.data;
        return axios.get(`/api/Jobs/${this.id}`, config);
      }).then(response => {
        this.job = response.data;
        this.job.models = this.job.models.map(e => {
          const model = this.models.find(e2 => e.firstName === e2.firstName && e.lastName === e2.lastName);
          return model;
        })
      }).catch(error => {
        this.$bvToast.toast(error?.response?.data[""], {
          title: "Failed to get models",
          toaster: "b-toaster-top-right",
          solid: true,
          appendToast: true
        });
      });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.isManager = parseInt(localStorage.getItem("modelId")) === -1;
    this.getData();
  }
}
</script>

<style scoped>
</style>

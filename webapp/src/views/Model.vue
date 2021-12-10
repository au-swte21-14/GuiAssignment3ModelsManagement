<template>
  <div class="expense">
    <b-form @submit="onSubmit">
      <b-form-group
          label="Select model:"
      >
        <b-form-select v-model="model_id" :options="options"></b-form-select>
      </b-form-group>
      <div class="mt-3">Selected: <strong>{{ model_id }}</strong></div>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Expense",
  data() {
    return {
      model_id: null,
      job_id: null,
      id: "new",
      options: [],
      models: []
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};

      let p = axios.post(`/api/Jobs/${this.job_id}/model/${this.model_id}`, null, config);


      p.then(() => {
        this.$router.back();
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Failed to add model",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        } else {
          console.error(error);
          this.$bvToast.toast("Unknown error", {
            title: "Failed to add model",
            toaster: "b-toaster-top-right",
            solid: true,
            appendToast: true
          });
        }
      });
    },
    getData() {
      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};
      axios.get("/api/Models", config).then(response => {
        this.models = response.data;
        return axios.get(`/api/Jobs/${this.job_id}`, config);
      }).then(response => {
        this.job = response.data;
        this.job.models = this.job.models.map(e => {
          const model = this.models.find(e2 => e.firstName === e2.firstName && e.lastName === e2.lastName);
          return model;
        })
        this.options = this.models.filter(m1 => !this.job.models.some(m2 => m1.efModelId === m2.efModelId)).map(model => {
          return {text: `${model.firstName} ${model.lastName}`, value: model.efModelId}
        });
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
    this.job_id = parseInt(this.$route.params.job_id);

    this.getData();
  }
}
</script>

<style scoped>
.expense {
  max-width: 300px;
  margin: auto;
}
</style>

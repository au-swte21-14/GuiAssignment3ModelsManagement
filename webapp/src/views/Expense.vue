<template>
  <div class="expense">
    <b-form @submit="onSubmit">
      <b-form-group
          label="Text:"
      >
        <b-form-input
            v-model="form.text"
            placeholder="Enter text"
        ></b-form-input>
      </b-form-group>

      <b-form-group
          label="Amount:"
      >
        <b-form-input
            v-model="form.amount"
            type="number"
            placeholder="Enter amount"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Date:"
      >
        <b-form-datepicker v-model="form.date" locale="da"></b-form-datepicker>
      </b-form-group>
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
      model_id: -1,
      job_id: null,
      id: "new",
      form: {}
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      const data = {
        ...this.form,
        jobId: this.job_id,
        modelId: this.model_id,
        amount: parseInt(this.form.amount),
        date: new Date(this.form.date)
      };

      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};

      let p = null;
      if (this.id === "new") {
        p = axios.post("/api/Expenses/", data, config);
      } else {
        p = axios.put(`/api/Expenses/${this.id}`, data, config);
      }

      p.then(() => {
        this.$router.back();
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Failed to save expense",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        } else {
          console.error(error);
          this.$bvToast.toast("Unknown error", {
            title: "Failed to save expense",
            toaster: "b-toaster-top-right",
            solid: true,
            appendToast: true
          });
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.job_id = parseInt(this.$route.params.job_id);
    this.model_id = parseInt(localStorage.getItem("modelId"));

    if (this.id !== "new") {
      axios.get(`/api/Expenses/${this.id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.form = response.data;
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Failed to load expense",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        }
      });
    }
  }
}
</script>

<style scoped>
.expense {
  max-width: 300px;
  margin: auto;
}
</style>

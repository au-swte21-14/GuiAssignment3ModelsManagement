<template>
  <div class="job">
    <b-form @submit="onSubmit">
      <b-form-group
          label="Customer:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="form.customer"
            placeholder="Enter customer"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Location:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="form.location"
            placeholder="Enter location"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Days:"
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="form.days"
            type="number"
            placeholder="Enter days"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Comments:"
          label-for="input-3"
      >
        <b-form-input
            id="input-3"
            v-model="form.comments"
            placeholder="Enter comments"
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Start date:"
          label-for="input-4"
      >
        <b-form-datepicker id="input-4" v-model="form.startDate" locale="da"></b-form-datepicker>
        <b-form-timepicker v-model="form.startTime" locale="da"></b-form-timepicker>
      </b-form-group>
      <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Job",
  data() {
    return {
      id: "new",
      form: {}
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const startDate = new Date(this.form.startDate);
      const startTime = moment(this.form.startTime, 'HH:mm:ss');
      startDate.setHours(startTime.hours());
      startDate.setMinutes(startTime.minutes());

      const data = {...this.form, startDate, days: parseInt(this.form.days)};
      const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};

      let p = null;
      if (this.id === "new") {
        p = axios.post("/api/Jobs/", data, config);
      } else {
        p = axios.put("/api/Jobs/" + this.id, data, config);
      }

      p.then(() => {
        this.$router.push('/jobs');
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Failed to save job",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        } else {
          console.error(error);
          this.$bvToast.toast("Unknown error", {
            title: "Failed to save job",
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
    if (this.id !== "new") {
      axios.get("/api/Jobs/" + this.id, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        this.form = response.data;
        const startDate = new Date(this.form.startDate);
        this.form.startTime = startDate.toLocaleTimeString('en-gb');
        console.log(this.form)
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Failed to load job",
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
.job {
  max-width: 300px;
  margin: auto;
}
</style>

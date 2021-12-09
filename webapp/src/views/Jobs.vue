<template>
  <div class="jobs">
    <b-table striped hover :items="jobs" :fields="fields">
      <template #cell(actions)="row">
        <b-button v-on:click="editJob(row.item.efJobId)" v-show="isManager">Edit</b-button>
      </template>
    </b-table>
    <b-button v-on:click="addJob()" v-show="isManager">Add job</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Jobs",
  data() {
    return {
      isManager: false,
      fields: ["customer", "startDate", "days", "location", "comments", "actions"],
      jobs: []
    }
  },
  methods: {
    addJob() {
      this.$router.push("/job/new");
    },
    editJob(id) {
      this.$router.push("/job/" + id);
    }
  },
  mounted() {
    this.isManager = parseInt(localStorage.getItem("modelId")) === -1;
    axios.get("/api/Jobs", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      this.jobs = response.data.map(job => {
        delete job.jobModels;
        console.log(job);
        return {
          ...job,
          startDate: new Date(job.startDate).toLocaleString("en-gb")
        }
      });
    }).catch(error => {
      this.$bvToast.toast(error?.response?.data[""], {
        title: "Failed to get jobs",
        toaster: "b-toaster-top-right",
        solid: true,
        appendToast: true
      });
    });
  }
}
</script>

<style scoped>

</style>

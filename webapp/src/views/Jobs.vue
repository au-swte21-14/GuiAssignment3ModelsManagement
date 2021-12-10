<template>
  <div class="jobs">
    <b-table striped hover :items="jobs" :fields="fields">
      <template #cell(actions)="row">
        <b-button v-on:click="editJob(row.item.efJobId)" v-show="isManager">Edit</b-button>
        <b-button v-on:click="showExpenses(row.item.efJobId)" v-show="isManager">Expenses</b-button>
        <b-button v-on:click="showModels(row.item.efJobId)" v-show="isManager">Models</b-button>
        <b-button v-on:click="addExpense(row.item.efJobId)" v-show="!isManager">Add expense</b-button>
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
      this.$router.push(`/job/${id}`);
    },
    showExpenses(id) {
      this.$router.push(`/expenses/${id}`);
    },
    showModels(id) {
      this.$router.push(`/models/${id}`);
    },
    addExpense(id) {
      this.$router.push(`/expense/${id}/new`);
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
td button {
  margin-left: 10px;
}
</style>

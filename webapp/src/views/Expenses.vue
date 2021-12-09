<template>
  <div class="expenses">
    <b-table striped hover :items="expenses" :fields="fields">
      <template #cell(actions)="row">
        <b-button v-on:click="editExpense(row.item.efExpenseId)" v-show="!isManager">Edit</b-button>
      </template>
    </b-table>
    <b-button v-on:click="addExpense()" v-show="!isManager">Add expense</b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Expenses",
  data() {
    return {
      id: "new",
      isManager: false,
      fields: ["model", "date", "text", "amount"],
      models: [],
      expenses: []
    }
  },
  methods: {
    addExpense() {
      this.$router.push(`/expense/${this.id}/new`);
    },
    editExpense(id) {
      this.$router.push(`/expense/${this.id}/${id}`);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.isManager = parseInt(localStorage.getItem("modelId")) === -1;
    const config = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}};
    axios.get("/api/Models", config).then(response => {
      this.models = response.data;
      return axios.get("/api/Expenses", config);
    }).then(response => {
      this.expenses = response.data.filter(expense => expense.jobId === parseInt(this.id)).map(expense => {
        const model = this.models.find(e => e.efModelId === expense.modelId);

        return {
          ...expense,
          date: new Date(expense.date).toDateString(),
          model: `${model.firstName} ${model.lastName}`
        }
      });
    }).catch(error => {
      this.$bvToast.toast(error?.response?.data[""], {
        title: "Failed to get expenses",
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

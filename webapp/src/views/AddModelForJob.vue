<template>

  <div :id="Job">
    <h1> Customer :  {{Job.customer}} </h1>
    <form>

      <table id="Table" align="center">
        <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Delete Model</th>
        </tr>

        </thead>
        <tr v-for="models in Job.models" v-bind:key="models.efModelId">
          <td>{{models.firstName}}</td>
          <td>{{models.lastName}}</td>
          <td>
            <input type="submit" name="Delete" value="Delete" v-on:click="deleteModel(models.phoneNo)" />
          </td>
        </tr>
      </table>

    </form>

    <form>
    <br /> <br />
      <label>Model </label>
      <select id="XD" @change="onChange($event)">
        <option v-for="models in Modeller" v-bind:value="models.efModelId" v-bind:key="models.efModelId">
          {{models.firstName}}
          {{models.lastName}}
        </option>

      </select>
      <input type="submit" value="Add model for job" v-on:click="addModel" />
    </form>

    <input type="submit" name="goBack" value="Back" v-on:click="goBack" />


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Job",
  data() {

    return {
      Job: {},
      Modeller: [],
      jobID: null,
      modelId: null,
      postPakke: {}

    }
  },

  methods: {

    onChange(event) {
      this.modelId = event.target.value;
    },
    addModel() {
      var urladdModel = "/api/Jobs${this.jobID}/model/${this.modelId}";
      this.postPakke = { jobId:this.jobID, modelId:this.modelId};
      axios.post(urladdModel,this.postPakke,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },

          })
          .catch(error => { alert('Something bad happened with addmodel: ' + error); });
      this.onStartPage();
    },
    deleteModel(phoneNo) {
      // eslint-disable-next-line no-unused-vars
      var modelID;
      for (var i = 0; i < this.Modeller.length; i++)
      {
        if (this.Modeller[i].phoneNo == phoneNo) { modelID = this.Modeller[i].efModelId; }
      }
      var urladdModel = "/api/Jobs${this.jobID}/model/${modelID}";
      fetch(urladdModel, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }

      })
          .catch(error => { alert('Something bad happened with deleteModel: ' + error); });
    },
    onStartPage() {
      this.jobID = localStorage.getItem('jobId');

      var urljob = "/api/Jobs/${this.id}";
      var urlmodel = "api/Models";

      axios.get(urljob,
          {
            method: 'GET', credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          })

          .then((res) => {
            this.Job = JSON.
            parse(JSON.stringify(res.data));
            this.Job.startDate = new Date(this.Job.startDate).toDateString();
            return this.Job;
          }).catch(error => { alert('Something bad happened on startPage urlJob: ' + error); });

      axios.get(urlmodel,
          {
            method: 'GET', credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
          })
          .then((res) => {
            this.Modeller = JSON.
            parse(JSON.stringify(res.data));
            return this.Modeller;
          }).catch(error => { alert('Something bad happened on startPage (get urlmodel): ' + error); });
    },
    goBack() {
      this.$router.back();
    }
  },
  mounted() {
    this.onStartPage();
  }

}

</script>


<style scoped>
table {
  width: 90%;
  border: 2px solid;
  border-radius: 25px;
  padding: 5px;
}

td {
  border-bottom: 1px solid #ddd;
  width: 300px;
  text-align: left;
}

th {
  border-bottom: 1px solid #ddd;
  height: 50px;
  background-color: darkgray;
  color: black;
  text-align: center;
  border-radius: 25px;
  padding: 5px;
}
</style>


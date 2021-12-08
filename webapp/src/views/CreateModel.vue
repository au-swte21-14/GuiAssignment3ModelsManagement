<template>
<div class="create-model">
  <h1>CreateModel</h1>
  <b-form @submit="onSubmit">
    <b-form-group
        id="input-group-1"
        label="Firstname:"
        label-for="input-1"
      >

    </b-form-group>
    <b-form-group
        id="input-group-2"
        label="Lastname:"
        label-for="input-2"
    >
    </b-form-group>
    <b-form-group
        id="input-group-3"
        label="Email:"
        label-for="input-3"
    >
    </b-form-group>
    <b-form-group
        id="input-group-4"
        label="PhoneNo:"
        label-for="input-4"
    >
    </b-form-group>
    <b-form-group
        id="input-group-5"
        label="Jobs:"
        label-for="input-5"
    >
    </b-form-group>
    <b-button type="submit" variant="primary">CreateModel</b-button>
  </b-form>
</div>
</template>

<script>
export default {
  name: "CreateModel"
}
</script>

<style scoped>

</style>
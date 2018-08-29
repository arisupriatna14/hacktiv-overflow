<template>
  <v-contaier grid-list-md>
    <v-layout row wrap>
      <v-flex md10 sm12 offset-md1>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="data.title"
            color="purple darken-2"
            label="Title"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="data.author"
            color="purple darken-2"
            label="Author"
            required
          >
          </v-text-field>
          <wysiwyg v-model="data.content" />
          <br>
          <v-btn
            @click="updateArticle"
            color="green"
            style="color: white"
          >
            Update
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-contaier>
</template>

<script>
export default {

}
</script>

<style>

</style>

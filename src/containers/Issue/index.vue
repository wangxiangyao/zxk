<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'issueWrapper',
  created() {
    this.getIssue();
  },
  methods: {
    getIssue() {
      const id = this.$route.params.id;
      const { state, dispatch } = this.$store;
      dispatch('getOneIssue', id);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

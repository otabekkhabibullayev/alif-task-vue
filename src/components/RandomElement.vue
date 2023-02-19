<template>
  <div class="card">
    <h3>{{ item.content }}</h3>
    <span>{{ item.author }}</span>
    <small>{{ item.createdDate }}</small>
    <button @click="getItem">Другая цитата</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      item: {
        content: "",
        author: "",
        createdDate: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchList"]),
    getItem() {
      this.item = this.list[Math.floor(Math.random() * this.list.length)];
    },
  },

  computed: {
    ...mapGetters(["list"]),
  },

  async mounted() {
    await this.fetchList();
    this.getItem();
  },
};
</script>

<style>
</style>

<template>
  <div class="detail">
    <div class="container">
      <div class="detail-main">
        <ol>
          <li>
            <h4>Автор</h4>
            <span>{{ detail.author }}</span>
          </li>
          <li>
            <h4>Жанры</h4>
            <span>{{ detail.genre }}</span>
          </li>
          <li>
            <h4>Время создания</h4>
            <span>{{ detail.createdDate }}</span>
          </li>
          <li>
            <h4>Цитата</h4>
            <span>{{ detail.content }}</span>
          </li>
          <li>
            <h4>Просмотов</h4>
            <span>{{ detail.views }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        author: '',
        genre: '',
        date: '',
        content: '',
        views: '',
      }

    }
  },
  name: 'list-detail',
  methods: {
    ...mapActions(["getListSlug"]),
    async updateViewsCount(id) {
      try {
        this.form = this.detail
        this.form.views = this.detail.views + 1
        let res = await axios.put(`/list/${id}`, this.form)
        return res
      } catch (e) {
        console.error(e)
      }
    }
  },
  computed: {
    ...mapGetters(["detail"]),
  },
 async mounted() {
   await this.getListSlug(this.$route.params.id);
   await this.updateViewsCount(this.$route.params.id)
  },
};
</script>

<style>
</style>

<template>
  <div class="form">
    <div class="form-input">
      <small>Автор</small>
      <input :class="{invalid: validators.author}" type="text" v-model="form.author"/>
      <span v-if="validators.author">{{validators.author}}</span>
    </div>
    <div class="form-select">
      <small>Жанры</small>
      <select :class="{invalid: validators.genre}" v-model="form.genre">
        <option v-for="i in genres" :key="i.id" :value="i.title">
          {{ i.title }}
        </option>
      </select>
      <span v-if="validators.genre">{{validators.genre}}</span>
    </div>
    <div class="form-textarea">
      <small>Цитата</small>
      <textarea :class="{invalid: validators.content}" v-model="form.content"></textarea>
      <span v-if="validators.content">{{validators.content}}</span>
    </div>
    <button type="primary" @click="onSubmit">Создать</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  inject: ["fetchList", "closeQuote"],
  data() {
    return {
      validators: {
        author: "",
        content: "",
        genre: "",
      },
      form: {
        author: "",
        content: "",
        genre: "",
        createdDate: null,
        updatedDate: null,
        views: 0,
      },
      genres: [
        {
          id: 1,
          title: "Драма",
        },
        {
          id: 2,
          title: "Эпос",
        },
        {
          id: 3,
          title: "Лирика",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["sendData"]),
    isValid() {
      let valid = true
      if (this.form.author.length === 0 || this.form.content.length === 0 || this.form.genre.length === 0) {
        this.validators.author = 'Заполните поле',
            this.validators.genre = 'Заполните поле',
            this.validators.content = 'Заполните поле',
            valid = false
      } else {
        this.validators.author = '',
            this.validators.genre = '',
            this.validators.content = '',
            valid = true
      }
      return valid
    },
    onSubmit() {
      if (this.isValid()) {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        this.form.createdDate = `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
        this.sendData({
          payload: this.form,
        });
        this.closeQuote();
        setTimeout(() => {
          this.fetchList();
        }, 100)
      }
    },
  },
};
</script>

<style>
</style>

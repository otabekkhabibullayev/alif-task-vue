<template>
  <random-element></random-element>
  <div class="table">
    <div class="table-top">
      <div class="table-top-item">
        <input placeholder="Фильтр" v-model="search"/>
      </div>
      <div class="table-top-item">
        <a-modal :footer="null" title="Создать цитату" v-model:visible="visible">
          <the-form></the-form>
        </a-modal>
        <button @click="createQuote">Создать</button>
      </div>
    </div>
    <div class="table-main" style="overflow-x: auto">
      <table v-if="list.length != 0">
        <thead>
        <tr>
          <th>№</th>
          <th>Автор</th>
          <th>Жанр</th>
          <th>Время создания</th>
          <th>Время обновления</th>
          <th>Цитата</th>
          <th></th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, idx) in filteredQuotes" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.genre }}</td>
          <td>{{ item.createdDate }}</td>
          <td>
            <small v-if="!item.updatedDate">Не обновлялось еще</small>
            {{ item.updatedDate }}
          </td>
          <td>{{ item.content }}</td>
          <td width="1%">
            <div class="table-action">
              <edit-outlined
                  @click="$router.push(`/update/${item.id}`)"
              />
              <eye-outlined @click="$router.push(`/detail/${item.id}`)"/>

              <a-popconfirm
                  placement="topLeft"
                  ok-text="Да"
                  cancel-text="Нет"
                  @confirm="onDelete(item.id)"
              >
                <template #title>
                  Вы действительно хотите удалить цитату
                </template>

                <delete-outlined/>
              </a-popconfirm>
            </div>
          </td>
        </tr>
        </tbody>

      </table>
      <h3 v-else>Цитат пока нет добавьте первую</h3>
    </div>
  </div>
</template>

<script>
import TheForm from "@/components/TheForm";
import RandomElement from "@/components/RandomElement";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";
import {mapActions, mapGetters} from "vuex";

export default {
  provide() {
    return {
      closeQuote: this.closeQuote,
      fetchList: this.fetchList,
    };
  },
  components: {
    TheForm,
    DeleteOutlined,
    EyeOutlined,
    EditOutlined,
    RandomElement,


  },
  data() {
    return {
      visible: false,
      search: "",
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
    ...mapActions(["fetchList", "deleteData"]),
    onDelete(id) {
      this.deleteData(id);
      setTimeout(() => {
        this.fetchList();
      }, 100);
    },
    createQuote() {
      this.visible = true;
    },
    closeQuote() {
      this.visible = false;
    },
  },

  computed: {
    ...mapGetters(["list"]),
    filteredQuotes() {
      return this.list.filter((quote) => {
        return (
            quote.author.indexOf(this.search) > -1 ||
            quote.createdDate.indexOf(this.search) > -1 ||
            quote.genre.indexOf(this.search) > -1
        );
      });
    },
  },

  async mounted() {
    await this.fetchList();
  },
};
</script>

<style>
</style>

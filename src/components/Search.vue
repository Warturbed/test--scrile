<template>
 <div class="container">
      <div class="search">
        <div class="search-form">
          <label for="search"></label>
          <input type="text" id="search" placeholder="Search"
            v-model.trim="searchValue"
            @keydown.esc="clearData"
          >
        </div>
        <div class="search-content">
          <!-- Иконка загрузки появляется если USERS в сторе является строкой -->
          <div class="search-loading" v-if="!searchDataType && !USERS.length">
            <img class="search-loading" src="@/img/loading.png" alt=""></div>
          <!-- Список отображается если длина массива =! 0 -->
          <ul class="search-list" v-if="USERS.length">
            <User
              v-for="user in USERS"
              :key="user.id"
              :user_data="user"
              @click="chosenUser(user.name)"
              @keydown.enter="chosenUser(user.name)"
            />
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import User from '@/components/User.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Search',
  components: {
    User
  },
  data() {
    return {
      searchValue: '',
    }
  },
  computed: {
    ...mapGetters([
      'USERS'
    ]),
    // Функция для адекватной работы иконки загрузки
    // Суть в том, что по дефолту массив в сторе является массивом
    // Чтобы появилась иконка загрузки массив в сторе становится строкой (this.CLEAR_USERS)
    // Чтобы понять, что массив отфильтрован, но пуст, в сторе он становится пустым массивом
    // Таким образом фиксится бесконечная загрузка если длина отфильтрованного массива = 0
    searchDataType() {
      if (typeof this.USERS === 'string') {
        return false;
      } else {
        return true;
      }
    },   
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API',
      'CLEAR_USERS'
    ]),
    // Очистка списка
    clearData() {
      this.searchValue = ''
    },
    // Значение нажатого пользователя передаём в input
    chosenUser(value) {
      this.searchValue = value
    },
  },
  watch: {
    // Слежение за изменением инпута и очистка если изменение произошло
    searchValue: function() {
      this.CLEAR_USERS()
      this.GET_USERS_FROM_API(this.searchValue)
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>

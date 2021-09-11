<template>
 <div class="container">
      <div class="search">
        <div class="search-form">
          <label for="search"></label>
          <input type="text" id="search" placeholder="Search"
            v-model.trim="searchValue"
            v-on:keyup.enter="searchData"
            v-on:keyup.esc="clearData"
          >
        </div>
        <div class="search-content">
          <!-- Иконка загрузки появляется только если USERS в сторе является строкой -->
          <div class="search-loading" v-if="isSearchListVisible && !searchDataType">
            <img class="search-loading" src="@/img/loading.png" alt=""></div>
          <!-- Список отображается если длина массива =! 0 -->
          <ul class="search-list" v-if="isSearchListVisible && USERS.length">
            <User
              v-for="user in USERS"
              :key="user.id"
              :user_data="user"
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
      isSearchListVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'USERS'
    ]),
    // Функция для адекватной работы иконки загрузки
    // Суть в том, что по дефолту массив в сторе является строкой
    // Чтобы понять, что массив отфильтрован, но пуст, в сторе он становится массивом
    // В целом, на этом устроена работа иконки загрузки
    searchDataType() {
      if (typeof this.USERS === 'string') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API',
      'CLEAR_USERS',
      'GET_PHOTOS_FROM_API'
    ]),
    // Передаём введённые в инпут данные в стор и делаем список видимым для активации икноки загрузки
    searchData() {
      this.GET_USERS_FROM_API(this.searchValue)
      this.isSearchListVisible = true
    },
    // Если инпут меняется, закрываем окно списка
    searchValueChange() {
      this.isSearchListVisible = false
    },
    // Очистка списка
    clearData() {
      this.CLEAR_USERS()
      this.searchValue = ''
      this.isSearchListVisible = false
    }
  },
  watch: {
    // Слежение за изменением инпута и очистка если изменение произошло
    searchValue: function() {
      this.CLEAR_USERS()
      this.searchValueChange();
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/style.scss';
</style>

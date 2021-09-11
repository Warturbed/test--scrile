import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: [],
    photos: [],
  },
  mutations: {
    // Если отфильтрованный массив имеет данные - в стор, если нет, передаём пустой массив
    SET_USERS_TO_STATE: (state, users) => {
      state.users = users
    },
    // Очистка массива юзеров
    CLEAR_USERS_IN_STATE: (state) => {
      // При каждом изменении инпута массив юзеров сбрасывается и по дефолту становтся строкой для адекватной работы отображения загрузки
      state.users = ''
    },
  },
  actions: {
    GET_USERS_FROM_API({commit}, value) {
      const getUsers = 'https://jsonplaceholder.typicode.com/users'
      const getPhotos = 'https://jsonplaceholder.typicode.com/photos'

      return axios.all([
        axios.get(getUsers),
        axios.get(getPhotos),
      ])
      .then(axios.spread((getUsers,getPhotos) => {
        if (value.length) {
          // Объединение массивов юзеров и фото по id
          const concatArr = getUsers.data.map(x => Object.assign(x, getPhotos.data.find(y => y.id == x.id)))
          // Сортировка по переданному searchValue
          const searchArr = concatArr.filter(item => {
            return (
              item.name.toLowerCase().startsWith(value.toLowerCase()) ||
              item.username.toLowerCase().startsWith(value.toLowerCase())
            )
          })
          commit('SET_USERS_TO_STATE', searchArr);
        } else {
          commit('SET_USERS_TO_STATE', [])
        }
      }))
      .catch((error) => {
          console.log(error)
          return error;
      })
    },
    CLEAR_USERS({commit}) {
      commit('CLEAR_USERS_IN_STATE');
    },
  },
  getters: {
    USERS(state) {
      return state.users;
    }
  }
})

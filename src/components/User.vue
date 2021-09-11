<template>
    <li class="search-list__item">
        <img class="search-list__user" :src="user_data.url" alt="">
        <span class="search-list__name">{{user_data.name}}</span>
        <span class="search-list__nickname">@{{user_data.username}}</span>
    </li>
</template>

<script>

export default {
  name: 'User',
  props: {
    user_data: {
        type: Object,
        default() {
            return {}
        }
    },
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

</style>

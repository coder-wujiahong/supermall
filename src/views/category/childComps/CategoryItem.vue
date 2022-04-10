<template>
  <div class="category-item">
    <a :href="categoryItem.link">
      <img :src="categoryItem.image" alt="">
      <p>{{categoryItem.title}}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',

  components: {},
  props: {
    categoryItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
	methods: {
	}
}
</script>

<style scoped>
.category-item {
  width: 80px;
  height: 100px;
  font-size: 14px;
  text-align: center;
}
.category-item img {
  width: 50px;
}
</style>

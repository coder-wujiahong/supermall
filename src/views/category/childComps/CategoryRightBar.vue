<template>
  <div>
    <div class="side-content">
      <category-item
      v-for="(item, index) in categoryRights"
      :key="index"
      :categoryItem="item"
      @click="cateRightClick(index, item)"
      />
    </div>
  </div>
</template>

<script>
import CategoryItem from "./CategoryItem";
export default {
  name: "CategoryRightBar",
  components: { CategoryItem },
  props: {
    categoryRights: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  methods: {
    // 点击右边内容并且记录切换数据的key
    cateRightClick(index, item) {
      this.currentIndex = index
      this.maitKey = item.maitKey
      this.$emit('cateLeftClick', this.maitKey)
    }
  }
}
</script>

<style scoped>
.side-content {
  display: flex;
  /* 弹性盒元素拆行 */
  flex-wrap: wrap;
  padding: 20px 0 20px 20px;
  /* align-content: flex-start; 侧轴 */
  align-content: flex-start;
}
</style>

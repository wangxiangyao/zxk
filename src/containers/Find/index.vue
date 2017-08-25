<template>
  <div class="find">
    <div class="swiper">
      我是轮播图 比例 16 ：10
    </div>
    <Gap />
    <div class="hot">
      热门文章
    </div>
    <Gap />
    <div class="latest">
      时间排序文章
    </div>
  </div>
</template>

<script>
import Gap from "../../components/Gap";

export default {
  name: 'find',
  components: {
    Gap,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="home">
    <div :class="$style.top">
      <div :class="$style.filter">
        <div :class="$style.showWhat" @click='handleShowOption'>
          <div :class="$style.text">
            {{text}}
          </div>
          <faicon name='angle-down' scale='2'></faicon>
        </div>
        <div :class="$style.optionList" v-if='isShowOption'>
          <div :class="$style.option" v-for='item of all' @click='handleFilter(item.key)'>
            {{item.text}}
          </div>
        </div>
      </div>
      <div class="action">

      </div>
    </div>
    <div :class="$style.itemList">
      <div :class="$style.item">
        <div class="avator">

        </div>
        <div class="info">
          <div class="">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Gap from "../../components/Gap";

import 'vue-awesome/icons/angle-down';
import faicon from 'vue-awesome/components/Icon';

// 这里要设计下动态类型码，需要再讨论讨论，目前随便写写

export default {
  name: 'home',
  components: {
    Gap,
    faicon,
  },
  data() {
    return {
      showWhat: 1,
      showMap: new Map([
        [1, '全部关注'],
        [2, '只看问题'],
        [3, '只看作者'],
      ]),
      isShowOption: false,
    };
  },
  computed: {
    text() {
      return this.showMap.get(this.showWhat);
    },
    all() {
      let arr = [];
      for (let item of this.showMap.entries()) {
        arr.push({
          key: item[0],
          text: item[1],
        })
      }
      return arr
    }
  },
  methods: {
    handleFilter(key) {
      console.log('过滤项为', key);
      this.showWhat = key;
      this.isShowOption = false;
    },
    handleShowOption() {
      this.isShowOption = true;
    }
  }
};
</script>


<style module>
  .top {
    display: flex;
  }
  .showWhat {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 30px;
    font-size: var(--字体大小-标准)
  }
  .text {
    margin-right: 10px;
  }
  .optionList {
    position: absolute;
    top: 0;
    left: 0;
    padding: 50px;
    background-color: #fff;
    box-shadow:0 0 20px rgba(155, 144, 194, .5);
  }
  .option {
    font-size: var(--字体大小-标准);
    letter-spacing: 4px;
    margin: 8px 0;
  }
</style>

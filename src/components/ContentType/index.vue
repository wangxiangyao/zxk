<template>
  <div class="type" :class='style'>
    {{text}}
  </div>
</template>

<script>

let styleMap = new Map([
  [1, 'article-type'],
  [2, 'issue-type'],
  [3, 'kind-type'],
])
let kindMap = new Map([
  [1, '经济学'],
  [2, '前端'],
])

export default {
  name: 'type',
  props: {
    type: Number,
    styleType: Number,
  },
  computed: {
    text() {
      if(this.styleType === 1) {
        return '文章';
      }
      if (this.styleType === 2) {
        return '问答';
      }
      if (this.styleType === 3) {
        return kindMap.get(this.type);
      }
    },
    style() {
      return styleMap.get(this.styleType);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .type {
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 20px;
  }
  .article-type {
    height: 40px;
    width: 60px;
    color: #fff;
    background-color: var(--主题色);
  }
  .issue-type {
    height: 50px;
    width: 60px;
    color: #fff;
    border-radius: 35%;
    background-color: var(--深紫);
  }
  .kind-type {
    padding: 15px 15px;
    color: var(--主题色);
    border: 1px solid var(--主题色);
    background-color: #fff;
    border-radius: 10px;
  }
</style>

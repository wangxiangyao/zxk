<template>
  <div class="publishTypeWrapper">
    <div class="icon" @click='handleToggleList'>
      <faicon name='cog' scale='2.5'></faicon>
    </div>
    <div :style="options" class='options'>
      <div class="option" :class='{active: select == item.type}' @click='handleChangePublishType(item)' v-for='item in publishType'>
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/cog';
import faicon from 'vue-awesome/components/Icon';
import mymask from '../MyMask';

export default {
  name: 'publishType',
  components: {
    faicon,
    mymask,
  },
  props: {
    position: {
      type: String,
      default: '左下',
    }
  },
  data() {
    return {
      optionsDisplay: {
        display: 'none',
      },
      select: this.$store.state.member.defaultPublishType,
      publishType: [
        {
          type: 1,
          text: '真名发布'
        },
        {
          type: 2,
          text: '昵称发布'
        },
        {
          type: 3,
          text: '匿名发布'
        },
      ]
    }
  },
  computed: {
    options() {
      let obj = {
        ...this.optionsDisplay
      }
      switch (this.position) {
        case '左下':
          obj.top = '100%'
          obj.right = 0
          break;
        case '右下':
          obj.top = '100%'
          obj.left = 0
          break;
        case '左上':
          obj.bottom = '100%'
          obj.right = 0
          break;
        case '右上':
          obj.bottom = '100%'
          obj.left = 0
          break;
        default:
          obj.top = '100%'
          obj.right = 0
      }
      return obj
    },
    
  },
  methods: {
    handleChangePublishType(item) {
      this.select = item.type
      this.$emit('changePublishType', item.type);
      this.optionsDisplay.display = 'none'
    },
    handleToggleList() {
      if (this.optionsDisplay.display === 'none') {
        console.log('展示')
        this.optionsDisplay.display = 'block'
      } else {
        console.log('隐藏')
        this.optionsDisplay.display = 'none'
      }
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .publishTypeWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    position:relative;
  }
  .publishTypeWrapper .options {
    position: absolute;
    z-index: 1610;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid var(--主题色)
  }
  .publishTypeWrapper .option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    font-size: 24px;
    font-weight: bold;
    padding: 15px;
    color: var(--次要);
    border-bottom: 1px solid var(--主题色);
  }
  .publishTypeWrapper .option.active {
    color: var(--主题色);
  }
  .publishTypeWrapper .option:nth-last-child(1) {
    border-bottom: none;
  }
  .publishTypeWrapper .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
</style>

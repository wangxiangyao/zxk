<template>
  <div class='scroll-wrapper' ref='wrapper'>
    <slot></slot>
    <slot name='pulldown' :pullDownStyle='pullDownStyle' :pullDownRefresh='pullDownRefresh' :beforePullDown='beforePullDown' :pulling='pulling' :bubbleY='bubbleY'>
      <div ref="pulldown" class="pulldown-wrapper" v-if="pullDownRefresh">
       <div class="before-trigger" v-if="beforePullDown" :style='pullDownStyle'>
         <faicon name='refresh' scale='2' spin v-if='canPulling'></faicon>
         <faicon name='refresh' scale='2' v-else></faicon>
         <div class="line">

         </div>
         <faicon name='circle-o' scale='2'></faicon>
       </div>
       <div class="after-trigger" v-else>
         <div class="loading" v-if='pulling'>
           <faicon name='refresh' spin scale='2'></faicon>
         </div>
         <div class='refreshFinish' v-else>加载完毕</div>
       </div>
     </div>
    </slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { getRect } from '../../common/dom.js';
import 'vue-awesome/icons/refresh';
import 'vue-awesome/icons/circle-o';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'scroll',
  components: {
    faicon,
  },
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    scrollX: {
      type: Boolean,
      default: false,
    },
    listenScroll: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: function() {
        return {};
      },
    },
    pullup: {
      type: Boolean,
      default: false,
    },
    pullDownRefresh: {
      type: null,
      default: false,
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20,
    }
  },
  data() {
    return {
      isPullingDown: false,
      pulling: false,
      limit: 100,
      pullDownStyle: {

      },
      bubbleY: 0,
      beforePullDown: true,
      isRebounding: false,
      canPulling: false,
    }
  },
  created() {
    this.pullDownInitTop = -50;
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll() {
      if(!this.$refs.wrapper) {
        return
      }

      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        pullDownRefresh: this.pullDownRefresh,
        deceleration: 0.004,

        // 自己修改的一些不常用配置
        momentumLimitDistance: 30,
        swipeTime: 1800,
        momentumLimitTime: 200,
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          this.$emit('scrollToEnd')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }

    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.pulling = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.pulling = true
        this.$emit('pullingDown')
      })
      this.scroll.on('scroll', (pos) => {
        console.log(pos)
        if (this.beforePullDown) {
          if (pos.y >= this.limit) {
            this.canPulling = true;
          } else {
            this.canPulling = false;
          }
        }
      })
    },
    _reboundPullDown() {
      const {stopTime = 600} = this.pullDownRefresh
      return new Promise((resolve) => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          this.isPullingDown = false
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.beforePullDown = true
        this.isRebounding = false
        this.canPulling = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-wrapper {
    height: 100%;
    overflow: auto;
  }
  .pulldown-wrapper {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100vw;
    padding-bottom: 70%;
    padding-top: 10px;
    background-color: var(--背景);
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: all;
  }
  .before-trigger {
    display: flex;
    height: 100%;
    flex: 1;
    flex-direction: column;
    align-items: center;
    color: var(--主题色);
  }
  .line {
    flex: 1;
    width: 4px;
    margin-top: 5px;
    background-color: var(--主题色);
  }

  .pulldown-wrapper .after-trigger {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .loading {
    display: flex;
    align-items: center;
    color: var(--主题色);
  }
  .refreshFinish {
    font-size: 24px;
    color: var(--主题色);
  }

</style>

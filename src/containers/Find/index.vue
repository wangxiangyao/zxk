<template>
  <div class="find">
    <div class="swiper">
      <!-- Slider main container -->
      <div class="swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
              <!-- Slides -->
              <div class="swiper-slide">Slide 1</div>
              <div class="swiper-slide">Slide 2</div>
              <div class="swiper-slide">Slide 3</div>
          </div>
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>
      </div>
    </div>
    <Gap />
    <div class="hot">
      <MyTitle text="精选推荐"></MyTitle>
      <div class="list">
        <template v-for='item in soltByCreateTime'>
          <template v-if='content[item].type === 1'>
            <PreArticle :article='content[item]'></PreArticle>
          </template>
          <template v-else-if='content[item].type === 2'>
            <PreIssue :issue='content[item]'></PreIssue>
          </template>
        </template>
      </div>
    </div>
    <Gap />
    <div class="latest">
      时间排序文章
    </div>
  </div>
</template>

<script>
import Gap from "../../components/Gap";
import MyTitle from '../../components/MyTitle';
import PreArticle from '../../components/PreArticle';
import PreIssue from '../../components/PreIssue';
import Swiper from 'swiper/dist/js/swiper.min.js';
import Scroll from '../../components/scroll';
require('swiper/dist/css/swiper.min.css')

import { mapState } from 'vuex';

let mySwiper;

export default {
  name: 'find',
  components: {
    Gap,
    MyTitle,
    PreArticle,
    PreIssue,
    Scroll,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      content: state => state.content.byId,
      soltByCreateTime: state => state.content.byCreateTime,
    })
  },
  created() {
    const { dispatch } = this.$store
    dispatch('fetchContentIfNeeded');
  },
  mounted() {
    mySwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplay: 2500,
    })
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .swiper .swiper-slide {
    height: 500px;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 10px;
  }
  .swiper-pagination .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
  }
  .swiper-pagination .swiper-pagination-bullet-active {
    background: var(--主题色);
  }
</style>

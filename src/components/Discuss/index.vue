<template>
  <div :class="$style.discuss">
    <div :class="$style.top">
      <User :user='author' :publishTime='discuss.createTime' :timeType='2' :style='{flex: 1}' />
      <div :class="$style.action">
        <faicon :class='$style.icon' name='thumbs-o-up' scale='2'></faicon>
      </div>
    </div>
    <div class="discussContentWrapper">
      <div :class="$style.discussContent" @click='handleSelect'>
        {{discuss.content}}
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/thumbs-o-up';
import faicon from 'vue-awesome/components/Icon';
import Editor from '../Editor';
import User from '../User';

export default {
  name: 'discuss',
  components: {
    faicon,
    Editor,
    User,
  },
  data() {
    return {
    }
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.discuss.id)
    }
  },
  props: {
    discuss: Object,
  },
  computed: {
    author() {
      return this.$store.state.member.byId[this.discuss.author];
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
.discuss {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  border-top: 2px solid rgba(155, 144, 194, .5);
}
.top {
  display: flex;
  align-items: center;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  padding: 20px;
}
.avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}
.discussContent {
  padding: 20px 0;
  text-align: justify;
  font-size: 24px;
}
</style>

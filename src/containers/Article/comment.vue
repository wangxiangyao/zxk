<template>
  <div class="myComment">
    <MyMask position='bottom' @handleClose='handleClose'>
      <div :class="$style.main">
        <div :class="$style.edit">
          <textarea name="name" :class='$style.input' v-model='theContent' v-focus></textarea>
        </div>
        <div :class="$style.action">
          <div :class="$style.tools">

          </div>
          <div :class="$style.publish">
            <div :class="$style.publishBtn">
              <myButton text='发表评论' :style='btnStyle' @handleClick='handlePublish'></myButton>
            </div>
          </div>
        </div>
      </div>
    </MyMask>
  </div>
</template>

<script>
import MyMask from '../../components/MyMask';
import myButton from '../../components/MyButton';

export default {
  name: 'comment',
  components: {
    MyMask,
    myButton,
  },
  props: {
    content: String,
  },
  data() {
    return {
      theContent: this.content,
      btnStyle: {
        fontSize: '22px',
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose');
    },
    handlePublish() {
      this.$emit('handlePublish', this.theContent);
      this.handleClose();
    }
  },
  watch: {
    theContent: function(newContent) {
      this.$emit('edit', newContent);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .main {
    display: flex;
    flex-direction: column;
    height: 550px;
    background-color: #fff;
  }

  .edit {
    flex: 1;
    padding: 30px 30px 0;
  }
  .input {
    font-size: 26px;
    width: 100%;
    height: 100%;
    padding: 30px;
    border: 2px solid var(--分割线);
    outline: none;
  }

  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    min-height: 150px;
  }
  .publish {

  }
  .publishBtn {
    width: 140px;
    height: 80px;
  }
</style>

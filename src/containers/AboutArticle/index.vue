<template>
  <div :class="$style.aboutArticle">
    <TopBar>
      <div :class="$style.theAnthology" slot='center' @click="handleShowMask">
        <div :class="$style.text">
          {{anthology.title}}
        </div>
          <i class="el-icon-arrow-down" v-if="isAdd" :class="$style.icon"></i>
      </div>
    </TopBar>
    <div :class="$style.title">
      <textarea type="text" name="title" v-model="article.title" rows="2" :class="$style.myTitle" placeholder="请输入标题..." />
    </div>
    <editor @save="handleSave"/>
    <MyMask v-if='isAdd && showMask' position="top">
      <div :class="$style.pickTarget">
        <div :class="$style.text">
          请选择要加入到的文集
        </div>
        <div :class="$style.new">
          <input type="text" name="newTitle" placeholder="新建文集" :class='$style.newTitle' v-model="newAnthology">
          <div :class="$style.addIcon" @click="handleAddAnthology">
            <i class="iconfont icon-add" :class="$style.theAddIcon"/>
          </div>
        </div>
        <div :class="$style.allAnthology">
          <div :class="$style.anthology" v-for='item in anthologies' @click="handleSelectAnthology(item)">
            {{item.title}}
          </div>
        </div>
      </div>
    </MyMask>
  </div>
</template>

<script>
import editor from '../../components/Editor'
import TopBar from '../../components/TopBar'
import MyMask from '../../components/MyMask'
import { mapState } from 'vuex'

export default {
  name: 'aboutArticle',
  data() {
    return {
      showMask: false,
      isAdd: false,
      newAnthology: '',
      anthology: '',
      article: {
        title: '',
        content: '',
      }
    }
  },
  computed: {
    ...mapState({
      anthologies: state => state.anthology.byId,
    }),
  },
  components: {
    editor,
    TopBar,
    MyMask,
  },
  methods: {
    handleAddAnthology() {
      const { dispatch, state } = this.$store;
      if (this.newAnthology.trim() === '') {
        console.log('文集名称为空，静默失败')
        return
      }
      let anthology = {
        title: this.newAnthology,
        authorId: state.member.id,
      }
      dispatch('addAnthology', anthology);
    },
    handleSelectAnthology(item) {
      this.anthology = item;
      this.showMask = false;
    },
    handleShowMask() {
      if (!this.isAdd) {
        return
      }
      this.showMask = !this.showMask;
    },
    handleSave(value, render) {
      const { dispatch, state } = this.$store;
      console.log(state)
      if (this.article.title.trim() === '') {
        console.log('标题未空，无法保存，应提示失败了')
        return;
      }
      let theArticle = {
        authorId: state.member.id,
        anthologyId: this.anthology.id,
        title: this.article.title,
        content: value,
      }
      dispatch('addArticle', theArticle);
    },
  },
  created() {
    console.log(this.$route);
    const { item, id } = this.$route.params;
    const { dispatch, state } = this.$store;

    dispatch('fetchAnthologyIfNeeded', state.member.id);
    if (item === "add") {
      this.isAdd = true;
      this.showMask = true;
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .aboutArticle {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .theAnthology {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .theAnthology .text {
    margin: 0 10px;
    font-size: 38px;
    color: var(--主题色);
  }
  .theAnthology .icon {
    font-size: 24px;
    color: var(--主题色);
  }
  .myTitle {
    padding: 30px;
    width: 100%;
    height: 162px;
    font-size: 48px;
    outline: none;
    word-wrap:break-word;
    word-break:break-all;
  }
  .pickTarget {
    background-color: #fff;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .text, .new, .anthology {
    height: 100px;
  }
  .new {
    display: flex;
    border-top: 2px solid #e5e5e5;
  }
  .newTitle {
    flex: 1;
    outline: none;
    font-size: 34px;
    padding-left: 20px;
  }
  .addIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
  }
  .theAddIcon {
    padding: 8px;
    border-radius: 5px;
    border: 2px solid;
    border-color: var(--主题色);
    color: var(--主题色);
    font-size: 34px;
    font-weight: 900;
  }
  .allAnthology {
    flex: 1;
    margin-bottom: 20px;
    padding: 0 20px 20px;
    border: 2px solid #e5e5e5;
    overflow: auto;
  }
  .anthology {
    border-bottom: 2px solid #e5e5e5;
    display: flex;
    padding: 0 15px;
    font-size: 34px;
    align-items: center;
  }
  .anthology:nth-child(1) {

  }
  .text {
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

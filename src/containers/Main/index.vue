<template>
  <div :class="$style.main">
    <div :class="$style.top">
      <div :class="$style.topTitle">
        我的
      </div>
      <div :class="$style.bar">
        系统设置
      </div>
    </div>
    <Gap />
    <div :class="$style.my">
      <div :class="$style.avator"></div>
      <div :class="$style.info">
        <div :class="$style.nickname">
          布雷布雷
        </div>
        <div :class="$style.trueInfo">
          <div :class="$style.name">
            王相尧
          </div>
          <div :class="$style.unit">
            栾川县电业局
          </div>
        </div>
      </div>
      <div :class="$style.editMyInfo">
        <div :class="$style.icon">
          <faicon name='pencil-square-o' scale='3'></faicon>
        </div>
      </div>
    </div>
    <div :class="$style.myInfo">
      <div :class="$style.box">
        <div :class="$style.num">
          139
        </div>
        <div :class="$style.text">
          收获的喜欢
        </div>
      </div>
      <div :class="$style.box">
        <div :class="$style.num">
          77
        </div>
        <div :class="$style.text">
          达人
        </div>
      </div>
      <div :class="$style.box">
        <div :class="$style.num">
          90
        </div>
        <div :class="$style.text">
          粉丝
        </div>
      </div>
    </div>
    <div :class="$style.information">
      <Item>
        <div :class="$style.itemBox">
          <div :class="$style.icon">
            <faicon name='bell' scale='3'></faicon>
          </div>
          <div :class="$style.itemText">
            消息中心
          </div>
          <div :class="$style.other">
            188
          </div>
        </div>
      </Item>
    </div>
    <Gap />
    <div :class="$style.action">
      <ItemGroup>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='file' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我的文章
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='bookmark' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我收藏的
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='heart' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我喜欢的
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='book' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我的文集
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
      </ItemGroup>
      <Gap />
      <ItemGroup>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='comments-o' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我的问题
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='comment' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我的回答
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='exclamation' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              我关注的
            </div>
            <div :class="$style.other">
              188
            </div>
          </div>
        </Item>
      </ItemGroup>
      <Gap />
      <ItemGroup>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='tv' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              浏览记录
            </div>
          </div>
        </Item>
        <Item>
          <div :class="$style.itemBox">
            <div :class="$style.icon">
              <faicon name='share-alt' scale='3'></faicon>
            </div>
            <div :class="$style.itemText">
              分享磨刀石
            </div>
          </div>
        </Item>
      </ItemGroup>
    </div>
    <Gap />
  </div>
</template>

<script>
  import Gap from '../../components/Gap';
  import Item from '../../components/Item';
  import ItemGroup from '../../components/Item/ItemGroup.vue';

  import 'vue-awesome/icons/heart';
  import 'vue-awesome/icons/book';
  import 'vue-awesome/icons/file';
  import 'vue-awesome/icons/bookmark';
  import 'vue-awesome/icons/comments-o';
  import 'vue-awesome/icons/comment';
  import 'vue-awesome/icons/exclamation';
  import 'vue-awesome/icons/share-alt';
  import 'vue-awesome/icons/pencil-square-o';
  import 'vue-awesome/icons/tv';
  import 'vue-awesome/icons/bell';
  import faicon from 'vue-awesome/components/Icon';

  export default {
  name: 'main',
  data() {
    return {
    };
  },
  components: {
    Gap,
    Item,
    ItemGroup,
    faicon,
  }
};
</script>


<style module>
  .main {
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    justify-content: space-between;
    padding: 30px 30px;
    font-size: var(--字体大小-标准);
  }

  .my {
    display: flex;
    padding: 30px;
    border-top: 2px solid var(--分割线);
  }
  .avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #ccc;
  }
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    padding: 0 30px;
  }
  .nickname {
    margin-bottom: 10px;
    font-size: var(--字体大小-较大);
  }
  .trueInfo {
    display: flex;
    font-size: var(--字体大小-较小);
  }
  .name {
    margin-right: 10px;
  }
  .editMyInfo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .myInfo {
    display: flex;
    justify-content: space-around;
    padding: 30px 0;
    border-top: 2px solid var(--分割线);
  }

  .information {
    padding: 0 30px;
    border-top: 2px solid var(--分割线);
  }

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .num {
    font-size: var(--字体大小-较大);
    margin-bottom: 10px;
  }
  .text {
    font-size: var(--字体大小-较小);
  }

  .itemBox {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .icon {
    color: var(--主题色);
    opacity: 0.5;
    width: 50px;
    text-align: center;
  }
  .itemText {
    flex: 1;
    margin: 0 30px;
    font-size: var(--字体大小-标准);
  }
  .other {
    font-size: var(--字体大小-标准);
    color: var(--次要);
    font-weight: bold;
  }
</style>

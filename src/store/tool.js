export const  normalizeDataArr = (state, arr) => {
  /*
    state 一般格式 byId all
    范式化就是把收到的arr信息，分门别类的填充到对应的state中
  */
  console.log(123)
  arr.map((item) => {
    normalizeDataObj(state, item);
  })
}

export const normalizeDataObj = (state, obj) => {
  const { byId, all, needFetch} = state;
  const targetId = obj.id;
  if (all.indexOf(obj.id) < 0) {
      all.push(targetId);
    }
    byId[targetId] = {
      ...byId[targetId],
      ...obj,
    }
    state.byId = {
      ...state.byId,
    }
  }

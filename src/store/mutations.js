import {
  MASK_OPEN,
  MASK_CLOSE,
} from './mutation-types.js';

export default {
  [MASK_OPEN](state){
    state.hasMask = true;
  },
  [MASK_CLOSE](state){
    state.hasMask = false;
  }
}

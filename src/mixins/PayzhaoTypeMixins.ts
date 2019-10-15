import Vue from 'vue';
import Component from 'vue-class-component';
import {
  namespace,
} from 'vuex-class';
const infoModule = namespace('info');

@Component
export default class PayzhaoTypeMixins extends Vue {
  @infoModule.Getter('paizhaoTypeGetter') public paizhaoType!: string;
  get isBumen() {
    return this.paizhaoType === 'bank' || this.paizhaoType === 'xiaofeijinrong';
  }

  get isYewuChangjing() {
    return this.paizhaoType === 'baoxian' || this.paizhaoType === 'careconemy' || this.paizhaoType === 'jijin';
  }
}

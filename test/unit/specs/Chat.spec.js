import Vue from 'vue';
import Chat from '@/components/Chat';

describe('Chat.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Chat);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.send-msg-btn').textContent)
    .toEqual('发送');
  });
});

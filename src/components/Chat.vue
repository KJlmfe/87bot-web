<template>
  <div class="chat-container">

    <div class="chat-main">
      <div class="chat-history" ref="chatHistory">
        <div v-for="(message, index) in messages" :class="{message: true, self: message.isSelf}" :key="index">
          <img class="avatar" :src="message.avatar" />
          <div class="text">{{message.text}}</div>
        </div>
      </div>
    </div>

    <el-row class="chat-footer">
      <el-col :span="21">
        <el-input class="msg-input" type="textarea" :rows="2" placeholder="请在这里输入消息" v-model="text">
        </el-input>
      </el-col>
      <el-col :span="3" class="send-msg-btn-box">
        <el-button class="send-msg-btn" @click="onSendMessage">发送</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      messages: [
        {
          text: 'Hi',
          avatar: 'http://via.placeholder.com/40x40',
        },
      ],
      text: '',
    };
  },
  methods: {
    onSendMessage() {
      if (this.text.trim() === '') {
        return;
      }
      // modify data
      this.messages.push({
        text: this.text,
        avatar: 'http://via.placeholder.com/40x40',
        isSelf: true,
      });
      this.text = '';
      // DOM is not updated yet
      this.$nextTick(() => {
        // DOM is now updated
        const $chatHistory = this.$refs.chatHistory;
        $chatHistory.scrollTop = $chatHistory.scrollHeight;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
message-bg-color = #fff;
self-message-bg-color = #b2e281;
chat-footer-height = 54px;

border-radius() {
  -webkit-border-radius: arguments;
  -moz-border-radius: arguments;
  border-radius: arguments;
}

.chat-container {
  display: flex;
  flex-direction: column;
  background-color: #eee;
  height: 100%;
}

.chat-main {
  flex-grow: 1;
  display: flex;
  padding: 10px;

  .chat-history {
    flex-grow: 1;
    overflow: scroll;
  }

  .message {
    margin: 15px 0;

    .text {
      margin: 0 10px;
      background-color: #fff;
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: calc(100% - 200px);
      min-height: 40px;
      line-height: 3;
      font-size: 13px;
      text-align: left;
      word-break: break-all;
      border-radius: 3px;

      &:before {
        position: absolute;
        top: 14px;
        border: 6px solid transparent;
        content: ' ';
        right: 100%;
        border-right-color: message-bg-color;
      }
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius(2px);
      float: left;
      cursor: pointer;
    }

    &.self {
      text-align: right;

      .avatar {
        float: right;
      }

      .text {
        background: self-message-bg-color;

        &:before {
          left: 100%;
          border-right-color: transparent;
          border-left-color: self-message-bg-color;
        }
      }
    }
  }
}

.chat-footer {
  height: chat-footer-height;
  margin: 10px;

  .send-msg-btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .send-msg-btn {
    width: 90%;
    height: 100%;
  }
}
</style>

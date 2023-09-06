<template>
  <div class="header">
    <a-page-header
      id="back"
      :title="title"
      :sub-title="desc"
      @back="() => router.go(-1)"
      v-if="!isHome"
    />
    <!-- <div class="logo"></div> -->
    <text id="tt" v-if="isHome">校园智慧助手</text>
    <button>About</button>
    <button>Service</button>
    <button>Product</button>
    <button>Blog</button>
    <button>Contact Us</button>
    <a-dropdown>
      <div class="user">
        <img
          src="../../assets/avatar.webp"
          alt=""
          class="avatar"
          @click.prevent
        />
        <a id="username">{{ name }}</a>
        <DownOutlined />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              学号：{{ id }}
            </a>
          </a-menu-item>
          <a-menu-item key="1">
            <a
              target="_blank"
              rel="noopener noreferrer"
            >
              姓名：{{ name }}
            </a>
          </a-menu-item>
          <a-divider />
          <a href="#" class="reLogin" @click="reLogin">退出登录</a>
          <a-menu-divider />
        </a-menu>
      </template>
    </a-dropdown>

    <!-- <a-avatar size="large">
      <template #icon><UserOutlined /></template>
    </a-avatar> -->
  </div>
</template>

<script setup>
// import { UserOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { logout } from "../../api/login.js";

const router = useRouter();
const isHome = ref(false);
const id = sessionStorage.getItem("userMsg")?JSON.parse(sessionStorage.getItem("userMsg")).id:'未登录'; //学号
const name = sessionStorage.getItem("userMsg")?JSON.parse(sessionStorage.getItem("userMsg")).name:'未登录'; //姓名

onMounted(() => {
  if (props.title === "当前") isHome.value = true;
  else isHome.value = false;
});

function reLogin() {
  console.log('logout',logout);
  logout.then(res => {
    console.log('logout-res',res);
  })
  router.push({
    path: "/login",
  });
}

const props = defineProps({
  title: {
    type: String,
    default: "当前",
  },
  desc: {
    type: String,
    default: "描述",
  },
});
</script>

<style lang="less" scoped>
.logo {
  float: left;
  width: 3.7rem;
  height: 3.7rem;
  background-color: rgb(79, 116, 104);
  border-radius: 50%;
  margin-left: -26rem;
  margin-top: 1rem;
}

#tt,
#back {
  float: left;
  margin-left: -500px;
  margin-top: 22px;
  font-weight: 700;
  font-size: large;
}

#back {
  margin-top: 0;
}

button {
  height: 5vh;
  margin-top: 1rem;
}

.user {
  float: right;
  margin-right: -450px;
  margin-top: 15px;
  .avatar {
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 50%;
  }
  #username {
    margin-left: 0.625rem;
    margin-right: 0.5rem;
  }
}

.reLogin {
  margin-left: 50px;
}
</style>

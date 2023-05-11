<template>
  <div class="floating">
    <span class="text">{{ message }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      message: "请问您需要什么帮助？",
    };
  },
});
</script>

<style>
.floating {
  animation: floating 2s ease-in-out infinite;
}

.text {
  display: block;
  text-align: center;
  font-size: 20px;
}

@keyframes floating {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

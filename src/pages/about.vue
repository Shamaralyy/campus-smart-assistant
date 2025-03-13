<template>
  <div class="about-container">
    <h1>关于校园智慧助手</h1>
    <h4 style="font-size: large; margin-top: 120px">主要功能</h4>
    <ul>
      <li>
        用户可以通过输入规定格式的自然语言完成数据的查询、增加、删除操作。
      </li>
      <li>
        支持语音输入转文字功能，利用 Web Speech API
        实现语音识别，用户可以通过语音指令完成操作。
      </li>
      <li>
        通过 Elasticsearch
        实现联想搜索功能，用户输入关键字后，系统会自动联想并高亮显示相关结果。
      </li>
      <li>
        提供表格自动录入学生成绩的功能，用户可以方便地录入和管理学生成绩。
      </li>
    </ul>
    <h4 style="font-size: large; margin-top: 60px">未来展望</h4>
    <ul>
      <li>
        亲爱的用户，感谢您选择校园智慧助手！您的信任和支持是我们不断前行的动力。
      </li>
      <li>
        在未来的开发中，我们将持续优化校园智慧助手，致力于为校园用户提供更加高效、便捷和智能的体验。
      </li>
      <li>我们期待与您一起见证校园智慧助手的成长，共同探索更多可能。</li>
      <li>
        如果您有任何想法或建议，请随时与我们联系，您的支持是我们前进的动力。
      </li>
    </ul>
    <img class="message" src="../assets/message.svg" alt="" />
    <img class="creative" src="../assets/creative.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.about-container {
  padding: 20px;
  text-align: center;
}
h1 {
  color: #2c3e50;
}
p {
  font-size: 16px;
  color: #555;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
  font-size: 14px;
  color: #333;
}

.message {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 445px;
  height: 300px;
}

.creative {
  position: absolute;
  right: 2%;
  bottom: 0;
  width: 15%;
}
</style>

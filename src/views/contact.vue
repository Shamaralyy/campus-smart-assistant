<template>
  <div class="contact-us">
    <h1>联系我们</h1>

    <section class="contact-info">
      <h2>联系方式</h2>
      <p>
        <strong>地址：</strong>重庆市南岸区学府大道X号，重庆邮电大学软件工程学院
      </p>
    </section>

    <section class="development-team">
      <h2>开发团队</h2>
      <p>
        <strong>前端团队：</strong
        ><a
          href="https://gitee.com/shamaralyy/campus-smart-assistant"
          target="_blank"
          >前端代码仓库</a
        >
      </p>
      <p>
        <strong>后端团队：</strong
        ><a
          href="https://gitee.com/luojunzhong/smart-campus-system"
          target="_blank"
          >后端代码仓库</a
        >
      </p>
    </section>

    <section class="support-hours">
      <h2>工作日支持时间</h2>
      <p>周一至周五，上午9:00 - 下午5:00</p>
    </section>

    <section class="feedback">
      <h2>反馈与建议</h2>
      <p>
        我们非常重视您的反馈和建议，您的每一条意见都是我们进步的动力。如果您在使用过程中遇到任何问题，或者有任何改进建议，欢迎通过以下方式与我们联系。
      </p>
    </section>

    <section class="join-us">
      <h2>加入我们</h2>
      <p>
        我们也欢迎有才华、有热情的开发者加入我们的团队，共同打造更加智能的校园生活。有兴趣的同学请将简历发送至我们的邮箱。
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
.contact-us {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.contact-us h1,
.contact-us h2 {
  text-align: center;
  margin-bottom: 10px;
}

.contact-us p {
  margin-bottom: 10px;
  text-align: justify;
}

.contact-us a {
  color: #42b983;
  text-decoration: none;
}

.contact-us a:hover {
  text-decoration: underline;
}
</style>

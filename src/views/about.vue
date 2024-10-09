<template>
  <div class="about-page">
    <h1>校园智慧助手 - 关于我们</h1>
    <section class="mission">
      <h2>我们的使命</h2>
      <ul>
        <li>连接师生：通过智能查询系统，让师生之间的沟通更加顺畅。</li>
        <li>信息透明：确保所有校园信息公开透明，便于师生获取。</li>
        <li>智能服务：利用人工智能技术，提供个性化服务和推荐。</li>
      </ul>
    </section>

    <section class="features">
      <h2>功能介绍</h2>
      <ul>
        <li>学生信息查询：快速查找学生基本信息、课程表和成绩。</li>
        <li>教师信息查询：获取教师的联系方式、教学课程和研究方向。</li>
        <li>课程信息查询：查看课程详情、时间表和相关资源。</li>
        <li>成绩信息查询：实时更新学生成绩，支持历史成绩查询。</li>
        <li>校园新闻：获取校园最新新闻和通知。</li>
        <li>活动日历：查看校园活动安排和重要日期。</li>
      </ul>
    </section>

    <section class="tech-support">
      <h2>技术支持</h2>
      <ul>
        <li>数据安全：采用先进的数据加密技术，保护用户隐私。</li>
        <li>系统稳定：24/7系统监控，确保服务不间断。</li>
        <li>用户支持：提供在线帮助和反馈渠道。</li>
      </ul>
    </section>

    <section class="faq">
      <h2>常见问题</h2>
      <ul>
        <li>如何注册账号？</li>
        <li>如何找回密码？</li>
        <li>如何提交反馈？</li>
      </ul>
    </section>

    <section class="partners">
      <h2>合作伙伴</h2>
      <ul>
        <li>图书馆</li>
        <li>教务处</li>
        <li>学生事务办公室</li>
        <li>IT支持中心</li>
      </ul>
    </section>

    <footer>
      <p>
        我们期待您的使用和反馈，让我们共同创造一个更加智能和便捷的校园环境。
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  methods: {
    openPage(page) {
      console.log("Opening page:", page);
      // 你的逻辑代码
    },
  },
};
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.about-page h1,
.about-page h2 {
  text-align: center;
}

.about-page ul {
  list-style-type: none;
  padding-left: 0;
}

.about-page li {
  margin-bottom: 10px;
}

.about-page p {
  text-align: justify;
}

.about-page a {
  color: blue;
  text-decoration: none;
}

.about-page a:hover {
  text-decoration: underline;
}

footer {
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
  <div class="guide-page">
    <h1>校园智慧助手使用指南</h1>

    <h2>查询功能</h2>
    <ul>
      <li>
        <strong>查询所有学生：</strong>输入“查询学生表中所有学生”获取学生列表。
      </li>
      <li>
        <strong>查询特定学生：</strong
        >输入“查询学生表中+学生姓名”获取该学生详细信息。
      </li>
      <li>
        <strong>查询所有课程：</strong>输入“查询课程表中所有课程”获取课程列表。
      </li>
      <li>
        <strong>查询特定教师的任课情况：</strong
        >输入“查询课程表中+老师姓名+的任课情况”获取该教师所授课程。
      </li>
      <li>
        <strong>查询特定课程的任课老师：</strong
        >输入“查询课程表中+课程名+学科的任课老师”获取该课程的教师信息。
      </li>
      <li>
        <strong>查询所有成绩：</strong>输入“查询成绩表中所有成绩”获取成绩列表。
      </li>
      <li>
        <strong>查询特定学生的成绩：</strong
        >输入“查询成绩表中+学生名+的成绩”获取该学生的成绩。
      </li>
      <li>
        <strong>查询特定学科的所有成绩：</strong
        >输入“查询成绩表中+学科名+学科的所有成绩”获取该学科的成绩。
      </li>
      <li>
        <strong>查询特定老师任教课程的成绩：</strong
        >输入“查询成绩表中+老师名+老师任教课程的成绩”获取该老师所授课程的成绩。
      </li>
    </ul>

    <h2>添加功能</h2>
    <ul>
      <li>
        <strong>添加学生信息：</strong
        >输入“添加+学生相关信息+到学生表中”添加新学生信息。
      </li>
      <li>
        <strong>添加课程信息：</strong
        >输入“添加+课程相关信息+到课程表中”添加新课程信息。
      </li>
      <li>
        <strong>添加成绩信息：</strong
        >输入“添加+成绩相关信息+到成绩表中”添加新成绩信息。
      </li>
    </ul>

    <h2>修改功能</h2>
    <ul>
      <li>
        <strong>修改学生信息：</strong>输入“修改学生表”进入学生信息修改界面。
      </li>
      <li>
        <strong>修改课程信息：</strong>输入“修改课程表”进入课程信息修改界面。
      </li>
      <li>
        <strong>修改成绩信息：</strong>输入“修改成绩表”进入成绩信息修改界面。
      </li>
    </ul>

    <h2>删除功能</h2>
    <ul>
      <li>
        <strong>删除学生信息：</strong
        >输入“删除学生表中+学生姓名”删除指定学生信息。
      </li>
      <li>
        <strong>删除课程信息：</strong
        >输入“删除课程表中+课程名+课程+老师名”删除指定课程信息。
      </li>
      <li>
        <strong>删除成绩信息：</strong
        >输入“删除成绩表中+课程名+课程+学生名”删除指定学生的成绩信息。
      </li>
    </ul>

    <p>
      请确保输入信息准确无误，以避免错误操作。在进行添加、修改和删除操作之前，请确保您有足够的权限。如果您在操作过程中遇到任何问题，请联系我们的技术支持团队。
    </p>

    <img class="artist" src="../assets/artist.svg" alt="" />
    <img class="car" src="../assets/car.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "GuidePage",
};
</script>

<style scoped>
.guide-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.guide-page h1 {
  text-align: center;
  margin-bottom: 20px;
}

.guide-page h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.guide-page ul {
  list-style-type: none;
  padding-left: 20px;
}

.guide-page li {
  margin-bottom: 10px;
}

.guide-page p {
  text-align: center;
  margin-top: 20px;
}

.artist {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20%;
}

.car {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 15%;
}
</style>

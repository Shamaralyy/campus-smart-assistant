<template>
  <div class="container">
    <a-table
      :columns="columns"
      :data-source="showData"
      bordered
      :pagination="false"
      style="width: 80vw"
    >
      <template #bodyCell="{ column, text, record }">
        <template
          v-if="
            ['sNum', 'sName', 'sAge', 'sSex', 'sPhone', 'sAdvisor'].includes(
              column.dataIndex
            )
          "
        >
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)"
                >保存</a-typography-link
              >
              <a-popconfirm title="确定要取消吗?" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
            </span>
          </div>
          <a-popconfirm
            v-if="!editableData[record.key]"
            title="确定要删除吗?"
            @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { cloneDeep } from "lodash-es";
import { reactive, ref, defineProps, onMounted } from "vue";
//API
import {
  deleteStudent2API,
  selectAllStudentPaginateAPI,
  updateStudent2API,
} from "../../api/query.js";

const props = defineProps(["msg"]);
const data = [];
const showData = ref([]);
const dataSource = ref(data);
const editableData = reactive({});

const columns = [
  {
    title: "学号",
    dataIndex: "sNum",
  },
  {
    title: "姓名",
    dataIndex: "sName",
  },
  {
    title: "年龄",
    dataIndex: "sAge",
  },
  {
    title: "性别",
    dataIndex: "sSex",
  },
  {
    title: "手机号",
    dataIndex: "sPhone",
  },
  {
    title: "辅导员",
    dataIndex: "sAdvisor",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];

onMounted(() => {
  console.log("props", props.msg);
  showData.value = data;

  props.msg.forEach((item) => {
    dataSource.value.push({
      sid: item.sid,
      key: item.sid,
      sNum: item.snum,
      sName: item.sname,
      sSex: item.ssex,
      sAge: item.sage,
      sPhone: item.sphone,
      sAdvisor: item.sadvisor,
    });
  });
});

const onDelete = (key) => {
  deleteStudent2API(dataSource.value[key].sId).then((res) => {
    console.log("deleteStudent2API-res", res);
  });
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  showData.value = dataSource.value;
};

const edit = (key) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};
const save = (key) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  let curObj = dataSource.value[key];
  const { sId, sNum, sName, sSex, sAge, sPhone, sAdvisor } = curObj;
  updateStudent2API(sId, sNum, sName, sSex, sAge, sPhone, sAdvisor).then(
    (res) => {
      console.log("updateStudent2API-res", res);
    }
  );
  delete editableData[key];
};
const cancel = (key) => {
  delete editableData[key];
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.editable-row-operations {
  width: 8vw;
}
.editable-row-operations a {
  float: left;
  margin-right: 14px;
}
.search {
  width: 60.1vw;
  margin-top: 1%;
}
.search-box {
  position: relative;
}
.speech {
  position: absolute;
  margin-top: 1%;
  top: 0.3rem;
  right: 4.5rem;
  z-index: 5;
}
.nav {
  width: 60.7%;
}
.nav button {
  float: left;
}
</style>

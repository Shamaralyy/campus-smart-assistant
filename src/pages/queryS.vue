<template>
  <div class="container">
    <Header :title="'查询学生'" :desc="'查询当前学生列表'" />
    <div class="nav">
      <a-button class="add-btn" type="primary" @click="showModal">
        <template #icon><plus-outlined /></template>
        增加学生
      </a-button>
      <a-button class="toggle-btn" @click="pageToTeacher">切换为教师</a-button>
    </div>
    <a-modal v-model:visible="visible" title="填写信息">
      <a-form
        ref="formRef"
        name="custom-validation"
        :model="formState"
        :rules="rules"
        v-bind="layout"
        @finish="handleFinish"
        @validate="handleValidate"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item has-feedback label="学号" name="sNum">
          <a-input v-model:value="formState.sNum" />
        </a-form-item>
        <a-form-item has-feedback label="姓名" name="sName">
          <a-input style="width: 50%" v-model:value="formState.sName" />
        </a-form-item>
        <a-form-item has-feedback label="年龄" name="sAge">
          <a-input-number v-model:value="formState.sAge" />
        </a-form-item>
        <a-form-item label="性别" required v-bind="validateInfos.sSex">
          <a-radio-group v-model:value="formState.sSex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item has-feedback label="手机号" name="sPhone">
          <a-input
            v-model:value="formState.sPhone"
            type="sPhone"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item has-feedback label="辅导员" name="sAdvisor">
          <a-input
            style="width: 50%"
            v-model:value="formState.sAdvisor"
            type="sAdvisor"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" @click="onSubmit"
            >确认</a-button
          >
          <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
      <template #footer> </template>
    </a-modal>
    <div class="search-box">
      <Speech @sendRecord="sendRecord" class="speech"></Speech>
      <a-input-search
        class="search"
        v-model:value="msgQuery"
        placeholder="请输入姓名或者学号……"
        size="large"
        @search="onSearch"
      >
        <template #enterButton>
          <a-button>搜索</a-button>
        </template>
      </a-input-search>
    </div>
    <a-table
      :columns="columns"
      :data-source="showData"
      bordered
      style="width: 60.1vw"
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
import { reactive, ref, onMounted, toRaw, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
//API
import {
  addStudent2API,
  deleteStudent2API,
  selectAllStudentPaginateAPI,
  updateStudent2API,
} from "../api/query.js";
//组件
import Header from "../components/Header/index.vue";
import Speech from "../components/SpeechRecognition/index.vue";

const $router = useRouter();
const showData = ref([]);
//去往教师页面
const pageToTeacher = () => {
  $router.replace({
    path: "/queryT",
  });
};

//增加学生弹出层
const visible = ref(false);

const showModal = () => {
  visible.value = true;
};
const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(formState));
      const msg = toRaw(formState);
      const newData = {
        key: `${++count.value}`,
        sNum: msg.sNum,
        sName: msg.sName,
        sAge: Number(msg.sAge),
        sSex: msg.sSex,
        sPhone: msg.sPhone,
        sAdvisor: msg.sAdvisor,
      };
      dataSource.value.unshift(newData);
      showData.value = dataSource.value;
      visible.value = false;
      console.log("stu", newData);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

//表单
const formState = reactive({
  sId: null,
  sNum: "",
  sName: "",
  sAge: undefined,
  sSex: "",
  sPhone: "",
  sAdvisor: "",
});
const rulesRef = reactive({
  sSex: [
    {
      required: true,
      message: "请选择性别",
    },
  ],
});
const useForm = Form.useForm;
const { validate, validateInfos } = useForm(formState, rulesRef, {
  onValidate: (...args) => console.log(...args, "11111111111"),
});
const formRef = ref();

let checkAge = async (_rule, value) => {
  if (!value) {
    return Promise.reject("请输入年龄");
  }
  if (!Number.isInteger(value)) {
    return Promise.reject("请输入整数");
  } else {
    if (value < 0) {
      return Promise.reject("年龄必须大于0");
    } else {
      return Promise.resolve();
    }
  }
};
const validatesPhone = async (_rule, value) => {
  const reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (value === "") {
    return Promise.reject("请输入手机号");
  } else if (reg.test(value) === false) {
    return Promise.reject("请输入正确的手机号");
  } else {
    return Promise.resolve();
  }
};
const validatesNum = async (_rule, value) => {
  if (value === "") {
    return Promise.reject(`请输入学号`);
  } else {
    return Promise.resolve();
  }
};
const validatesName = async (_rule, value) => {
  if (value === "") {
    return Promise.reject(`请输入姓名`);
  } else {
    return Promise.resolve();
  }
};
const validatesAdvisor = async (_rule, value) => {
  if (value === "") {
    return Promise.reject(`请输入辅导员姓名`);
  } else {
    return Promise.resolve();
  }
};

const rules = {
  sNum: [{ required: true, validator: validatesNum, trigger: "change" }],
  sName: [{ required: true, validator: validatesName, trigger: "change" }],
  sPhone: [{ required: true, validator: validatesPhone, trigger: "change" }],
  sAge: [{ required: true, validator: checkAge, trigger: "change" }],
  sAdvisor: [
    { required: true, validator: validatesAdvisor, trigger: "change" },
  ],
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const handleFinish = (values) => {
  console.log(formState);
  const { sId, sName, sAge, sSex, sPhone, sNum, sAdvisor } = formState;
  addStudent2API(sId, sName, sAge, sSex, sPhone, sNum, sAdvisor).then((res) => {
    console.log("addStudent2API-res", res);
  });
};
const handleFinishFailed = (errors) => {
  console.log(errors);
};
const resetForm = () => {
  formRef.value.resetFields();
  formState.sSex = "";
};
const handleValidate = (...args) => {
  console.log(args, 2222222);
};

const onDelete = (key) => {
  deleteStudent2API(dataSource.value[key].sId).then((res) => {
    console.log("deleteStudent2API-res", res);
  });
  dataSource.value = dataSource.value.filter((item) => item.key !== key);
  showData.value = dataSource.value;
};
//接收子组件传来的语音值
const msgQuery = ref("");
const sendRecord = (val) => {
  console.log("父组件接收", val);
  msgQuery.value = val;
};
const data = [];

const columns = [
  {
    title: "学号",
    dataIndex: "sNum",
    width: "15%",
  },
  {
    title: "姓名",
    dataIndex: "sName",
    width: "15%",
  },
  {
    title: "年龄",
    dataIndex: "sAge",
    width: "12%",
  },
  {
    title: "性别",
    dataIndex: "sSex",
    width: "12%",
  },
  {
    title: "手机号",
    dataIndex: "sPhone",
    width: "20%",
  },
  {
    title: "辅导员",
    dataIndex: "sAdvisor",
    width: "20%",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];
let count = ref(0);
showData.value = data;
const dataSource = ref(data);
const editableData = reactive({});
// selectAllStudentPaginateAPI(10, 1).then((res) => {
//   res.data.data.map((item, index) => {
//     dataSource.value.push({
//       sid: item.name,
//       key: index,
//       sNum: item.sName,
//       sName: item.sName,
//       sSex: item.sName,
//       sAge: item.sName,
//       sPhone: item.sName,
//       sAdvisor: item.sName,
//     });
//   });
// });
dataSource.value.push({
  sid: "学生A",
  key: 0,
  sNum: "学生A",
  sName: "学生A",
  sSex: "学生A",
  sAge: "学生A",
  sPhone: "学生A",
  sAdvisor: "学生A",
});

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
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  if (searchValue === "") showData.value = dataSource.value;
  else
    showData.value = dataSource.value.filter(
      (item) =>
        item.sName.indexOf(searchValue) != -1 ||
        item.sNum.indexOf(searchValue) != -1
    );
};
onMounted(() => {});
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

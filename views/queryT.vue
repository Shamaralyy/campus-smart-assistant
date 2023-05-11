<template>
    <div class="container">
      <Header :title="'查询教师'" :desc="'查询当前教师列表'"/>
      <div class="nav">
        <a-button class="add-btn" type="primary" @click="showModal">
          <template #icon><plus-outlined /></template>
          增加教师
        </a-button>
        <a-button class="toggle-btn" @click="toStu">切换为学生</a-button>
      </div>
      <a-modal
        v-model:visible="visible"
        ok-text="确认"
        cancel-text="取消"
        title="填写信息"
        @ok="handleOk"
      >
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
          <a-form-item has-feedback label="姓名" name="tName">
            <a-input style="width: 50%" v-model:value="formState.tName" />
          </a-form-item>
          <a-form-item has-feedback label="年龄" name="tAge">
            <a-input-number v-model:value="formState.tAge" />
          </a-form-item>
          <a-form-item label="性别" required v-bind="validateInfos.tSex">
            <a-radio-group v-model:value="formState.tSex">
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item has-feedback label="手机号" name="tPhone">
            <a-input
              v-model:value="formState.tPhone"
              type="tPhone"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item has-feedback label="年级" name="tGrade">
            <a-input
              style="width: 50%"
              v-model:value="formState.tGrade"
              type="tGrade"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item has-feedback label="专业" name="tMajor">
            <a-input
              style="width: 50%"
              v-model:value="formState.tMajor"
              type="tMajor"
              autocomplete="off"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" @click="onSubmit"
              >Submit</a-button
            >
            <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <div class="search-box">
        <Speech @sendRecord="sendRecord" class="speech"></Speech>
        <a-input-search
          class="search"
          v-model:value="msgQuery"
          placeholder="请输入教师姓名……"
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
              ['tName', 'tAge', 'tSex', 'tPhone', 'tGrade', 'tMajor'].includes(
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
  import { reactive, ref, onMounted, toRaw } from "vue";
  import { useRouter } from "vue-router";
  import { Form } from "ant-design-vue";
  //组件
  import Header from "../components/Header/index.vue";
  import Speech from "../components/SpeechRecognition/index.vue";
  const $router = useRouter();
  
  const showData= ref([]);
  //去往学生页面
  const toStu = () => {
    $router.replace({
      path: '/queryS'
    })
  }
  //增加学生弹出层
  const visible = ref(false);
  
  const showModal = () => {
    visible.value = true;
  };
  
  const handleOk = (e) => {
    visible.value = false;
    validate()
      .then(() => {
        console.log(toRaw(formState));
        const msg = toRaw(formState);
        const newData = {
          key: `${++count.value}`,
          tName: msg.tName,
          tAge: Number(msg.tAge),
          tSex: msg.tSex,
          tPhone: msg.tPhone,
          tGrade: msg.tGrade,
          tMajor: msg.tMajor,
        };
        dataSource.value.unshift(newData);
        showData.value = dataSource.value;
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  
  //表单
  const formState = reactive({
    tName: "",
    tAge: undefined,
    tSex: "",
    tPhone: "",
    tGrade: "",
    tMajor: "",
  });
  const rulesRef = reactive({
    tSex: [
      {
        required: true,
        mestAge: "请输入性别",
      },
    ],
  });
  const useForm = Form.useForm;
  const { validate, validateInfos } = useForm(formState, rulesRef, {
    onValidate: (...args) => console.log(...args),
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
  let validatetPhone = async (_rule, value) => {
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
  
  const rules = {
    tName: [{ required: true, trigger: "change" }],
    tPhone: [{ required: true, validator: validatetPhone, trigger: "change" }],
    tAge: [{ required: true, validator: checkAge, trigger: "change" }],
    tGrade: [{ required: true, trigger: "change" }],
    tMajor: [{ required: true, trigger: "change" }],
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const handleFinish = (values) => {
    console.log(values, formState);
  };
  const handleFinishFailed = (errors) => {
    console.log(errors);
  };
  const resetForm = () => {
    formRef.value.resetFields();
  };
  const handleValidate = (...args) => {
    console.log(args);
  };
  const onSubmit = () => {
    validate()
      .then(() => {
        console.log(toRaw(formState));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const onDelete = (key) => {
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
      title: "姓名",
      dataIndex: "tName",
      width: "15%",
    },
    {
      title: "年龄",
      dataIndex: "tAge",
      width: "12%",
    },
    {
      title: "性别",
      dataIndex: "tSex",
      width: "12%",
    },
    {
      title: "手机号",
      dataIndex: "tPhone",
      width: "20%",
    },
    {
      title: "年级",
      dataIndex: "tGrade",
      width: "20%",
    },
    {
      title: "专业",
      dataIndex: "tMajor",
      width: "20%",
    },
    {
      title: "操作",
      dataIndex: "operation",
    },
  ];
  let count = ref(0);
  for (count.value = 0; count.value < 11; count.value++) {
    data.push({
      key: count.value.toString(),
      tName: `蒋春利${count.value}`,
      tSex: `女`,
      tAge: 32,
      tPhone: "17830941432",
      tGrade: "2021" + "级",
      tMajor: "软件工程",
    });
  }
  showData.value = data;
  const dataSource = ref(data);
  const editableData = reactive({});
  
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
        (item) => item.tName.indexOf(searchValue) != -1 
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
    top: 0.3rem;
    margin-top: 1%;
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
  
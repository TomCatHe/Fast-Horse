<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="exec">
        执行
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${state.selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :columns="columns"
      :data-source="tableData">
      <template #headerCell="{ column }">
        <template v-if="column.dataIndex === 'name'">
          <span>
            <DatabaseOutlined />
            文件名称
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <span>
            <a-tag :color="record.status === 'success' ? 'green' : 'volcano'">
              {{ record.status.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { DatabaseOutlined } from '@ant-design/icons-vue';

type Key = string | number;

interface DataType {
  key: Key;
  id: number;
  name: string;
  status: string;
  path: string;
}

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '文件名称',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
];

let tableData = reactive<DataType[]>([]);

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const exec = async () => {

  const exexuteSql = await window.electronAPI.executeSqlScript("/Users/hecker/Downloads/his2312数据库/1、数据库/清空00操作员密码.sql");

  console.log(exexuteSql);

  // state.loading = true;
  // // ajax request after empty completing
  // setTimeout(() => {
  //   state.loading = false;
  //   state.selectedRowKeys = [];
  // }, 1000);
};

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

const getAllFiles = async () => {

  const folderData = await window.electronAPI.getAllFolders("/Users/hecker/Downloads/his2312数据库");

  folderData.forEach((file: any) => {
    const filesInFolder = window.electronAPI.getAllFiles(file);

    tableData.push(...filesInFolder.map((item: any, index: number) => ({
      id: index + 1,
      key: index,
      name: item.fileName,
      status: "success",
      path: item.filePath,
    })));

  });

}

onMounted(() => {
  getAllFiles()
});
</script>

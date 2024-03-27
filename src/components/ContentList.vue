<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
        Reload
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
import { SmileOutlined,DatabaseOutlined  } from '@ant-design/icons-vue';

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

const tableData = reactive<DataType[]>([]);

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};

const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

const getAllFiles = async () => {
  const data = await window.electronAPI.getAllFiles("C:\\Users\\hecke\\Desktop\\testnodejs");

  tableData.push(...data.map((item: any, index: number) => ({
    id: index + 1,
    key: index,
    name: item.fileName,
    status: "success",
    path: item.filePath,
  })));

}

onMounted(() => {
  getAllFiles()
});
</script>

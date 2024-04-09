<template>
  <a-layout-sider>
    <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" :items="items"
      @click="handleClick" theme="dark">
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { reactive, ref, VueElement, h, onMounted, watch } from 'vue';
import { FolderOpenFilled, DatabaseOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

const handleClick: MenuProps['onClick'] = e => {
  console.log('click', e.key);
};

watch(openKeys, val => {
  console.log('openKeys', val);
});

// 本地文件

interface FileData {
  label: VueElement | string,
  title: string,
  key: string,
  icon?: any,
  children?: FileData[],
  type?: 'group'
}

let items = reactive<FileData[]>([])

interface FileOptions {
  name: string;
  type: string;
  path: string;
  parentFolder: string;
  children?: FileOptions[];
}

let filePath = reactive<FileOptions[]>([])

// 打开文目录
const openFile = async () => {

  const data = await window.electronAPI.openFile()
  // 文件夹显示在前面，文件显示在后面，下级节点也是文件夹显示在前，文件在后排序
  filePath.push(...data)
  // 递归数据filePath重新写入新的对象items中
  items.push(...recursionData(filePath))
  
}

// 递归数据filePath重新写入新的对象items中
function recursionData(data: FileOptions[]): FileData[] {
  const result: FileData[] = [];
  data.forEach(item => {
    if (item.type === 'folder') {
      result.push({
        key: item.path,
        icon: () => h(FolderOpenFilled),
        label: item.name,
        title: item.name,
        type: undefined,
        children: recursionData(item.children || []),
      });
    }
  });
  data.forEach(item => {
    if (item.type !== 'folder') {
      result.push({
        key: item.path,
        icon: () => h(DatabaseOutlined),
        label: item.name,
        title: item.name,
      });
    }
  });
  return result;
}

// watchEffect(() => {
//   console.log(
//     filePath
//   );
// });

onMounted(() => {
  openFile()
})
</script>

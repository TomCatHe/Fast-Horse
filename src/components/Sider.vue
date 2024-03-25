<template>
  <a-layout-sider>
    <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" 
    :items="items22"
      @click="handleClick">
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, VueElement, h, onMounted, watchEffect } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

const handleClick: MenuProps['onClick'] = e => {
  // console.log('click', e);
};

// watch(openKeys, val => {
//   console.log('openKeys', val);
// });

// 本地文件

interface FileData {
  label: VueElement | string,
  title: string,
  key: string,
  icon?: any,
  children?: FileData[],
  type?: 'group'
}

let items22 = reactive<FileData[]>([])

let items2 = reactive<FileData[]>([
  {
    key: '1',
    icon: null,
    label: 'Option 1',
    title: 'Option 1',
  },
  {
    key: '2',
    icon: null,
    label: 'Option 2',
    title: 'Option 2',
  }]
)

interface FileOptions {
  name: string;
  type: string;
  path: string;
  parentFolder: string;
  children?: FileOptions[];
}

let filePath = reactive<FileOptions[]>([])

const openFile = async () => {
  const ab = await window.electronAPI.openFile()
  filePath.push(...ab)
  items22.push(...recursionData(filePath))
}

// 递归数据filePath重新写入新的对象items22中
function recursionData(data: FileOptions[]): FileData[] {
  const result: FileData[] = []  // Create an empty array to store the processed data
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.children) {
      result.push({
        key: item.path,
        icon: null,
        label: item.name,
        title: item.name,
        type: undefined,
        children: recursionData(item.children)  // Recursively process the children and add them to the 'children' property
      })
    } else {
      result.push({
        key: item.path,
        icon: null,
        label: item.name,
        title: item.name
      })
    }
  }
  return result  // Return the processed data
}


console.log(items22);


watchEffect(() => {
  console.log(
    filePath
  );
});

onMounted(() => {
  openFile()
})
</script>

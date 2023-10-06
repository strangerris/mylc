<script setup lang="ts">
import { useSystemStore } from "@/stores/system";
import { Icon } from '@iconify/vue'
import axios from "@/utils/request";
const allProblems: Problem[] = reactive([])
const filterProblems: Problem[] = reactive([])
const system = useSystemStore()
const { locale, pageSize } = storeToRefs(system)

axios.get('/data.json')
  .then(function (res) {
    const data = res.data
    data.forEach((item: Problem) => {
      item.ProblemHref = "https://leetcode.cn/problems/" + item.TitleSlug;
      item.ProblemHrefEN = "https://leetcode.com/problems/" + item.TitleSlug;
      item.ContestHref = "https://leetcode.cn/contest/" + item.ContestSlug;
      item.ContestHrefEN = "https://leetcode.com/contest/" + item.ContestSlug;
      allProblems.push(item)
      filterProblems.push(item)
    })
  })

let ifShow = document.body.clientWidth > 800 ? true : false
const pagination = reactive({
  showPageSize: ifShow,
  showTotal: ifShow,
  pageSize: Number(pageSize.value),
  pageSizeOptions: [15, 30, 50, 100]
})

const pageSizeRef = toRef(pagination, 'pageSize')
const pageSizeChange = (newPageSize: number) => {
  pageSizeRef.value = newPageSize
  localStorage.setItem('pageSize', newPageSize.toString())
}
let searchInfo = reactive({
  keyword: '',
  contestNumber: '',
  lowerBound: '',
  upperBound: ''
})
const sortable = {
  sortDirections: ['ascend', 'descend']
}

const query = () => {
  let [keyword, contestNumber, lowerBound, upperBound] = [searchInfo.keyword, searchInfo.contestNumber, searchInfo.lowerBound, searchInfo.upperBound]
  filterProblems.length = 0
  allProblems.forEach(item => {
    if (keyword !== '') {
      let k = keyword.trim().toLowerCase()
      if (!item.Title.toLowerCase().includes(k) &&
        !item.TitleEN.toLowerCase().includes(k) &&
        !(item.ID).toString().includes(k))
        return
    }

    if (contestNumber !== '') {
      let index = parseInt(item.ContestSlug.replace(/[^\d]/g, " "));
      if (index !== Number(contestNumber)) {
        return;
      }
    }
    if (lowerBound !== '' && item.Rating < Number(lowerBound)) {
      return;
    }
    if (upperBound !== '' && item.Rating > Number(upperBound)) {
      return;
    }
    filterProblems.push(item)
  })
}

const reset = () => {
  filterProblems.length = 0
  allProblems.forEach((item) => {
    filterProblems.push(item)
  })
  searchInfo.keyword = ''
  searchInfo.contestNumber = ''
  searchInfo.lowerBound = ''
  searchInfo.upperBound = ''
}
</script>

<template>
  <div class="content-wrapper">
    <!-- 上方搜索栏 -->
    <div class="filter-wrapper">
      <a-form :model="searchInfo" layout="inline" v-debounce="{ fn: query, duration: 200 }" class="form-wrapper">
        <a-form-item :label="$t('keyword')" field="key">
          <a-input v-model="searchInfo.keyword"></a-input>
        </a-form-item>
        <a-form-item :label="$t('contestNumber')" field="contestNumber">
          <a-input v-model="searchInfo.contestNumber" @input="(v) => (searchInfo.contestNumber = v.replace(/[^\d]/g, ''))"
            :max-length=4 class="s-input"></a-input>
        </a-form-item>
        <a-form-item :label="$t('ratingInterval')">
          <a-input v-model="searchInfo.lowerBound" @input="(v) => (searchInfo.lowerBound = v.replace(/[^\d]/g, ''))"
            :max-length=4 class="s-input"></a-input>
            <span>&nbsp;-&nbsp;</span>
            <a-input v-model="searchInfo.upperBound" @input="(v) => (searchInfo.upperBound = v.replace(/[^\d]/g, ''))"
            :max-length=4 class="s-input"></a-input>
        </a-form-item>

        <!-- 查询按钮 -->
        <!-- <a-button html-type="submit" class="btn">
          <template #icon>
            <Icon icon="material-symbols:search" />
          </template>
        </a-button> -->
        <a-button @click="reset" class="btn">
          <template #icon>
            <Icon icon="material-symbols:refresh-rounded" />
          </template>
        </a-button>
      </a-form>
    </div>

    <!-- 数据表格 -->
    <div class="table-wrapper">
      <a-table :data="filterProblems" class="table-content" :stripe="true" page-position="bottom"
        @pageSizeChange="pageSizeChange" :pagination="pagination">
        <template #columns>
          <a-table-column title="ID" data-index="ID" :sortable="sortable"></a-table-column>

          <a-table-column :title="$t('problemName')">
            <template #cell="scope">
              <a-link v-if="locale === 'ZH'" :href="scope.record.ProblemHref" target="_blank">
                {{ scope.record.Title }}
              </a-link>
              <a-link v-else :href="scope.record.ProblemHrefEN" target="_blank">
                {{ scope.record.TitleEN }}
              </a-link>
            </template>
          </a-table-column>

          <a-table-column :title="$t('contestName')">
            <template #cell="scope">
              <a-link v-if="locale === 'ZH'" :href="scope.record.ContestHref" target="_blank">
                {{ scope.record.Contest }}
              </a-link>
              <a-link v-else :href="scope.record.ContestHrefEN" target="_blank">
                {{ scope.record.ContestEN }}
              </a-link>
            </template>
          </a-table-column>

          <a-table-column :title="$t('questionNum')" data-index="ProblemIndex"></a-table-column>
          <a-table-column :title="$t('rating')" data-index="Rating" :sortable="sortable"></a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-wrapper {
  margin-top: 20px;
  color: var(--color-text-2)
}

.table-wrapper {
  width: 90%;
  margin-top: 30px;
}

.arco-table>>>.arco-table-pagination {
  margin: 45px auto;
}

.arco-pagination-list>>>.arco-table-item:not(:last-child) {
  margin-right: 0px;
}

.btn {
  margin-right: 10px;
}

@media screen and (max-width: 800px) {
  .s-input {
    width: 20vw;
  }

  /* .form-wrapper {
    display: flex;
    flex-direction: column;
  } */
}
</style>
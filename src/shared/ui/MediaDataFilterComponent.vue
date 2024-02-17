<script setup lang="ts">
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'
import type { DropdownData } from '../data-access/models/dropdownData'
import Skeleton from 'primevue/skeleton'

const { name } = defineProps<{
  filterInputs?: DropdownData[]
  filterDropdowns: DropdownData[]
  name: string
  isLoading: boolean
}>()

const route = useRoute()
const router = useRouter()

const handleDropdownChange = (event: DropdownChangeEvent, filter: any) => {
  routeChange(event.value, filter)
}

const handleInputChange = debounce(
  (event: string | number | null, filter: any) => routeChange(event, filter),
  1500
)

const routeChange = (value: any, filter: any) => {
  if (filter.route === 'param') {
    router.push({
      name,
      params: { [filter.param]: value },
      query: { ...route.query, page: 1, limit: 16 }
    })
  } else {
    router.push({ name, query: { ...route.query, [filter.param]: value } })
  }
}
</script>

<template>
  <div>
    <div
      v-if="!isLoading"
      class="card surface-card flex flex-row flex-wrap p-4 border-1 surface-border mt-1"
    >
      <div
        v-for="filter of filterInputs"
        :key="filter.param"
        class="flex flex-column gap-2 border-round m-1"
      >
        <label>{{ filter.label }}</label>
        <InputText
          :id="filter.label"
          type="text"
          :value="filter.value"
          @update:model-value="handleInputChange($event, filter)"
        />
      </div>

      <div
        v-for="filter of filterDropdowns"
        :key="filter.param"
        class="flex flex-column gap-2 border-round m-1"
      >
        <label>{{ filter.label }}</label>
        <MultiSelect
          v-if="filter.multi"
          :options="filter.options"
          v-model="filter.value"
          optionLabel="label"
          optionValue="value"
          @change="handleDropdownChange($event, filter)"
        />
        <Dropdown
          v-else
          :options="filter.options"
          v-model="filter.value"
          optionLabel="label"
          optionValue="value"
          @change="handleDropdownChange($event, filter)"
        />
      </div>
    </div>
    <div v-else>
      <div class="card flex flex-row flex-wrap p-4 border-1 surface-border mt-1">
        <div
          v-for="filter of [0, 1, 2, 3]"
          :key="filter"
          class="flex flex-column gap-2 border-round m-1"
        >
          <Skeleton width="4rem" styleClass="m-1"></Skeleton>
          <Skeleton width="8rem" styleClass="m-1"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

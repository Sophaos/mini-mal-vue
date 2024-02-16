<script setup lang="ts">
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import InputText from 'primevue/inputtext'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'
import type { DropdownData } from '../data-access/models/dropdownData'

const { name } = defineProps<{
  filterInputs?: DropdownData[]
  filterDropdowns: DropdownData[]
  name: string
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
  <div class="card surface-card flex flex-row flex-wrap p-4 border-1 surface-border mt-1">
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
</template>

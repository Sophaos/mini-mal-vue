<script setup lang="ts">
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown';
import { useRoute, useRouter } from 'vue-router';

const { name } = defineProps<{
    // data: string[]
    // filterInputs: any[]
  filterDropdowns: any[]
    name: string
}>()

const route = useRoute()
const router = useRouter()

const filterUpdate = (event: DropdownChangeEvent, filter: any) => {
  console.log(event, filter)
  if (filter.route === 'param') {

    router.push({ name, params: { [filter.param]: event.value }, query: {...route.query, page: 1, limit: 16} })
  } else {
    router.push({ name, query: { ...route.query, [filter.param]: event.value } })

  }
}
</script>

<template>
    <div
      class="card surface-card flex flex-row flex-wrap p-4 border-1 surface-border mt-1"
    >
      <!-- <div
        v-for="filter of filterInputs"
        :key="filter"
        class="flex flex-column gap-2 border-round m-1"
      >
        <label htmlFor="username">{{ filter.label }}</label>
        <ng-container v-if="filter.type === 'string'">
          <input
            [id]="filter.label"
            type="text"
            pInputText
            [(ngModel)]="filter.value"
            (ngModelChange)="inputChange($event, filter.param)"
          />
        </ng-container>
        <ng-container v-if="filter.type === 'number'">
          <p-inputNumber
            [id]="filter.label"
            [(ngModel)]="filter.value"
            (ngModelChange)="inputChange($event, filter.param)"
          />
        </ng-container>
      </div> -->

      <div
        v-for="filter of filterDropdowns"
        :key="filter"
        class="flex flex-column gap-2 border-round m-1"
      >
        <label htmlFor="username">{{ filter.label }}</label>
        <!-- <ng-container v-if="filter.multi">
          <p-multiSelect
            [options]="filter.options"
            [(ngModel)]="filter.value"
            optionLabel="label"
            optionValue="value"
            (ngModelChange)="
          filter.change
            ? filter.change($event, filter.param)
            : changeQueryParams($event, filter.param)
        "
          ></p-multiSelect>
        </ng-container> -->
        <!-- <ng-container v-if="!filter.multi"> -->
          <Dropdown
            :options="filter.options"
            v-model="filter.value"
            optionLabel="label"
            optionValue="value"
            @change="filterUpdate($event, filter)"
          />
        <!-- </ng-container> -->
      </div>
    </div>
</template>

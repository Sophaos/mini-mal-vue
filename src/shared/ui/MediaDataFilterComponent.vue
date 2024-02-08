<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

defineProps<{
    data: string[]
    filterInputs: any[]
    filterDropdowns: any[]
}>()
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
          />
        <!-- </ng-container> -->
      </div>
    </div>
</template>

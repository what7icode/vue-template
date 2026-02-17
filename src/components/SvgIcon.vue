<script setup lang="ts">
import { computed } from 'vue'

type Size = number | string

const props = defineProps<{
  name: string
  size?: Size
  color?: string
  prefix?: string
  class?: string
}>()

const symbolId = computed(() => `${props.prefix ?? 'icon'}-${props.name}`)
const pixel = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : (props.size ?? '24px'),
)
const style = computed(() => ({
  width: pixel.value,
  height: pixel.value,
  color: props.color ?? 'currentColor',
  display: 'inline-block',
  verticalAlign: 'middle',
}))
</script>

<template>
  <svg :style="style" :class="props.class" aria-hidden="true">
    <use :href="`#${symbolId}`" />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as JsBarcode from 'jsbarcode'

const props = defineProps<{
  value: string | number
}>()

const root = ref<HTMLElement | null>(null)
const generateBarcode = () => {
  try {
    const aux = String(props.value)
    const divDOM: HTMLElement | null = document.getElementById('info')
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('jsbarcode-format', 'ean13')
    svg.setAttribute('jsbarcode-value', aux)
    svg.className.baseVal = 'barcode'
    divDOM.appendChild(svg)

    JsBarcode('.barcode').init()
  } catch (error) {}
}

onMounted(() => {
  generateBarcode()
})
</script>

<template>
  <div id="info" ref="root"></div>
</template>

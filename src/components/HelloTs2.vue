<template>
  <div class="example">Hola {{ message }}</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class YourComponent extends Vue {
  message = 'John TS2';
}
</script>

<style lang="scss" scoped>
.example {
  color: blue;
}
</style>

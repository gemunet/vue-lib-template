<template>
  <div class="example">Hola {{ message }}</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data(): any {
    return {
      message: 'John TS1',
    };
  },
});
</script>

<style lang="scss" scoped>
.example {
  color: blue;
}
</style>

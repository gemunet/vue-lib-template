<template>
  <div class="example">Hola {{ message }}</div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  data() {
    return {
      message: 'John JS2',
    };
  },
};
</script>

<style scoped>
.example {
  color: red;
}
</style>

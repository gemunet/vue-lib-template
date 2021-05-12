<template>
  <div class="example">Hola {{ message }}</div>
</template>

<script>
export default {
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  data() {
    return {
      message: 'John JS3',
    };
  },
};
</script>

<style scoped>
.example {
  color: blue;
}
</style>

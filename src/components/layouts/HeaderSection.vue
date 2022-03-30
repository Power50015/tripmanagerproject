<template>
  <header class="text-center">
    <h2 class="py-5 title-section"><slot></slot></h2>
  </header>
</template>

<script>
export default {
    name:"HeaderSection"
};
</script>

<style scoped>
header {
  background-color: #a0a0a0;
}
.title-section {
  color: #eee;
}
</style>
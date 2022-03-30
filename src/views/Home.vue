<template>
  <main class="home" >
    <Navbar />
    <Slide />
  </main>
</template>

<script>
import Navbar from "@/components/layouts/Navbar";
import Slide from "@/components/home/Slide";

export default {
  name: "Home",
  components: {
    Navbar,
    Slide,
  },
};
</script>

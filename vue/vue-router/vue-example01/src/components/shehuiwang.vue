<template>
  <div>
      <h2>{{msg}}</h2>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: "shehuiwang",
  data() {
    return { msg: "大家好，我是社会王888" };
  }
};
</script>

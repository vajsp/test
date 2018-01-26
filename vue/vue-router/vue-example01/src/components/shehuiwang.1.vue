<template>
  <div>
      <h3>{{msg}}</h3>
      <div class="pp">{{$route.params.id}}</div>
  </div>
</template>

<script>

export default {
  name: "shehuiwang",
  data() {
    return { msg: "大家好，我是社会王1111" };
  }
};
</script>

<style>
.pp{
  color: aqua;
}
</style>


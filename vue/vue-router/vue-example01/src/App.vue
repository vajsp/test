<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/shehuiwang">社会王</router-link>
      <router-link :to="{name:'shehuiwang1',params:{username:'niao',id:88888}}">社会王1</router-link>
      <router-link to="shehuiwang2">社会王2</router-link>
    </div>
    <p>{{$route.name}}</p>
    <router-view/>

    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  color: red;
}
</style>

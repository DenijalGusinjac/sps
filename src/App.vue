<template>
  <div>
    <template v-if="!$route.meta.allowAnonymous">
      <v-app id="inspire">
        <div class="app-container">
          <toolbar @toggleNavigationBar="drawer = !drawer"/>
          <navigation :toggle="drawer"/>
          <v-content>
            <breadcrumbs />
            <router-view/>
            <page-footer />
          </v-content>
        </div>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data() {
    return {
      drawer: false
    }
  }
}
</script>

<style>
@font-face {
  font-family: "NunitoSans";
  src: local("NunitoSans"),
   url(./assets/fonts/NunitoSans-Regular.ttf) format("truetype");
}
.application {
  font-family: "NunitoSans";
}
  .v-btn:hover:before{
    color: transparent !important;
  }
</style>

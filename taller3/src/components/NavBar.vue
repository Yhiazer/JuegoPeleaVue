<template>
    <header>
      <div class="container">
        <router-link to="/">
          <img src="@/media/logo.png" width="100px" alt="logo.png" style="cursor: pointer;">
        </router-link>
        <nav>
          <a @click="goToPrincipal">Volver</a>
        </nav>
      </div>
    </header>
</template>
<script>
export default {
  methods: {
    goToPrincipal() {
      this.$router.push({ name: 'principal' });
    }
  }
}
</script>
<template>
    <header>
      <div class="container">
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
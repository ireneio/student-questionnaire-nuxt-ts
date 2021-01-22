<template>
  <div>Redirecting...</div>
</template>

<script>
export default {
  layout: 'backend',
  created() {
    this.$router.push('/sys/')
  }
}
</script>

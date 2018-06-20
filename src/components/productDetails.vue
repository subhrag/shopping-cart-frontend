<template>
  <ul>
    <li v-for="detail in pdetails" :key="detail">{{ detail }} </li>
  </ul>
</template>

<script>
export default {
  props: {
    pdetails: {
      type: Array,
      required: true
      }
  }
}
</script>


<template>
  <div :v-html="count"></div>
</template>

<script>
import { onMounted,ref } from 'vue'
import axios from 'axios'
import { Base64 } from 'js-base64'
export default {
  name: 'App',
  setup () {
    const count = ref('')
    onMounted(() => {
      axios.get('/api').then(res => {
        console.log(res)
        count.value = Base64.decode(res.data)
      },err => {
        console.log(err)
      })
    })
    return {
      count
    }
  }
}
</script>

<style>
</style>

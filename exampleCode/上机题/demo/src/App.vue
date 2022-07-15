<template>
  <!-- <div>{{ count }}</div> -->
  <div v-html="count"></div>
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
        console.log(res,Date.parse(new Date()))
        count.value = Base64.decode(res.data).replace(/</g,'<br/>').replace(/[n|%|@|$|&|^|`|\\|']/g,'').replace(/[0-9]{10}/g,new Date().toLocaleString())
        
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

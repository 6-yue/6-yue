<template>
  <div v-html="count"></div>
  <!-- <div v-for="(item,index) in count" :key="index" v-html="item.content"></div> -->
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
        count.value = Base64.decode(res.data).replace(/</g,'<br/>').replace(/[n|%|@|$|&|^|`|\\|']/g,'') // replace(/[0-9]{10}/g, '')
      },err => {
        console.log(err)
      })
      // axios.get('api/v1/topics').then(res => {
      //   console.log(res,Date.parse(new Date()))
      //   count.value = res.data.data
      // },err => {
      //   console.log(err)
      // })
    })
    return {
      count
    }
  }
}
</script>

<style>
</style>

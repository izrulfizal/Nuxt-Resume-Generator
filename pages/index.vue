<template>
  <div class="mainContainer">
    <h1>IzFiz Resume Generator!</h1>
    <p>Please upload your JSON file here</p>
    <input type="file" accept=".json" @change="handleFileUpload" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useResumeStore } from '@/stores/resume'

const router = useRouter()
const resumeStore = useResumeStore()

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string)
      resumeStore.setResumeData(json)
      router.push('/resume-preview') 
    } catch (err) {
      alert("Invalid JSON file.")
    }
  }
  reader.readAsText(file)
}
</script>


<style>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 80vw;
  border: 2px solid black;
  margin:auto;
  border-radius: 10px;
}
</style>
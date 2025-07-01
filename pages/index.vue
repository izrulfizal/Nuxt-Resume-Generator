<template>
  <div class="mainContainer">
    <h1>IzFiz Resume Generator!</h1>
    <p>Please upload your JSON file here</p>
    <input type="file" accept=".json" @change="handleFileUpload" />
    <a href="/template.json" download class="download-btn">
      📄 Download Template JSON
    </a>
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
.download-btn {
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #2563eb; /* Tailwind blue-600 */
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: background-color 0.2s;
}
.download-btn:hover {
  background-color: #1e40af; /* Tailwind blue-800 */
}
</style>
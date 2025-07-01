<template>
  <div class="page-bg">
    <div class="upload-card">
      <h1>📄 IzFiz Resume Generator</h1>
      <p>Please upload your JSON file below:</p>

      <input type="file" accept=".json" @change="handleUpload" />

      <a href="/template.json" download class="download-btn">
        Download Template File
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useResumeStore } from '@/stores/resume'
import { useRouter } from 'vue-router'

const resumeStore = useResumeStore()
const router = useRouter()

const handleUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string)
      resumeStore.setResumeData(json)
      router.push('/resume-preview')
    } catch {
      alert('Invalid JSON file format.')
    }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.page-bg {
  background-color: #b3deff; /* slate-800 */
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.upload-card {
  background-color: #f8fafc; /* light gray */
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.upload-card h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: #0f172a; /* slate-900 */
}

.upload-card p {
  margin-bottom: 1.5rem;
  color: #334155; /* slate-700 */
}

input[type="file"] {
  margin-bottom: 1.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.download-btn {
  display: inline-block;
  background-color: #2563eb; /* blue-600 */
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.download-btn:hover {
  background-color: #1d4ed8; /* blue-700 */
}

input[type="file"]::file-selector-button {
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-right: 16px;
  transition: background-color 200ms;
}

/* file upload button hover state */
input[type="file"]::file-selector-button:hover {
  background-color: #f3f4f6;
}

/* file upload button active state */
input[type="file"]::file-selector-button:active {
  background-color: #e5e7eb;
}
</style>

import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resumeData: null as any
  }),
  actions: {
setResumeData(data: any) {
  this.resumeData = data
  if (process.client) {
    localStorage.setItem('resumeData', JSON.stringify(data))
  }
}
,
loadFromStorage() {
  if (process.client) {
    const saved = localStorage.getItem('resumeData')
    if (saved) {
      this.resumeData = JSON.parse(saved)
    }
  }
}

  }
})

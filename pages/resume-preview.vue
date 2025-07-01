<template>
    <div class="page-wrapper">
  <div v-if="resume" class="a4-container">
    <h1 class="name">{{ resume.name }}</h1>
    <h2 class="title">{{ resume.title }}</h2>

    <section class="bento-grid">
      <div class="box">
        <h3>Contact</h3>
        <p><strong>Email:</strong> {{ resume.contact.email }}</p>
        <p><strong>Phone:</strong> {{ resume.contact.phone }}</p>
        <p><strong>LinkedIn:</strong> <a :href="resume.contact.linkedin" target="_blank">{{ resume.contact.linkedin }}</a></p>
        <p><strong>GitHub:</strong> <a :href="resume.contact.github" target="_blank">{{ resume.contact.github }}</a></p>
        <p><strong>Location:</strong> {{ resume.contact.location }}</p>
      </div>
    <div class="box">
        <img :src=resume.imageUrl alt="">

      </div>

      <div class="box wide">
        <h3>Summary</h3>
        <p>{{ resume.summary }}</p>
      </div>

      <div class="box">
        <h3>Skills</h3>
        <ul>
          <li v-for="skill in resume.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>


      <div class="box">
        <h3>Education</h3>
        <div v-for="edu in resume.education" :key="edu.institution">
          <p><strong>{{ edu.institution }}</strong></p>
          <p>{{ edu.degree }}</p>
          <p>{{ edu.year }}</p>
        </div>
      </div>

      <div class="box wide">
        <h3>Experience</h3>
        <div v-for="exp in resume.experience" :key="exp.company" class="entry">
          <p><strong>{{ exp.company }}</strong> — {{ exp.position }}</p>
          <p><em>{{ exp.period }}</em></p>
          <ul>
            <li v-for="task in exp.responsibilities" :key="task">{{ task }}</li>
          </ul>
        </div>
      </div>


      <div class="box wide">
        <h3>Projects</h3>
        <div v-for="proj in resume.projects" :key="proj.name">
          <p><strong>{{ proj.name }}</strong></p>
          <p>{{ proj.description }}</p>
          <a :href="proj.url" target="_blank">{{ proj.url }}</a>
        </div>
      </div>
    </section>
  </div>
    <div v-else class="a4-container">
    <h2>No resume data found</h2>
    <p>Please upload your resume JSON file first.</p>
    <NuxtLink to="/">Go back</NuxtLink>
  </div>
  </div>
</template>

<script lang="ts" setup>
// import { useResumeStore } from '@/stores/resume'
import { onMounted, ref } from 'vue'
import { useResumeStore } from '@/stores/resume'


const resumeStore = useResumeStore()
const resume = ref<any>(null)

onMounted(() => {
  resumeStore.loadFromStorage()
  resume.value = resumeStore.resumeData
})
</script>
<style scoped>
.a4-container {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  background: white;
  margin: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  box-sizing: border-box;
}

.name {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0;
}

.title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: #666;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.box {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 10px;
  background: #f9f9f9;
}

.box h3 {
  margin-top: 0;
  color: #0057a3;
}
.box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}


.box.wide {
  grid-column: span 2;
}

.entry {
  margin-bottom: 12px;
}

a {
  color: #0057a3;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.page-wrapper {
  min-height: 100vh;
  background-color: #b3deff; /* dark gray (like Tailwind's gray-900) */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

</style>

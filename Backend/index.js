const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const profile = {
  name: 'Tanish',
  role: 'College Student | Full-Stack Developer',
  email: 'sarraftanish@gmail.com',
  bio: 'I am a college student passionate about creating aesthetic and high-performance web apps with modern front-end and back-end technologies.',
}

const projects = [
  {
    title: 'Career Guidance Portal',
    description: 'An AI-powered career guidance portal that helps students choose a career path based on their interests and choices.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'RESTful API'],
  },
  {
    title: 'Recycling Vending Machine',
    description: 'A recycling rewards platform designed to keep society clean by offering incentives based on the recyclable products users provide.',
    tech: ['JavaScript', 'React', 'Next.js', 'MongoDB'],
  },
  {
    title: 'Campus Event Portal',
    description: 'A full-stack event portal for college clubs where students can publish, join, and manage events.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express'],
    github: 'https://github.com/SarrafTanish/campus-event-portal',
  },
  {
    title: 'Smart Expense Tracker',
    description: 'A budgeting web app with charts and monthly reports that helps students track spending habits.',
    tech: ['JavaScript', 'React', 'Express API'],
    github: 'https://github.com/SarrafTanish/smart-expense-tracker',
  },
  {
    title: 'Placement Prep Dashboard',
    description: 'A personalized dashboard to track coding practice, mock interviews, and placement progress.',
    tech: ['React', 'Node.js', 'REST API'],
    github: 'https://github.com/SarrafTanish/placement-prep-dashboard',
  },
]

const skills = [
  { name: 'HTML/CSS/JavaScript', level: 92 },
  { name: 'React.js', level: 90 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'Node.js', level: 84 },
  { name: 'Express.js', level: 86 },
  { name: 'UI/UX Design', level: 80 },
]

app.get('/api/profile', (req, res) => {
  res.json(profile)
})

app.get('/api/projects', (req, res) => {
  res.json(projects)
})

app.get('/api/skills', (req, res) => {
  res.json(skills)
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' })
  }

  return res.json({ success: true, message: 'Message received. Tanish will contact you soon!' })
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`)
})

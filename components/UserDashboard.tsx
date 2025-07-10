// 'use client'

// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { Line, Bar, Doughnut } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// )

// interface UserDashboardProps {
//   user: {
//     id: string
//     name: string
//     email: string
//     profileURL?: string
//   }
// }

// interface ScoreData {
//   id: string
//   averageScore: number
//   'Communication Skills'?: number
//   'Technical Knowledge'?: number
//   'Problem-Solving'?: number
//   'Cultural & Role Fit'?: number
//   'Confidence & Clarity'?: number
//   createdAt: string
//   interviewId: string
//   userId: string
// }

// const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
//   const [scores, setScores] = useState<ScoreData[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState('overview')

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const res = await fetch(`/api/scores?userId=${user.id}`)
//         if (!res.ok) throw new Error('Failed to fetch scores')

//         const userScores = await res.json()

//         const validScores: ScoreData[] = (userScores || []).map((score: any) => ({
//           id: score.id,
//           averageScore: score.averageScore ?? 0,
//           'Communication Skills': score['Communication Skills'] ?? 0,
//           'Technical Knowledge': score['Technical Knowledge'] ?? 0,
//           'Problem-Solving': score['Problem-Solving'] ?? 0,
//           'Cultural & Role Fit': score['Cultural & Role Fit'] ?? 0,
//           'Confidence & Clarity': score['Confidence & Clarity'] ?? 0,
//           createdAt: score.createdAt ?? '',
//           interviewId: score.interviewId ?? '',
//           userId: score.userId ?? '',
//         }))

//         setScores(validScores)
//       } catch (error) {
//         console.error('Error fetching scores:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (user?.id) fetchScores()
//   }, [user.id])

//   const getMaxScore = () => (scores.length === 0 ? 0 : Math.max(...scores.map(score => score.averageScore)))
//   const getAverageScore = () => (scores.length === 0 ? 0 : Math.round(scores.reduce((sum, score) => sum + score.averageScore, 0) / scores.length))

//   const avgScoreChartData = {
//     labels: scores.map(score => new Date(score.createdAt).toLocaleDateString()),
//     datasets: [
//       {
//         label: 'Average Score',
//         data: scores.map(score => score.averageScore),
//         borderColor: '#CAC5FE',
//         backgroundColor: 'rgba(202, 197, 254, 0.1)',
//         borderWidth: 3,
//         fill: true,
//         tension: 0.4,
//         pointBackgroundColor: '#CAC5FE',
//         pointBorderColor: '#020408',
//         pointBorderWidth: 2,
//         pointRadius: 6,
//       },
//     ],
//   }

//   const categoryScoresData = {
//     labels: ['Communication Skills', 'Technical Knowledge', 'Problem-Solving', 'Cultural & Role Fit', 'Confidence & Clarity'],
//     datasets: [
//       {
//         label: 'Latest Scores',
//         data: scores.length > 0 ? [
//           scores[scores.length - 1]['Communication Skills'] || 0,
//           scores[scores.length - 1]['Technical Knowledge'] || 0,
//           scores[scores.length - 1]['Problem-Solving'] || 0,
//           scores[scores.length - 1]['Cultural & Role Fit'] || 0,
//           scores[scores.length - 1]['Confidence & Clarity'] || 0,
//         ] : [0, 0, 0, 0, 0],
//         backgroundColor: [
//           'rgba(202, 197, 254, 0.8)',
//           'rgba(73, 222, 80, 0.8)',
//           'rgba(247, 83, 83, 0.8)',
//           'rgba(214, 224, 255, 0.8)',
//           'rgba(108, 112, 166, 0.8)',
//         ],
//         borderColor: [
//           '#CAC5FE',
//           '#49DE50',
//           '#F75353',
//           '#D6E0FF',
//           '#6C70A6',
//         ],
//         borderWidth: 2,
//       },
//     ],
//   }

//   const doughnutData = {
//     labels: ['Completed', 'Remaining'],
//     datasets: [
//       {
//         data: [getAverageScore(), 100 - getAverageScore()],
//         backgroundColor: ['#CAC5FE', '#27282F'],
//         borderColor: ['#CAC5FE', '#242633'],
//         borderWidth: 2,
//       },
//     ],
//   }

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { labels: { color: '#D6E0FF', font: { size: 12 } } } },
//     scales: {
//       x: { ticks: { color: '#D6E0FF' }, grid: { color: 'rgba(214, 224, 255, 0.1)' } },
//       y: { ticks: { color: '#D6E0FF' }, grid: { color: 'rgba(214, 224, 255, 0.1)' } },
//     },
//   }

//   const handleReset = () => { console.log('Reset functionality to be implemented') }

//   if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-white text-xl">Loading...</div></div>

//   return (
//     <div className="root-layout">
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center space-x-6">
//           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-200">
//             <Image src={user.profileURL || '/default-avatar.png'} alt="Profile" width={80} height={80} className="w-full h-full object-cover" />
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
//             <p className="text-light-100 text-lg">{user.email}</p>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <button onClick={handleReset} className="btn-secondary">Reset Progress</button>
//           <button className="btn-primary">Settings</button>
//         </div>
//       </div>

//       <div className="flex gap-4 mb-8">
//         {['overview', 'analytics', 'activity'].map(tab => (
//           <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-full font-semibold capitalize transition-colors ${activeTab === tab ? 'bg-primary-200 text-dark-100' : 'bg-dark-200 text-light-100 hover:bg-dark-300'}`}>{tab}</button>
//         ))}
//       </div>

//       {activeTab === 'overview' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           <Card title="Total Interviews" value={scores.length} subtitle="Completed sessions" />
//           <Card title="Average Score" value={getAverageScore()} subtitle="Out of 100" />
//           <Card title="Best Score" value={getMaxScore()} subtitle="Personal best" />
//         </div>
//       )}

//       {activeTab === 'analytics' && (
//         <div className="space-y-8">
//           <ChartCard title="Score Progress Over Time"><Line data={avgScoreChartData} options={chartOptions} /></ChartCard>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <ChartCard title="Category Breakdown"><Bar data={categoryScoresData} options={chartOptions} /></ChartCard>
//             <ChartCard title="Overall Performance">
//               <div className="h-80 flex items-center justify-center">
//                 <div className="w-64">
//                   <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '70%', plugins: { legend: { display: false } } }} />
//                   <div className="text-center mt-4">
//                     <div className="text-3xl font-bold text-white">{getAverageScore()}%</div>
//                     <div className="text-light-100">Average Score</div>
//                   </div>
//                 </div>
//               </div>
//             </ChartCard>
//           </div>
//         </div>
//       )}

//       {/* {activeTab === 'analytics' && (
//   <div className="card-border">
//     <div className="card p-6 overflow-x-auto">
//       <h3 className="text-white mb-6">Interview History</h3>
//       <table className="w-full text-white">
//         <thead>
//           <tr>
//             <th className="p-4 text-left">Interview ID</th>
//             <th className="p-4 text-left">Average Score</th>
//             <th className="p-4 text-left">Communication Skills</th>
//             <th className="p-4 text-left">Technical Knowledge</th>
//             <th className="p-4 text-left">Problem-Solving</th>
//             <th className="p-4 text-left">Cultural & Role Fit</th>
//             <th className="p-4 text-left">Confidence & Clarity</th>
//             <th className="p-4 text-left">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {scores.map((score) => (
//             <tr key={score.id} className="border-t border-gray-700">
//               <td className="p-4">{score.interviewId}</td>
//               <td className="p-4">{score.averageScore}</td>
//               <td className="p-4">{score['Communication Skills']}</td>
//               <td className="p-4">{score['Technical Knowledge']}</td>
//               <td className="p-4">{score['Problem-Solving']}</td>
//               <td className="p-4">{score['Cultural & Role Fit']}</td>
//               <td className="p-4">{score['Confidence & Clarity']}</td>
//               <td className="p-4">{new Date(score.createdAt).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// )} */}


//       {activeTab === 'activity' && <ActivityHeatmap scores={scores} />}
//     </div>
//   )
// }

// export default UserDashboard

// const Card = ({ title, value, subtitle }: any) => (
//   <div className="card-border">
//     <div className="card p-6 text-center">
//       <h3 className="text-primary-200 mb-4">{title}</h3>
//       <div className="text-4xl font-bold text-white mb-2">{value}</div>
//       <p className="text-light-100">{subtitle}</p>
//     </div>
//   </div>
// )

// const ChartCard = ({ title, children }: any) => (
//   <div className="card-border">
//     <div className="card p-6">
//       <h3 className="text-white mb-6">{title}</h3>
//       <div className="h-80">{children}</div>
//     </div>
//   </div>
// )

// const ActivityHeatmap = ({ scores }: any) => {
//   const getStreakData = () => {
//     const today = new Date()
//     const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1)
//     const streakMap: { [key: string]: number } = {}
//     scores.forEach((score: any) => { const date = new Date(score.createdAt).toDateString(); streakMap[date] = (streakMap[date] || 0) + 1 })
//     const streakArray = []
//     for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
//       const dateStr = d.toDateString()
//       streakArray.push({ date: dateStr, count: streakMap[dateStr] || 0 })
//     }
//     return streakArray
//   }

//   const streakData = getStreakData()
//   const maxCount = Math.max(...streakData.map(d => d.count), 1)

//   return (
//     <div className="card-border">
//       <div className="card p-6">
//         <h3 className="text-white mb-6">Interview Activity Heatmap</h3>
//         <p className="text-light-100 mb-4">Your interview activity over the past year</p>
//         <div className="grid grid-cols-12 gap-1 p-4">
//           {streakData.map((day, index) => {
//             const intensity = day.count / maxCount
//             const opacity = Math.max(intensity, 0.1)
//             return <div key={index} className={`w-3 h-3 rounded-sm ${day.count > 0 ? 'bg-primary-200' : 'bg-dark-300'}`} style={{ opacity: day.count > 0 ? opacity : 0.3 }} title={`${day.date}: ${day.count} interviews`} />
//           })}
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <div className="text-sm text-light-100">Less</div>
//           <div className="flex gap-1">
//             {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity, index) => <div key={index} className="w-3 h-3 rounded-sm bg-primary-200" style={{ opacity }} />)}
//           </div>
//           <div className="text-sm text-light-100">More</div>
//         </div>
//       </div>
//     </div>
//   )
// }





'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Settings, Calendar, TrendingUp, Award, Activity, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

interface UserDashboardProps {
  user: {
    id: string
    name: string
    email: string
    profileURL?: string
  }
}

interface ScoreData {
  id: string
  averageScore: number
  createdAt: string
  'Communication Skills'?: number
  'Technical Knowledge'?: number
  'Problem-Solving'?: number
  'Cultural & Role Fit'?: number
  'Confidence & Clarity'?: number
}

interface LineChartData {
  date: string
  score: number
}

interface SubjectData {
  subject: string
  value: number
  remaining: number
}

interface StreakData {
  date: string
  count: number
  day: number
  dateObj: Date
  month: number
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [scores, setScores] = useState<ScoreData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`/api/scores?userId=${user.id}`)
        if (!res.ok) throw new Error(`Failed to fetch scores: ${res.status}`)
        const data = await res.json()
        setScores(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Error fetching scores:', e)
        setScores([])
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) fetchScores()
  }, [user.id])

  const avg = scores.length ? Math.round(scores.reduce((s, d) => s + (d.averageScore || 0), 0) / scores.length) : 0
  const maxScore = scores.length ? Math.max(...scores.map(s => s.averageScore || 0)) : 0
  const totalInterviews = scores.length

  const subjects = ['Communication Skills', 'Technical Knowledge', 'Problem-Solving', 'Cultural & Role Fit', 'Confidence & Clarity'] as const
  type SubjectKey = typeof subjects[number]

  const lineChartData: LineChartData[] = scores.map(s => ({
    date: new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: s.averageScore || 0
  }))

  const getLatestSubjectData = (): SubjectData[] => {
    if (!scores.length) {
      return subjects.map(subject => ({ subject, value: 0, remaining: 100 }))
    }
    const latest = scores[scores.length - 1]
    return subjects.map(subject => ({
      subject,
      value: (latest[subject] as number | undefined) ?? 0,
      remaining: 100 - ((latest[subject] as number | undefined) ?? 0)
    }))
  }

  const getStreakData = (): StreakData[] => {
    const today = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 0)
    const streakMap: { [key: string]: number } = {}
    
    scores.forEach(score => {
      const date = new Date(score.createdAt).toISOString().split('T')[0]
      streakMap[date] = (streakMap[date] || 0) + 1
    })

    const streakArray: StreakData[] = []
    const currentDateIter = new Date(startDate)
    
    while (currentDateIter <= endDate) {
      const dateStr = currentDateIter.toISOString().split('T')[0]
      streakArray.push({
        date: dateStr,
        count: streakMap[dateStr] || 0,
        day: currentDateIter.getDay(),
        dateObj: new Date(currentDateIter),
        month: currentDateIter.getMonth()
      })
      currentDateIter.setDate(currentDateIter.getDate() + 1)
    }
    
    return streakArray
  }

  const streakData = getStreakData()
  const maxCount = Math.max(...streakData.map(d => d.count), 1)
  
  const monthGroups = streakData.reduce((acc: { [key: string]: StreakData[] }, day) => {
    const monthKey = `${day.dateObj.getFullYear()}-${day.dateObj.getMonth()}`
    if (!acc[monthKey]) acc[monthKey] = []
    acc[monthKey].push(day)
    return acc
  }, {})

  const getWeeksForMonth = (days: StreakData[]): (StreakData | null)[][] => {
    const weeks: (StreakData | null)[][] = []
    let currentWeek: (StreakData | null)[] = []
    
    days.forEach((day, index) => {
      if (index === 0) {
        for (let i = 0; i < day.day; i++) {
          currentWeek.push(null)
        }
      }
      
      currentWeek.push(day)
      
      if (currentWeek.length === 7 || index === days.length - 1) {
        while (currentWeek.length < 7) {
          currentWeek.push(null)
        }
        weeks.push(currentWeek)
        currentWeek = []
      }
    })
    
    return weeks
  }

  const getIntensityColor = (count: number): string => {
    if (count === 0) return 'bg-dark-300 border-dark-300'
    const intensity = count / maxCount
    if (intensity <= 0.25) return 'bg-green-900 border-green-800'
    if (intensity <= 0.5) return 'bg-green-700 border-green-600'
    if (intensity <= 0.75) return 'bg-green-500 border-green-400'
    return 'bg-green-400 border-green-300'
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

  const navigateMonth = (direction: 'prev' | 'next'): void => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1))
    setCurrentDate(newDate)
  }

  if (loading) {
    return (
      <div className="min-h-screen dark-gradient flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dark-gradient text-white">
      <nav className="flex justify-between items-center p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2><span className="text-primary-100">Prep</span><span className="text-orange-200">Buddy</span></h2>
        </Link>
        <Sidebar user={user} />
      </nav>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image
              src={user.profileURL || '/placeholder.svg'}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full border-3 border-green-500 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400 text-lg">{user.email}</p>
            </div>
          </div>
          <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dark-gradient rounded-xl p-6 border-gradient">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold">Total Interviews</h3>
            </div>
            <p className="text-3xl font-bold text-green-500">{totalInterviews}</p>
            <p className="text-gray-400 text-sm mt-1">Completed sessions</p>
          </div>
          
          <div className="dark-gradient rounded-xl p-6 border-gradient">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Average Score</h3>
            </div>
            <p className="text-3xl font-bold text-blue-500">{avg}%</p>
            <p className="text-gray-400 text-sm mt-1">Overall performance</p>
          </div>
          
          <div className="dark-gradient rounded-xl p-6 border-gradient">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold">Best Score</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-500">{maxScore}%</p>
            <p className="text-gray-400 text-sm mt-1">Personal best</p>
          </div>
        </div>

        {/* Score Progress Chart */}
        <div className="dark-gradient rounded-xl p-6 border-gradient">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Score Progress Over Time
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#e5e7eb'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="dark-gradient rounded-xl p-6 border-gradient">
          <h3 className="text-xl font-semibold mb-6">Latest Interview Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {getLatestSubjectData().map((item, i) => {
              const COLORS = ['#22c55e', '#1f2937']
              const pieData = [
                { name: 'Score', value: item.value },
                { name: 'Remaining', value: item.remaining }
              ]
              
              return (
                <div key={i} className="text-center">
                  <h4 className="text-gray-400 mb-4 text-sm font-medium">{item.subject}</h4>
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{item.value}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* LeetCode Style Streak Calendar */}
        <div className="dark-gradient rounded-xl p-6 border-gradient">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold">Interview Activity</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button 
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              >
                <ChevronRight className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-400 text-sm">
              {scores.length} interviews in the selected period
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-8 min-w-full pb-4">
              {Object.entries(monthGroups).map(([monthKey, days]) => {
                const [year, month] = monthKey.split('-').map(Number)
                const weeks = getWeeksForMonth(days)
                
                return (
                  <div key={monthKey} className="flex-shrink-0">
                    <div className="text-sm text-gray-400 font-medium mb-2 text-center">
                      {monthNames[month]} {year}
                    </div>
                    <div className="flex gap-1">
                      {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={`w-3 h-3 rounded border ${
                                day ? getIntensityColor(day.count) : 'bg-transparent border-transparent'
                              } hover:ring-1 hover:ring-gray-400 cursor-pointer transition-all`}
                              title={
                                day 
                                  ? `${day.dateObj.toLocaleDateString()}: ${day.count} interview${day.count !== 1 ? 's' : ''}`
                                  : ''
                              }
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded border bg-dark-300 border-dark-300"></div>
              <div className="w-3 h-3 rounded border bg-green-900 border-green-800"></div>
              <div className="w-3 h-3 rounded border bg-green-700 border-green-600"></div>
              <div className="w-3 h-3 rounded border bg-green-500 border-green-400"></div>
              <div className="w-3 h-3 rounded border bg-green-400 border-green-300"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
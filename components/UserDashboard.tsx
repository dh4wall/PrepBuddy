'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

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
  'Communication Skills'?: number
  'Technical Knowledge'?: number
  'Problem-Solving'?: number
  'Cultural & Role Fit'?: number
  'Confidence & Clarity'?: number
  createdAt: string
  interviewId: string
  userId: string
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [scores, setScores] = useState<ScoreData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`/api/scores?userId=${user.id}`)
        if (!res.ok) throw new Error('Failed to fetch scores')

        const userScores = await res.json()

        const validScores: ScoreData[] = (userScores || []).map((score: any) => ({
          id: score.id,
          averageScore: score.averageScore ?? 0,
          'Communication Skills': score['Communication Skills'] ?? 0,
          'Technical Knowledge': score['Technical Knowledge'] ?? 0,
          'Problem-Solving': score['Problem-Solving'] ?? 0,
          'Cultural & Role Fit': score['Cultural & Role Fit'] ?? 0,
          'Confidence & Clarity': score['Confidence & Clarity'] ?? 0,
          createdAt: score.createdAt ?? '',
          interviewId: score.interviewId ?? '',
          userId: score.userId ?? '',
        }))

        setScores(validScores)
      } catch (error) {
        console.error('Error fetching scores:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) fetchScores()
  }, [user.id])

  const getMaxScore = () => (scores.length === 0 ? 0 : Math.max(...scores.map(score => score.averageScore)))
  const getAverageScore = () => (scores.length === 0 ? 0 : Math.round(scores.reduce((sum, score) => sum + score.averageScore, 0) / scores.length))

  const avgScoreChartData = {
    labels: scores.map(score => new Date(score.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Average Score',
        data: scores.map(score => score.averageScore),
        borderColor: '#CAC5FE',
        backgroundColor: 'rgba(202, 197, 254, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#CAC5FE',
        pointBorderColor: '#020408',
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  }

  const categoryScoresData = {
    labels: ['Communication Skills', 'Technical Knowledge', 'Problem-Solving', 'Cultural & Role Fit', 'Confidence & Clarity'],
    datasets: [
      {
        label: 'Latest Scores',
        data: scores.length > 0 ? [
          scores[scores.length - 1]['Communication Skills'] || 0,
          scores[scores.length - 1]['Technical Knowledge'] || 0,
          scores[scores.length - 1]['Problem-Solving'] || 0,
          scores[scores.length - 1]['Cultural & Role Fit'] || 0,
          scores[scores.length - 1]['Confidence & Clarity'] || 0,
        ] : [0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(202, 197, 254, 0.8)',
          'rgba(73, 222, 80, 0.8)',
          'rgba(247, 83, 83, 0.8)',
          'rgba(214, 224, 255, 0.8)',
          'rgba(108, 112, 166, 0.8)',
        ],
        borderColor: [
          '#CAC5FE',
          '#49DE50',
          '#F75353',
          '#D6E0FF',
          '#6C70A6',
        ],
        borderWidth: 2,
      },
    ],
  }

  const doughnutData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [getAverageScore(), 100 - getAverageScore()],
        backgroundColor: ['#CAC5FE', '#27282F'],
        borderColor: ['#CAC5FE', '#242633'],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#D6E0FF', font: { size: 12 } } } },
    scales: {
      x: { ticks: { color: '#D6E0FF' }, grid: { color: 'rgba(214, 224, 255, 0.1)' } },
      y: { ticks: { color: '#D6E0FF' }, grid: { color: 'rgba(214, 224, 255, 0.1)' } },
    },
  }

  const handleReset = () => { console.log('Reset functionality to be implemented') }

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-white text-xl">Loading...</div></div>

  return (
    <div className="root-layout">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-200">
            <Image src={user.profileURL || '/default-avatar.png'} alt="Profile" width={80} height={80} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-light-100 text-lg">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handleReset} className="btn-secondary">Reset Progress</button>
          <button className="btn-primary">Settings</button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {['overview', 'analytics', 'activity'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 rounded-full font-semibold capitalize transition-colors ${activeTab === tab ? 'bg-primary-200 text-dark-100' : 'bg-dark-200 text-light-100 hover:bg-dark-300'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card title="Total Interviews" value={scores.length} subtitle="Completed sessions" />
          <Card title="Average Score" value={getAverageScore()} subtitle="Out of 100" />
          <Card title="Best Score" value={getMaxScore()} subtitle="Personal best" />
        </div>
      )}

      {/* {activeTab === 'analytics' && (
        <div className="space-y-8">
          <ChartCard title="Score Progress Over Time"><Line data={avgScoreChartData} options={chartOptions} /></ChartCard>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Category Breakdown"><Bar data={categoryScoresData} options={chartOptions} /></ChartCard>
            <ChartCard title="Overall Performance">
              <div className="h-80 flex items-center justify-center">
                <div className="w-64">
                  <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: '70%', plugins: { legend: { display: false } } }} />
                  <div className="text-center mt-4">
                    <div className="text-3xl font-bold text-white">{getAverageScore()}%</div>
                    <div className="text-light-100">Average Score</div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      )} */}

      {activeTab === 'analytics' && (
  <div className="card-border">
    <div className="card p-6 overflow-x-auto">
      <h3 className="text-white mb-6">Interview History</h3>
      <table className="w-full text-white">
        <thead>
          <tr>
            <th className="p-4 text-left">Interview ID</th>
            <th className="p-4 text-left">Average Score</th>
            <th className="p-4 text-left">Communication Skills</th>
            <th className="p-4 text-left">Technical Knowledge</th>
            <th className="p-4 text-left">Problem-Solving</th>
            <th className="p-4 text-left">Cultural & Role Fit</th>
            <th className="p-4 text-left">Confidence & Clarity</th>
            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.id} className="border-t border-gray-700">
              <td className="p-4">{score.interviewId}</td>
              <td className="p-4">{score.averageScore}</td>
              <td className="p-4">{score['Communication Skills']}</td>
              <td className="p-4">{score['Technical Knowledge']}</td>
              <td className="p-4">{score['Problem-Solving']}</td>
              <td className="p-4">{score['Cultural & Role Fit']}</td>
              <td className="p-4">{score['Confidence & Clarity']}</td>
              <td className="p-4">{new Date(score.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


      {activeTab === 'activity' && <ActivityHeatmap scores={scores} />}
    </div>
  )
}

export default UserDashboard

const Card = ({ title, value, subtitle }: any) => (
  <div className="card-border">
    <div className="card p-6 text-center">
      <h3 className="text-primary-200 mb-4">{title}</h3>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <p className="text-light-100">{subtitle}</p>
    </div>
  </div>
)

const ChartCard = ({ title, children }: any) => (
  <div className="card-border">
    <div className="card p-6">
      <h3 className="text-white mb-6">{title}</h3>
      <div className="h-80">{children}</div>
    </div>
  </div>
)

const ActivityHeatmap = ({ scores }: any) => {
  const getStreakData = () => {
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1)
    const streakMap: { [key: string]: number } = {}
    scores.forEach((score: any) => { const date = new Date(score.createdAt).toDateString(); streakMap[date] = (streakMap[date] || 0) + 1 })
    const streakArray = []
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toDateString()
      streakArray.push({ date: dateStr, count: streakMap[dateStr] || 0 })
    }
    return streakArray
  }

  const streakData = getStreakData()
  const maxCount = Math.max(...streakData.map(d => d.count), 1)

  return (
    <div className="card-border">
      <div className="card p-6">
        <h3 className="text-white mb-6">Interview Activity Heatmap</h3>
        <p className="text-light-100 mb-4">Your interview activity over the past year</p>
        <div className="grid grid-cols-12 gap-1 p-4">
          {streakData.map((day, index) => {
            const intensity = day.count / maxCount
            const opacity = Math.max(intensity, 0.1)
            return <div key={index} className={`w-3 h-3 rounded-sm ${day.count > 0 ? 'bg-primary-200' : 'bg-dark-300'}`} style={{ opacity: day.count > 0 ? opacity : 0.3 }} title={`${day.date}: ${day.count} interviews`} />
          })}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-light-100">Less</div>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity, index) => <div key={index} className="w-3 h-3 rounded-sm bg-primary-200" style={{ opacity }} />)}
          </div>
          <div className="text-sm text-light-100">More</div>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Users, GraduationCap, BadgeCheck, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../api/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => setStats(res.data)).catch(() => {})
  }, [])

  if (!stats) {
    return <div style={{ color: 'var(--text-muted)' }}>Loading dashboard...</div>
  }

  const cards = [
    { label: 'Total Observers', value: stats.total_observers, icon: Users, color: '#4f46e5' },
    { label: 'Trained', value: stats.trained_observers, icon: GraduationCap, color: '#0891b2' },
    { label: 'Badges Issued', value: stats.badges_issued, icon: BadgeCheck, color: '#059669' },
    { label: 'Active', value: stats.active_observers, icon: CheckCircle, color: '#16a34a' },
    { label: 'Pending Approvals', value: stats.pending_approvals, icon: Clock, color: '#d97706' },
    { label: 'Trainings Completed', value: stats.completed_trainings, icon: AlertCircle, color: '#dc2626' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
        Overview of your poll watcher credentialing program
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
      }}>
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 12,
              padding: 20,
              border: '1px solid var(--border)',
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: `${card.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12,
            }}>
              <card.icon size={20} color={card.color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>{card.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

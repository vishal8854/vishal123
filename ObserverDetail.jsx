import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import api from '../api/api'

export default function ObserverDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [observer, setObserver] = useState(null)
  const [badges, setBadges] = useState([])
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    api.get(`/observers/${id}`).then((res) => setObserver(res.data)).catch(() => navigate('/observers'))
    api.get('/badges/', { params: { observer_id: id } }).then((res) => setBadges(res.data)).catch(() => {})
    api.get('/training/enrollments', { params: { observer_id: id } }).then((res) => setEnrollments(res.data)).catch(() => {})
  }, [id])

  if (!observer) return <div style={{ color: 'var(--text-muted)' }}>Loading...</div>

  const statusColors = {
    pending: '#d97706', registered: '#6366f1', trained: '#0891b2',
    certified: '#059669', active: '#16a34a', suspended: '#dc2626', expired: '#6b7280',
  }

  return (
    <div>
      <button
        onClick={() => navigate('/observers')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
          color: 'var(--text-muted)', fontSize: 13, marginBottom: 16, cursor: 'pointer',
        }}
      >
        <ArrowLeft size={16} /> Back to Observers
      </button>

      <div style={{
        background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 24, marginBottom: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
              {observer.first_name} {observer.last_name}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{observer.email}</p>
          </div>
          <span style={{
            padding: '4px 14px', borderRadius: 14, fontSize: 13, fontWeight: 500,
            background: `${(statusColors[observer.status] || '#6b7280')}20`,
            color: statusColors[observer.status] || '#6b7280',
          }}>
            {observer.status}
          </span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20,
          paddingTop: 20, borderTop: '1px solid var(--border)',
        }}>
          {[
            { label: 'Phone', value: observer.phone || '-' },
            { label: 'Party Affiliation', value: observer.party_affiliation || '-' },
            { label: 'Jurisdiction', value: observer.jurisdiction || '-' },
            { label: 'Precinct', value: observer.precinct || '-' },
            { label: 'Address', value: observer.address || '-' },
            { label: 'Registered', value: observer.created_at ? new Date(observer.created_at).toLocaleDateString() : '-' },
          ].map((f) => (
            <div key={f.label}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{f.label}</div>
              <div style={{ fontSize: 14 }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Badges</h2>
          {badges.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No badges issued yet</p>
          ) : (
            badges.map((b) => (
              <div key={b.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{b.badge_number}</span>
                <span style={{
                  marginLeft: 8, padding: '1px 8px', borderRadius: 10, fontSize: 11,
                  background: b.status === 'active' ? 'rgba(22,163,74,0.15)' : 'rgba(107,114,128,0.15)',
                  color: b.status === 'active' ? '#16a34a' : '#6b7280',
                }}>
                  {b.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Training Enrollments</h2>
          {enrollments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No training enrollments</p>
          ) : (
            enrollments.map((e) => (
              <div key={e.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <div>Course #{e.course_id} - {e.status}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Progress: {e.progress_percent || 0}%</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

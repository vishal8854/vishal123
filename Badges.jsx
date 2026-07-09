import { useState, useEffect } from 'react'
import { Plus, ShieldCheck } from 'lucide-react'
import api from '../api/api'

export default function Badges() {
  const [badges, setBadges] = useState([])
  const [observers, setObservers] = useState([])
  const [elections, setElections] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ observer_id: '', election_id: '', badge_number: '', expiration_date: '' })
  const [verifyNum, setVerifyNum] = useState('')
  const [verifyResult, setVerifyResult] = useState(null)

  const loadData = () => {
    api.get('/badges/').then((res) => setBadges(res.data)).catch(() => {})
    api.get('/observers/').then((res) => setObservers(res.data)).catch(() => {})
    api.get('/elections/').then((res) => setElections(res.data)).catch(() => {})
  }

  useEffect(() => { loadData() }, [])

  const handleIssue = async (e) => {
    e.preventDefault()
    try {
      await api.post('/badges/', form)
      setShowForm(false)
      setForm({ observer_id: '', election_id: '', badge_number: '', expiration_date: '' })
      loadData()
    } catch (err) {
      alert(err.response?.data?.detail || 'Error issuing badge')
    }
  }

  const handleVerify = async () => {
    if (!verifyNum) return
    try {
      const res = await api.get(`/badges/verify/${verifyNum}`)
      setVerifyResult(res.data)
    } catch (err) {
      setVerifyResult({ valid: false, error: err.response?.data?.detail || 'Badge not found' })
    }
  }

  const handleRevoke = async (id) => {
    if (!confirm('Revoke this badge?')) return
    await api.put(`/badges/${id}/revoke`)
    loadData()
  }

  const statusColors = { issued: '#6366f1', active: '#16a34a', revoked: '#dc2626', expired: '#6b7280' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Badges</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Issue & manage observer credentials</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
          <Plus size={18} /> Issue Badge
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleIssue} style={{
          background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--border)',
          marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Observer</label>
            <select required value={form.observer_id} onChange={(e) => setForm({ ...form, observer_id: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="">Select observer</option>
              {observers.map((o) => <option key={o.id} value={o.id}>{o.first_name} {o.last_name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Election</label>
            <select required value={form.election_id} onChange={(e) => setForm({ ...form, election_id: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="">Select election</option>
              {elections.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Badge Number *</label>
            <input required value={form.badge_number} onChange={(e) => setForm({ ...form, badge_number: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Expiration Date</label>
            <input type="date" value={form.expiration_date} onChange={(e) => setForm({ ...form, expiration_date: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}>Issue Badge</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input placeholder="Enter badge number to verify..." value={verifyNum} onChange={(e) => setVerifyNum(e.target.value)}
            style={{ flex: 1, maxWidth: 320, padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: 13 }} />
          <button onClick={handleVerify} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={16} /> Verify
          </button>
        </div>
        {verifyResult && (
          <div style={{
            padding: '8px 16px', borderRadius: 6, fontSize: 13, display: 'inline-block',
            background: verifyResult.valid ? 'rgba(22,163,74,0.15)' : 'rgba(239,68,68,0.15)',
            color: verifyResult.valid ? '#16a34a' : '#ef4444',
          }}>
            {verifyResult.valid ? `Valid badge - Status: ${verifyResult.status}` : (verifyResult.error || 'Invalid badge')}
          </div>
        )}
      </div>

      <div style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Badge #', 'Observer ID', 'Election ID', 'Issued', 'Expires', 'Status', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {badges.map((b) => (
              <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: 14 }}>{b.badge_number}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{b.observer_id}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{b.election_id}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{b.issued_date ? new Date(b.issued_date).toLocaleDateString() : '-'}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{b.expiration_date ? new Date(b.expiration_date).toLocaleDateString() : '-'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '2px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500,
                    background: `${(statusColors[b.status] || '#6b7280')}20`,
                    color: statusColors[b.status] || '#6b7280',
                  }}>{b.status}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  {b.status !== 'revoked' && (
                    <button onClick={() => handleRevoke(b.id)}
                      style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px', color: 'var(--danger)', fontSize: 12, cursor: 'pointer' }}>
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {badges.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>No badges issued</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

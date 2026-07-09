import { useState, useEffect } from 'react'
import { Plus, Calendar } from 'lucide-react'
import api from '../api/api'

export default function Elections() {
  const [elections, setElections] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', election_type: '', election_date: '', jurisdiction: '', description: '' })

  const loadElections = () => {
    api.get('/elections/').then((res) => setElections(res.data)).catch(() => {})
  }

  useEffect(() => { loadElections() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    await api.post('/elections/', form)
    setShowForm(false)
    setForm({ name: '', election_type: '', election_date: '', jurisdiction: '', description: '' })
    loadElections()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this election?')) return
    await api.delete(`/elections/${id}`)
    loadElections()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Elections</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Manage election events for credentialing</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
          <Plus size={18} /> Add Election
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} style={{
          background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--border)',
          marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Election Name *</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Type</label>
            <select value={form.election_type} onChange={(e) => setForm({ ...form, election_type: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="">Select type</option>
              <option value="general">General</option>
              <option value="primary">Primary</option>
              <option value="special">Special</option>
              <option value="municipal">Municipal</option>
              <option value="referendum">Referendum</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Election Date *</label>
            <input required type="date" value={form.election_date} onChange={(e) => setForm({ ...form, election_date: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Jurisdiction</label>
            <input value={form.jurisdiction} onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13, minHeight: 60 }} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}>Create Election</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16,
      }}>
        {elections.map((e) => (
          <div key={e.id} style={{
            background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Calendar size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(e.election_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{e.name}</h3>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              {e.election_type && <span>{e.election_type}</span>}
              {e.jurisdiction && <span>{e.jurisdiction}</span>}
              <span style={{
                padding: '1px 8px', borderRadius: 8, fontWeight: 500,
                background: e.status === 'upcoming' ? 'rgba(79,70,229,0.15)' : 'rgba(107,114,128,0.15)',
                color: e.status === 'upcoming' ? '#4f46e5' : '#6b7280',
              }}>{e.status}</span>
            </div>
            {e.description && <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{e.description}</p>}
            <div style={{ marginTop: 12 }}>
              <button onClick={() => handleDelete(e.id)}
                style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 12px', color: 'var(--danger)', fontSize: 12, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {elections.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>
            No elections scheduled yet
          </div>
        )}
      </div>
    </div>
  )
}

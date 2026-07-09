import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Eye } from 'lucide-react'
import api from '../api/api'

export default function Observers() {
  const [observers, setObservers] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', party_affiliation: '',
    jurisdiction: '', precinct: '', address: '', notes: '',
  })
  const navigate = useNavigate()

  const loadObservers = () => {
    api.get('/observers/', { params: { search } }).then((res) => setObservers(res.data)).catch(() => {})
  }

  useEffect(() => { loadObservers() }, [search])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/observers/', form)
      setShowForm(false)
      setForm({ first_name: '', last_name: '', email: '', phone: '', party_affiliation: '', jurisdiction: '', precinct: '', address: '', notes: '' })
      loadObservers()
    } catch (err) {
      alert(err.response?.data?.detail || 'Error creating observer')
    }
  }

  const statusColors = {
    pending: '#d97706',
    registered: '#6366f1',
    trained: '#0891b2',
    certified: '#059669',
    active: '#16a34a',
    suspended: '#dc2626',
    expired: '#6b7280',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Observers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{observers.length} registered observers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--primary)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <Plus size={18} />
          Add Observer
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          style={{
            background: 'var(--bg-card)',
            borderRadius: 12,
            padding: 24,
            border: '1px solid var(--border)',
            marginBottom: 24,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>First Name *</label>
            <input required value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Last Name *</label>
            <input required value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Email *</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Party Affiliation</label>
            <input value={form.party_affiliation} onChange={(e) => setForm({ ...form, party_affiliation: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Jurisdiction</label>
            <input value={form.jurisdiction} onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Precinct</label>
            <input value={form.precinct} onChange={(e) => setForm({ ...form, precinct: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Address</label>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600, fontSize: 14 }}>
              Create Observer
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 14 }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            placeholder="Search observers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: 13,
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 12,
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Email', 'Party', 'Jurisdiction', 'Status', ''].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {observers.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{o.first_name} {o.last_name}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{o.email}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{o.party_affiliation || '-'}</td>
                <td style={{ padding: '12px 16px', fontSize: 13 }}>{o.jurisdiction || '-'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 500,
                    background: `${(statusColors[o.status] || '#6b7280')}20`,
                    color: statusColors[o.status] || '#6b7280',
                  }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    onClick={() => navigate(`/observers/${o.id}`)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="View details"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {observers.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>
                  No observers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import api from '../api/api'

export default function Training() {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [observers, setObservers] = useState([])
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showEnrollForm, setShowEnrollForm] = useState(false)
  const [courseForm, setCourseForm] = useState({ title: '', description: '', category: '', duration_hours: '' })
  const [enrollForm, setEnrollForm] = useState({ observer_id: '', course_id: '' })

  const loadData = () => {
    api.get('/training/courses').then((res) => setCourses(res.data)).catch(() => {})
    api.get('/training/enrollments').then((res) => setEnrollments(res.data)).catch(() => {})
    api.get('/observers/').then((res) => setObservers(res.data)).catch(() => {})
  }

  useEffect(() => { loadData() }, [])

  const handleCreateCourse = async (e) => {
    e.preventDefault()
    await api.post('/training/courses', { ...courseForm, duration_hours: parseFloat(courseForm.duration_hours) || null })
    setShowCourseForm(false)
    setCourseForm({ title: '', description: '', category: '', duration_hours: '' })
    loadData()
  }

  const handleEnroll = async (e) => {
    e.preventDefault()
    await api.post('/training/enroll', enrollForm)
    setShowEnrollForm(false)
    setEnrollForm({ observer_id: '', course_id: '' })
    loadData()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Training</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Course management & observer enrollment</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowEnrollForm(!showEnrollForm)}
            style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: 14, fontWeight: 600 }}>
            Enroll Observer
          </button>
          <button onClick={() => setShowCourseForm(!showCourseForm)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
            <Plus size={18} /> New Course
          </button>
        </div>
      </div>

      {showCourseForm && (
        <form onSubmit={handleCreateCourse} style={{
          background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--border)',
          marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Title *</label>
            <input required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Description</label>
            <textarea value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13, minHeight: 80 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Category</label>
            <input value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Duration (hours)</label>
            <input type="number" step="0.5" value={courseForm.duration_hours} onChange={(e) => setCourseForm({ ...courseForm, duration_hours: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}>Create Course</button>
            <button type="button" onClick={() => setShowCourseForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)' }}>Cancel</button>
          </div>
        </form>
      )}

      {showEnrollForm && (
        <form onSubmit={handleEnroll} style={{
          background: 'var(--bg-card)', borderRadius: 12, padding: 24, border: '1px solid var(--border)',
          marginBottom: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
        }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Observer</label>
            <select value={enrollForm.observer_id} onChange={(e) => setEnrollForm({ ...enrollForm, observer_id: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="">Select observer</option>
              {observers.map((o) => <option key={o.id} value={o.id}>{o.first_name} {o.last_name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Course</label>
            <select value={enrollForm.course_id} onChange={(e) => setEnrollForm({ ...enrollForm, course_id: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: 13 }}>
              <option value="">Select course</option>
              {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12 }}>
            <button type="submit" style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}>Enroll</button>
            <button type="button" onClick={() => setShowEnrollForm(false)} style={{ padding: '10px 24px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)' }}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Courses ({courses.length})</h2>
          {courses.map((c) => (
            <div key={c.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {c.category && `${c.category} · `}{c.duration_hours ? `${c.duration_hours}h` : ''}
              </div>
              {c.description && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>{c.description}</div>}
            </div>
          ))}
          {courses.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No courses yet</p>}
        </div>

        <div style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Enrollments ({enrollments.length})</h2>
          {enrollments.map((e) => (
            <div key={e.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
              <div>Observer #{e.observer_id} → Course #{e.course_id}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                <span>Status: {e.status}</span>
                <span>Progress: {e.progress_percent || 0}%</span>
              </div>
            </div>
          ))}
          {enrollments.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No enrollments yet</p>}
        </div>
      </div>
    </div>
  )
}

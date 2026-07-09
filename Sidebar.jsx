import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard, Users, GraduationCap, BadgeCheck, Vote, LogOut, ChevronLeft, Menu, ShieldCheck
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/observers', label: 'Observers', icon: Users },
  { to: '/training', label: 'Training', icon: GraduationCap },
  { to: '/badges', label: 'Badges', icon: BadgeCheck },
  { to: '/elections', label: 'Elections', icon: Vote },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{
        width: collapsed ? 64 : 'var(--sidebar-width)',
        background: 'var(--secondary)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s',
        borderRight: '1px solid var(--border)',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 12px',
        borderBottom: '1px solid var(--border)',
        minHeight: 64,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontWeight: 700,
          fontSize: 14,
          color: '#fff',
        }}>
          CC
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Cap Corporate</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Poll Watcher Creds</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 16px',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(233,69,96,0.1)' : 'transparent',
              borderRight: isActive ? '3px solid var(--primary)' : '3px solid transparent',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            })}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid var(--border)', padding: '12px 0' }}>
        {!collapsed && user && (
          <div style={{ padding: '0 16px 8px', fontSize: 12, color: 'var(--text-muted)' }}>
            {user.full_name || user.username}
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px',
            width: '100%',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          right: -12,
          top: '50%',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--border)',
          border: '2px solid var(--bg-dark)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        {collapsed ? <Menu size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  )
}

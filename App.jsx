import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Observers from './pages/Observers'
import ObserverDetail from './pages/ObserverDetail'
import Training from './pages/Training'
import Badges from './pages/Badges'
import Elections from './pages/Elections'
import { useAuth } from './context/AuthContext'

function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        padding: 32,
        maxWidth: 'calc(100vw - var(--sidebar-width))',
      }}>
        {children}
      </main>
    </div>
  )
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-muted)' }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/observers" element={<PrivateRoute><Observers /></PrivateRoute>} />
        <Route path="/observers/:id" element={<PrivateRoute><ObserverDetail /></PrivateRoute>} />
        <Route path="/training" element={<PrivateRoute><Training /></PrivateRoute>} />
        <Route path="/badges" element={<PrivateRoute><Badges /></PrivateRoute>} />
        <Route path="/elections" element={<PrivateRoute><Elections /></PrivateRoute>} />
      </Routes>
    </AppLayout>
  )
}

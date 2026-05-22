'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Users, Heart, MessageSquare, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [stats, setStats] = useState({ wishes: 0, guests: 0 })
  const [wishes, setWishes] = useState<any[]>([])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple demo auth
    if (password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
        const fetchData = async () => {
            const { data: wishesData } = await supabase.from('wishes').select('*')
            if (wishesData) {
                setWishes(wishesData)
                setStats({ 
                    wishes: wishesData.length,
                    guests: 0 // In a real app, calculate from guests table
                })
            }
        }
        fetchData()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center p-6">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-primary p-12 rounded-sm shadow-2xl"
        >
          <h1 className="font-serif text-3xl mb-8 text-center text-dark">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-xs uppercase tracking-widest text-dark/40">Access Code</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gold/30 py-3 focus:outline-none focus:border-gold transition-colors font-serif text-xl"
                placeholder="••••••"
              />
            </div>
            <Button type="submit" variant="gold" className="w-full">Sign In</Button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary text-dark">
      <nav className="border-b border-dark/5 p-6 flex justify-between items-center">
         <h1 className="font-serif text-2xl tracking-wide">Wedding Admin</h1>
         <Button variant="ghost" onClick={() => setIsAuthenticated(false)}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
         </Button>
      </nav>

      <main className="p-8 md:p-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatCard icon={<Users className="w-6 h-6" />} label="Total Guests" value={stats.guests} color="bg-blue-50 text-blue-600" />
            <StatCard icon={<Heart className="w-6 h-6" />} label="Total Wishes" value={stats.wishes} color="bg-pink-50 text-pink-600" />
            <StatCard icon={<MessageSquare className="w-6 h-6" />} label="Attendance Rate" value="0%" color="bg-green-50 text-green-600" />
        </div>

        <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-dark/5">
            <div className="p-6 border-b border-dark/5 flex justify-between items-center">
                <h3 className="font-serif text-xl">Recent Wishes</h3>
                <Button size="sm" variant="outline">Export CSV</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark/5">
                        <tr>
                            <th className="p-4 font-sans text-xs uppercase tracking-widest text-dark/40">Name</th>
                            <th className="p-4 font-sans text-xs uppercase tracking-widest text-dark/40">Message</th>
                            <th className="p-4 font-sans text-xs uppercase tracking-widest text-dark/40">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark/5">
                        {wishes.map((wish) => (
                            <tr key={wish.id} className="hover:bg-dark/5 transition-colors">
                                <td className="p-4 font-serif text-lg">{wish.name}</td>
                                <td className="p-4 text-sm text-dark/60">{wish.message}</td>
                                <td className="p-4 text-xs text-dark/40">{new Date(wish.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  )
}

const StatCard = ({ icon, label, value, color }: any) => (
    <div className="bg-white p-8 rounded-sm shadow-lg border border-dark/5">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${color}`}>
            {icon}
        </div>
        <p className="font-sans text-xs uppercase tracking-widest text-dark/40 mb-1">{label}</p>
        <p className="font-serif text-3xl text-dark">{value}</p>
    </div>
)

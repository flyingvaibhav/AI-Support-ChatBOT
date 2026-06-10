'use client'

import axios from 'axios'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function DashboardClient({ ownerId }: { ownerId: string }) {

  const navigate = useRouter()

  const [businessName, setBusinessName] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [knowledge, setKnowledge] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [conversation, setConversation] = useState<any | null>(null)
  const [loadingConvo, setLoadingConvo] = useState(false)

  // 🔥 Save Settings

  const handleSettings = async () => {
    setLoading(true)

    try {
      const result = await axios.post('/api/settings', {
        ownerId,
        businessName,
        supportEmail,
        knowledge
      })

      console.log(result.data)

      setSaved(true)
      setLoading(false)

      setTimeout(() => {
        setSaved(false)
      }, 3000)

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // 🔥 Get Existing Details
  useEffect(() => {
    if (!ownerId) return

    const handleGetDetails = async () => {
      try {
        const result = await axios.post('/api/settings', {
          ownerId
        })

        setBusinessName(result.data.businessName ?? "")
        setSupportEmail(result.data.supportEmail ?? "")
        setKnowledge(result.data.knowledge ?? "")

      } catch (error) {
        console.log(error)
      }
    }

    handleGetDetails()

  }, [ownerId])

  // Fetch conversation history
  useEffect(() => {
    if (!ownerId) return

    const fetchConversation = async () => {
      setLoadingConvo(true)
      try {
        const res = await axios.get('/api/conversations', { params: { ownerId } })
        setConversation(res.data)
      } catch (err) {
        console.log('fetch conversation error', err)
      } finally {
        setLoadingConvo(false)
      }
    }

    fetchConversation()
  }, [ownerId, saved])

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>

      {/* Top Navbar */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
      >
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='text-lg font-semibold tracking-tight'>
            Support <span className='text-zinc-400'>AI</span>
          </div>

          <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition-colors'>
            Embed ChatBot
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className='flex justify-center px-4 py-14 mt-20'>
        <motion.div className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'>

          <div className='mb-12'>
            <h1 className='text-2xl font-semibold'>ChatBot Settings</h1>
            <p className='text-zinc-500 mt-1'>
              Manage your AI chatbot knowledge and business details
            </p>
          </div>

          {/* Business Details */}
          <div className='mb-10'>
            <h2 className='text-lg font-medium mb-4'>Business Details</h2>

            <div className='space-y-4'>
              <input
                type="text"
                placeholder='Business Name'
                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />

              <input
                type="text"
                placeholder='Support Email'
                className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Knowledge Section */}
          <div className='mb-10'>
            <h2 className='text-lg font-medium mb-4'>Knowledge</h2>

            <p className='text-sm text-zinc-500 mb-4'>
              Add FAQs, policies, delivery info, refunds, etc.
            </p>

            <textarea
              className='w-full h-52 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80'
              placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours`}
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className='flex items-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              onClick={handleSettings}
              className='px-6 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition disabled:opacity-60'
            >
              {loading ? 'Saving...' : 'Save'}
            </motion.button>

            {saved && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className='ml-4 text-sm text-green-600'
              >
                Settings saved!
              </motion.span>
            )}
          </div>

          {/* Conversation History */}
          <div className='mt-8'>
            <h2 className='text-lg font-medium mb-4'>Conversation History</h2>

            {loadingConvo ? (
              <div className='text-sm text-zinc-500'>Loading...</div>
            ) : conversation && conversation.messages && conversation.messages.length ? (
              <div className='space-y-3 max-h-64 overflow-y-auto'>
                {conversation.messages.slice().reverse().slice(0, 50).map((m: any, idx: number) => (
                  <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <div
                      className={`inline-block px-4 py-2 rounded-xl ${m.role === 'user' ? 'bg-zinc-100' : 'bg-black text-white'}`}
                    >
                      <div className='text-sm'>{m.text}</div>
                      <div className='text-xs text-zinc-400 mt-1'>
                        {new Date(m.createdAt || conversation.updatedAt || conversation.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-sm text-zinc-500'>No conversations yet.</div>
            )}
          </div>

        </motion.div>
      </div>

    </div>
  )
}

export default DashboardClient

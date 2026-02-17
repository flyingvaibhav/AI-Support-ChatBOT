'use client'
import axios from 'axios'
import { AnimatePresence, scale } from 'framer-motion'


import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



function DashboardClient({ownerId}: {ownerId: string }) {

  const naviagte = useRouter()
  const [businessName, setBusinessName] =useState(' ')
const [supportEmail, setSupportEmail] =useState(' ')
const [knowledge, setKnowledge] =useState(' ')
const[loading, setLoading] = useState(false)


const handleSettings=async()=>{
   try {
    const result = await axios.post('/api/settings', {
      ownerId,
      businessName,
      supportEmail,
      knowledge
    })
console.log(result.data)
setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
}



  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900 '> 
    <motion.div
    initial={{y:-20}}
    animate={{y:0}}
    transition={{duration:0.7}}

    className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
    >
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <div className='text-lg font-semibold tracking-tight'>Support <span className='text-zinc-400'>AI</span></div>
      <button className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition-colors'>Embed ChatBot</button>
        
      </div>
    </motion.div>

<div className='flex justify-center px-4 py-14 mt-20'>
  <motion.div
    className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'
  >
    <div className='mb-12'>
      <h1 className='text-2xl font-semibold'>ChatBot Settings</h1>
      <p className='text-zinc-500 mt-1'>Manage your AI chatbot knowledge and business details</p>
    </div>

<div className='mb-10'>
  <h1 className='text-lg font-medium mb-4'>Business Details</h1>
  <div className='space-y-4'>
    <input 
      type="text" 
      className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' 
      placeholder='Business Name' value={businessName} onChange={(e)=>setBusinessName(e.target.value)}
    />
    <input 
      type="text" 
      className='w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' 
      placeholder='Support Email'  value={supportEmail} onChange={(e)=>setSupportEmail(e.target.value)}
    />
  </div>
</div>

<div className='mb-10'>
  <h1 className='text-lg font-medium mb-4'>Knowledge</h1>
  <p className='text-sm text-zinc-500 mb-4'>Add FAQs, policies, delivery info, refunds, etc.</p>
  <div className='space-y-4'>
    <textarea 
      className='w-full h-54 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80' 
      placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours` }
      onChange={(e)=>setKnowledge(e.target.value)}value={knowledge}
    />
  </div>
</div>


<div className='flex items-center'>

  <motion.button
    whileHover={{scale:1.05}}
    whileTap={{scale:0.97}}
    disabled={loading}
    onClick={handleSettings}
    className='px-6 py-3 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/90 transition disabled:opacity-60'
  >
    {loading ? 'Saving...' : 'Save'}
  </motion.button>
</div>

  </motion.div>
</div>

       </div>
  )
}

export default DashboardClient
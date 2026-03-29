import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../App'

const STORAGE_KEY = 'escudo-checklist'
const DATE_KEY = 'escudo-launch-date'

function formatDate(date, lang) {
  if (!date) return ''
  return new Date(date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d
}

function Checklist() {
  const { t, lang } = useApp()
  const c = t.checklist
  const [launchDate, setLaunchDate] = useState(() => localStorage.getItem(DATE_KEY) || '')
  const [activePhase, setActivePhase] = useState('pre')
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
  })

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)) }, [checked])
  useEffect(() => { if (launchDate) localStorage.setItem(DATE_KEY, launchDate) }, [launchDate])

  const toggleCheck = useCallback((key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const phases = {
    pre: [
      { key: 'pre90', data: c.pre90, offset: -90 },
      { key: 'pre60', data: c.pre60, offset: -60 },
      { key: 'pre45', data: c.pre45, offset: -45 },
      { key: 'pre30', data: c.pre30, offset: -30 },
    ],
    launch: [{ key: 'month0_2', data: c.month0_2, offset: 0 }],
    post: [{ key: 'month3plus', data: c.month3plus, offset: 90 }],
  }

  const getDateLabel = (offset) => {
    if (!launchDate) return ''
    return formatDate(addDays(launchDate, offset), lang)
  }

  const activeGroups = phases[activePhase] || []

  return (
    <section className="checklist-section section" id="checklist">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <div className="section-divider" />
          <h2 className="section-title">{c.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{c.sectionSubtitle}</p>
        </motion.div>
        <motion.div className="date-input-wrapper" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <label htmlFor="launch-date">{c.inputLabel}</label>
          <input type="date" id="launch-date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} />
        </motion.div>
        <div className="phase-tabs">
          <button className={`phase-tab ${activePhase === 'pre' ? 'active' : ''}`} onClick={() => setActivePhase('pre')}>{c.phases.pre}</button>
          <button className={`phase-tab ${activePhase === 'launch' ? 'active' : ''}`} onClick={() => setActivePhase('launch')}>{c.phases.launch}</button>
          <button className={`phase-tab ${activePhase === 'post' ? 'active' : ''}`} onClick={() => setActivePhase('post')}>{c.phases.post}</button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activePhase} className="checklist-groups" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
            {activeGroups.map((group) => (
              <div className="checklist-group" key={group.key}>
                <div className="checklist-group-header">
                  <span className="checklist-group-title">{group.data.title}</span>
                  {launchDate && <span className="checklist-group-date">{getDateLabel(group.offset)}</span>}
                </div>
                <div className="checklist-items">
                  {group.data.items.map((item, i) => {
                    const itemKey = `${group.key}-${i}`
                    return (
                      <div className="checklist-item" key={itemKey}>
                        <input type="checkbox" id={itemKey} checked={!!checked[itemKey]} onChange={() => toggleCheck(itemKey)} />
                        <label htmlFor={itemKey}>{item}</label>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <div className="saved-indicator">{c.savedMsg}</div>
      </div>
    </section>
  )
}

export default Checklist

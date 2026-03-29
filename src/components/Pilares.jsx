import { motion } from 'framer-motion'
import { useApp } from '../App'

function Pilares() {
  const { t } = useApp()
  const p = t.pilares
  return (
    <section className="pilares section" id="pilares">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <div className="section-divider" />
          <h2 className="section-title">{p.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{p.sectionSubtitle}</p>
        </motion.div>
        <div className="pilares-grid">
          {p.cards.map((card, i) => (
            <motion.div className="pilar-card" key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <div className="icon-wrapper">{card.icon}</div>
              <h3>{card.title}</h3>
              <div className="pilar-subtitle">{card.subtitle}</div>
              <p>{card.description}</p>
              <div className="tip">{card.tip}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pilares

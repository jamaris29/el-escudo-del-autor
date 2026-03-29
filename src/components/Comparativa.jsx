import { motion } from 'framer-motion'
import { useApp } from '../App'

function Comparativa() {
  const { t } = useApp()
  const c = t.comparativa
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } }),
  }
  return (
    <section className="comparativa section" id="comparativa">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <div className="section-divider" />
          <h2 className="section-title">{c.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{c.sectionSubtitle}</p>
        </motion.div>
        <div className="comparativa-grid">
          <motion.div className="comparativa-card editorial-card" custom={0} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div className="card-header">
              <span className="card-title">🏢 {c.editorial.title}</span>
              <span className="timeframe">{c.editorial.timeframe}</span>
            </div>
            <ul>{c.editorial.items.map((item, i) => <li key={i}><span className="bullet" />{item}</li>)}</ul>
            <div className="footnote">{c.editorial.footnote}</div>
          </motion.div>
          <motion.div className="comparativa-card autor-card" custom={1} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <div className="card-header">
              <span className="card-title">✍️ {c.autor.title}</span>
              <span className="timeframe">{c.autor.timeframe}</span>
            </div>
            <ul>{c.autor.items.map((item, i) => <li key={i}><span className="bullet" />{item}</li>)}</ul>
            <div className="footnote">{c.autor.footnote}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Comparativa

import { motion } from 'framer-motion'
import { useApp } from '../App'

function Recursos() {
  const { t } = useApp()
  const r = t.recursos
  return (
    <section className="recursos section" id="recursos">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
          <div className="section-divider" />
          <h2 className="section-title">{r.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{r.sectionSubtitle}</p>
        </motion.div>
        <div className="referencias-list">
          {r.cards.map((card, i) => (
            <motion.div className="referencia-card" key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: i * 0.15 }}>
              <div className="referencia-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="referencia-body">
                <div className="referencia-meta">
                  <span className="referencia-source">{card.source}</span>
                  <span className="referencia-topic">— {card.topic}</span>
                </div>
                <h3 className="referencia-title">{card.title}</h3>
                <p className="referencia-desc">{card.description}</p>
                <a className="referencia-link" href={card.link} target="_blank" rel="noopener noreferrer">{card.linkText}</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recursos

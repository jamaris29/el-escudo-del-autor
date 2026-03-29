import { motion } from 'framer-motion'
import { useApp } from '../App'

const categoryColors = {
  Evidencia:   '#DC2626',
  Evidence:    '#DC2626',
  Estrategia:  '#7C3AED',
  Strategy:    '#7C3AED',
  'T\u00e1ctica': '#0891B2',
  Tactic:      '#0891B2',
  'Metodolog\u00eda': '#059669',
  Methodology: '#059669',
}

function Recursos() {
  const { t } = useApp()
  const r = t.recursos

  return (
    <section className="recursos section" id="recursos">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-divider" />
          <h2 className="section-title">{r.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{r.sectionSubtitle}</p>
        </motion.div>

        <div className="referencias-grid">
          {r.cards.map((card, i) => {
            const accentColor = categoryColors[card.category] || 'var(--color-violet)'
            return (
              <motion.div
                className="referencia-doc"
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ '--accent': accentColor }}
              >
                <div className="doc-category-bar">
                  <span className="doc-category" style={{ color: accentColor }}>{card.category}</span>
                  <span className="doc-category-label">{card.categoryLabel}</span>
                </div>
                <div className="doc-body">
                  <p className="doc-source">— {card.source}</p>
                  <h3 className="doc-title">{card.title}</h3>
                  <p className="doc-desc">{card.description}</p>
                  <a className="doc-link" href={card.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>
                    {card.linkText}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Recursos

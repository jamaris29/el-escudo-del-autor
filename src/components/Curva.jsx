import { motion } from 'framer-motion'
import { useApp } from '../App'

const curvaData = {
  es: {
    sectionTitle: 'La Curva de Aprendizaje',
    sectionSubtitle: 'Cada autor pasa por etapas. Conocerlas te da ventaja.',
    stages: [
      {
        number: '01',
        label: 'Inconscientemente incompetente',
        description: 'No sabes lo que no sabes. Publicas sin estrategia y te preguntas por qué no funciona.',
        icon: '🌱',
      },
      {
        number: '02',
        label: 'Conscientemente incompetente',
        description: 'Descubres las brechas. Es incómodo, pero es el primer paso real hacia el dominio.',
        icon: '🔍',
      },
      {
        number: '03',
        label: 'Conscientemente competente',
        description: 'Aplicas las estrategias con esfuerzo. Los resultados llegan cuando eres consistente.',
        icon: '⚙️',
      },
      {
        number: '04',
        label: 'Inconscientemente competente',
        description: 'Lo que era difícil ahora es natural. Tu marca funciona sola porque internalizaste el sistema.',
        icon: '🛡️',
      },
    ],
  },
  en: {
    sectionTitle: 'The Learning Curve',
    sectionSubtitle: 'Every author goes through stages. Knowing them gives you an edge.',
    stages: [
      {
        number: '01',
        label: 'Unconsciously Incompetent',
        description: "You don't know what you don't know. You publish without strategy and wonder why it's not working.",
        icon: '🌱',
      },
      {
        number: '02',
        label: 'Consciously Incompetent',
        description: 'You discover the gaps. It\'s uncomfortable, but it\'s the first real step toward mastery.',
        icon: '🔍',
      },
      {
        number: '03',
        label: 'Consciously Competent',
        description: 'You apply the strategies with effort. Results come when you stay consistent.',
        icon: '⚙️',
      },
      {
        number: '04',
        label: 'Unconsciously Competent',
        description: 'What was hard is now natural. Your brand runs on its own because you internalized the system.',
        icon: '🛡️',
      },
    ],
  },
}

function Curva() {
  const { lang } = useApp()
  const c = curvaData[lang] || curvaData.es

  return (
    <section className="curva section" id="curva">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-divider" />
          <h2 className="section-title">{c.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{c.sectionSubtitle}</p>
        </motion.div>

        <div className="curva-stages">
          {c.stages.map((stage, i) => (
            <motion.div
              className="curva-stage"
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="curva-icon">{stage.icon}</div>
              <div className="curva-content">
                <span className="curva-number">{stage.number}</span>
                <h3 className="curva-label">{stage.label}</h3>
                <p className="curva-description">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Curva

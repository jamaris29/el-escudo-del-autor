import { motion } from 'framer-motion'
import { useApp } from '../App'

function Mentalidad() {
  const { t } = useApp()
  const m = t.mentalidad
  return (
    <section className="mentalidad section">
      <div className="container">
        <div className="mentalidad-inner">
          <motion.blockquote initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}>{m.quote1}</motion.blockquote>
          <motion.blockquote className="secondary" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.2 }}>{m.quote2}</motion.blockquote>
          <motion.p className="mentalidad-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7, delay: 0.4 }}>{m.subtitle}</motion.p>
          <motion.div className="decorative-line" initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} />
        </div>
      </div>
    </section>
  )
}

export default Mentalidad

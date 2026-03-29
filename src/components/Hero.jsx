import { motion } from 'framer-motion'
import { useApp } from '../App'

function Hero() {
  const { t } = useApp()

  return (
    <section className="hero" id="hero">
      <div className="hero-bg-pattern" />
      <div className="hero-content">
        <motion.div className="hero-badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <span className="dot" />
          {t.hero.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          {t.hero.title1}<br />
          <span className="highlight">{t.hero.title2}</span>
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          {t.hero.subtitle}
        </motion.p>
        <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
          <a href="#checklist" className="btn btn-primary">{t.hero.cta}</a>
          <a href="#pilares" className="btn btn-secondary">{t.hero.ctaSecondary}</a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

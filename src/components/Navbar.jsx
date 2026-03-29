import { useState } from 'react'
import { useApp } from '../App'

function Navbar() {
  const { t, scrollY, lang, setLang, theme, toggleTheme } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="logo-icon">🛡️</span>
          <span>El Escudo</span>
        </a>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <a href="#comparativa" onClick={() => setMenuOpen(false)}>{t.nav.comparativa}</a>
            <a href="#checklist" onClick={() => setMenuOpen(false)}>{t.nav.checklist}</a>
            <a href="#pilares" onClick={() => setMenuOpen(false)}>{t.nav.pilares}</a>
            <a href="#recursos" onClick={() => setMenuOpen(false)}>{t.nav.recursos}</a>
          </div>
        </div>

        <div className="navbar-controls">
          <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>
            🇪🇸 ES
          </button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
            🇺🇸 EN
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { useState, useEffect, createContext, useContext } from 'react'
import translations from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Comparativa from './components/Comparativa'
import Mentalidad from './components/Mentalidad'
import Checklist from './components/Checklist'
import Pilares from './components/Pilares'
import Curva from './components/Curva'
import Recursos from './components/Recursos'
import Footer from './components/Footer'

export const AppContext = createContext()

export function useApp() {
  return useContext(AppContext)
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('escudo-lang') || 'es')
  const [theme, setTheme] = useState(() => localStorage.getItem('escudo-theme') || 'light')
  const [scrollY, setScrollY] = useState(0)

  const t = translations[lang]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('escudo-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('escudo-lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t, scrollY }}>
      <div className="app">
        <Navbar />
        <Hero />
        <Comparativa />
        <Mentalidad />
        <Checklist />
        <Pilares />
        <Curva />
        <Recursos />
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

export default App

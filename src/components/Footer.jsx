import { useApp } from '../App'

function Footer() {
  const { t } = useApp()
  const f = t.footer
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-tagline">{f.tagline}</p>
        <p className="footer-copyright">{f.copyright}</p>
        <button className="footer-back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {f.backToTop}
        </button>
      </div>
    </footer>
  )
}

export default Footer

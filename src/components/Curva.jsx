import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '../App'

function Curva() {
  const { t, theme } = useApp()
  const cv = t.curva
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true, margin: '-100px' })

  // SVG dimensions
  const W = 760
  const H = 300
  const padL = 50
  const padR = 30
  const padT = 30
  const padB = 50
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  // Data points (month 0 to 8)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // Editorial effort: high at start, drops fast
  const editorial = [95, 85, 50, 15, 8, 5, 3, 2, 2]
  // Author effort: starts low, ramps up
  const autor = [10, 20, 35, 55, 70, 80, 85, 90, 92]

  const toX = (month) => padL + (month / 8) * chartW
  const toY = (val) => padT + chartH - (val / 100) * chartH

  const makePath = (data) => {
    // Create smooth curve with cubic bezier
    let d = `M ${toX(0)},${toY(data[0])}`
    for (let i = 1; i < data.length; i++) {
      const x0 = toX(i - 1)
      const y0 = toY(data[i - 1])
      const x1 = toX(i)
      const y1 = toY(data[i])
      const cx = (x0 + x1) / 2
      d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`
    }
    return d
  }

  const editorialPath = makePath(editorial)
  const autorPath = makePath(autor)

  const textColor = theme === 'dark' ? '#A1A1AA' : '#6B7280'
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const violetColor = '#7C3AED'
  const primaryColor = theme === 'dark' ? '#F0F0F2' : '#000000'

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
          <h2 className="section-title">{cv.sectionTitle}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{cv.sectionSubtitle}</p>
        </motion.div>

        <div className="curva-chart-container" ref={chartRef}>
          <div className="curva-chart">
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
              {/* Grid lines */}
              {[0, 25, 50, 75, 100].map((v) => (
                <line
                  key={v}
                  x1={padL}
                  y1={toY(v)}
                  x2={W - padR}
                  y2={toY(v)}
                  stroke={gridColor}
                  strokeWidth="1"
                />
              ))}

              {/* Month labels */}
              {months.map((m) => (
                <text
                  key={m}
                  x={toX(m)}
                  y={H - 10}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="11"
                  fontFamily="Inter, sans-serif"
                >
                  {cv.month} {m}
                </text>
              ))}

              {/* Y-axis labels */}
              {[0, 50, 100].map((v) => (
                <text
                  key={v}
                  x={padL - 10}
                  y={toY(v) + 4}
                  textAnchor="end"
                  fill={textColor}
                  fontSize="10"
                  fontFamily="Inter, sans-serif"
                >
                  {v}%
                </text>
              ))}

              {/* Zones background */}
              <rect
                x={padL}
                y={padT}
                width={toX(2) - padL}
                height={chartH}
                fill={`${violetColor}08`}
                rx="4"
              />

              {/* Editorial curve */}
              <motion.path
                d={editorialPath}
                fill="none"
                stroke={violetColor}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              {/* Author curve */}
              <motion.path
                d={autorPath}
                fill="none"
                stroke={primaryColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* Data dots - editorial */}
              {editorial.map((v, i) => (
                <motion.circle
                  key={`e-${i}`}
                  cx={toX(i)}
                  cy={toY(v)}
                  r="4"
                  fill={violetColor}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                />
              ))}

              {/* Data dots - author */}
              {autor.map((v, i) => (
                <motion.circle
                  key={`a-${i}`}
                  cx={toX(i)}
                  cy={toY(v)}
                  r="4"
                  fill={primaryColor}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>

          <div className="curva-legend">
            <div className="legend-item">
              <span className="legend-dot editorial" />
              {cv.labelEditorial}
            </div>
            <div className="legend-item">
              <span className="legend-dot autor" />
              {cv.labelAutor}
            </div>
          </div>

          <div className="curva-zones">
            <motion.div
              className="zone-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 style={{ color: violetColor }}>📈 {cv.zonaEditorial}</h4>
              <p>{cv.month} 0-2</p>
            </motion.div>
            <motion.div
              className="zone-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4>🎯 {cv.zonaAutor}</h4>
              <p>{cv.month} 3+</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Curva

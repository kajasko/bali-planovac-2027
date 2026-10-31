import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Map as MapIcon } from 'lucide-react'
import { mustSees, lodgings } from './data'

const colors: Record<string, string> = { uluwatu: '#0ea5e9', ubud: '#16a34a', east: '#ea580c' }
const areaName: Record<string, string> = { uluwatu: 'Uluwatu', ubud: 'Ubud', east: 'Východ (Abang/Sidemen)' }

const coords: Record<string, [number, number]> = {
  'padang-padang': [-8.8111, 115.1033], bingin: [-8.8058, 115.1131], 'uluwatu-temple': [-8.8291, 115.0849],
  'single-fin': [-8.8156, 115.0884], 'beach-volley-uluwatu': [-8.8020, 115.1180],
  campuhan: [-8.5035, 115.2531], tegallalang: [-8.4343, 115.2790], 'monkey-forest': [-8.5188, 115.2585],
  'tirta-empul': [-8.4153, 115.3153], waterfall: [-8.5440, 115.2900], 'batur-trek': [-8.2421, 115.3751],
  'scooter-villages': [-8.4600, 115.2300],
  sidemen: [-8.4790, 115.4400], 'tirta-gangga': [-8.4120, 115.5870], 'virgin-beach': [-8.4975, 115.5640],
  amed: [-8.3360, 115.6560], lempuyang: [-8.3910, 115.6310],
}
const bases: { area: string; key: string; pos: [number, number]; nights: string }[] = [
  { area: 'uluwatu', key: 'uluwatu', pos: [-8.8150, 115.1100], nights: '~5 nocí' },
  { area: 'ubud', key: 'ubud', pos: [-8.5069, 115.2625], nights: '~4 noci' },
  { area: 'east', key: 'east', pos: [-8.4000, 115.6000], nights: '~4 noci' },
]

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))

export function MapSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([-8.55, 115.35], 9)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18, attribution: '&copy; OpenStreetMap',
    }).addTo(map)
    const all: [number, number][] = []
    L.polyline(bases.map(b => b.pos), { color: '#64748b', dashArray: '6 8', weight: 3 }).addTo(map)
    bases.forEach((b, i) => {
      const tip = (lodgings as Record<string, { name: string; area: string }[]>)[b.key]?.[0]
      const icon = L.divIcon({ className: '', iconSize: [30, 30], iconAnchor: [15, 15],
        html: `<div style="background:${colors[b.area]};color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;border:3px solid #fff;box-shadow:0 1px 4px #0006">${i + 1}</div>` })
      L.marker(b.pos, { icon, zIndexOffset: 1000 }).addTo(map).bindPopup(
        `<b>🏡 Základna ${i + 1}: ${areaName[b.area]}</b><br>${b.nights}${tip ? `<br>Tip: ${esc(tip.name)} (${esc(tip.area)})` : ''}<br><a href="#lodging">→ Ubytování</a>`)
      all.push(b.pos)
    })
    mustSees.forEach(m => {
      const p = coords[m.id]; if (!p) return
      L.circleMarker(p, { radius: 8, color: '#fff', weight: 2, fillColor: colors[m.area], fillOpacity: 0.95 }).addTo(map)
        .bindPopup(`<div style="max-width:220px"><b>${esc(m.name)}</b><br><i>${esc(m.vibe)}</i><br><small>${esc(m.tip)}</small><br><a href="#must-see">→ Must-see</a></div>`)
      all.push(p)
    })
    map.fitBounds(all, { padding: [20, 20] })
    return () => { map.remove() }
  }, [])
  return (
    <section id="map" className="scroll-mt-16">
      <h2 className="font-display text-3xl md:text-4xl mb-2 flex items-center gap-2"><MapIcon /> Mapa</h2>
      <p className="text-slate-600 mb-4">Trasa Uluwatu → Ubud → východ. Velká čísla = základny, tečky = must-see. Klikni pro detail.</p>
      <div className="flex flex-wrap gap-3 mb-3 text-sm">
        {Object.entries(areaName).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: colors[k] }} />{v}</span>
        ))}
      </div>
      <div ref={ref} className="h-[360px] md:h-[480px] w-full rounded-2xl overflow-hidden border border-sand-200 shadow-sm z-0 relative" />
    </section>
  )
}

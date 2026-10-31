import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Map as MapIcon } from 'lucide-react'
import { mustSees, lodgings } from './data'

const colors: Record<string, string> = { uluwatu: '#0ea5e9', ubud: '#16a34a', east: '#ea580c' }
const areaName: Record<string, string> = { uluwatu: 'Uluwatu', ubud: 'Ubud', east: 'Východ (Abang/Sidemen)' }

const seeCoords: Record<string, [number, number]> = {
  'padang-padang': [-8.8111, 115.1033], bingin: [-8.8058, 115.1131], 'uluwatu-temple': [-8.8291, 115.0849],
  'single-fin': [-8.8156, 115.0884], 'beach-volley-uluwatu': [-8.8020, 115.1180],
  campuhan: [-8.5035, 115.2531], tegallalang: [-8.4343, 115.2790], 'monkey-forest': [-8.5188, 115.2585],
  'tirta-empul': [-8.4153, 115.3153], waterfall: [-8.5440, 115.2900], 'batur-trek': [-8.2421, 115.3751],
  'scooter-villages': [-8.4600, 115.2300],
  sidemen: [-8.4790, 115.4400], 'tirta-gangga': [-8.4120, 115.5870], 'virgin-beach': [-8.4975, 115.5640],
  amed: [-8.3360, 115.6560], lempuyang: [-8.3910, 115.6310],
}
const villaCoords: Record<string, [number, number]> = {
  'uluwatu-tip': [-8.8220, 115.0950], 'uluwatu-alt': [-8.8350, 115.1600],
  'ubud-tip': [-8.4950, 115.2560], 'ubud-alt': [-8.4300, 115.2400],
  'east-tip': [-8.4100, 115.5950], 'east-alt': [-8.4850, 115.4300],
}
const baseInfo = [
  { key: 'uluwatu', nights: '~5 nocí' }, { key: 'ubud', nights: '~4 noci' }, { key: 'east', nights: '~4 noci' },
]

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!))
const czk = (usd: number) => `${Math.round(usd * 23).toLocaleString('cs-CZ')} Kč`
type Layer = 'bases' | 'villas' | 'sees'
type Item = { id: string; layer: Layer; label: string; area: string; marker: L.Marker | L.CircleMarker }
const LBL: Record<Layer, string> = { bases: 'Základny', villas: 'Vily', sees: 'Must-see' }

export function MapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const groups = useRef<Record<Layer, L.LayerGroup> | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [on, setOn] = useState<Record<Layer, boolean>>({ bases: true, villas: true, sees: true })

  useEffect(() => {
    if (!ref.current) return
    const map = L.map(ref.current, { scrollWheelZoom: false, tap: true } as L.MapOptions).setView([-8.55, 115.35], 9)
    mapRef.current = map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap' }).addTo(map)
    const g = { bases: L.layerGroup().addTo(map), villas: L.layerGroup().addTo(map), sees: L.layerGroup().addTo(map) }
    groups.current = g
    const list: Item[] = []; const all: [number, number][] = []
    const popOpts = { maxWidth: 260, minWidth: 200, autoPanPadding: [16, 16] as [number, number] }

    // bases = tip villa coords
    const basePos = baseInfo.map(b => villaCoords[`${b.key}-tip`])
    L.polyline(basePos, { color: '#64748b', dashArray: '6 8', weight: 3 }).addTo(g.bases)
    baseInfo.forEach((b, i) => {
      const tip = lodgings[b.key]?.find(l => l.isDefault)
      const icon = L.divIcon({ className: '', iconSize: [34, 34], iconAnchor: [17, 17],
        html: `<div style="background:${colors[b.key]};color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;border:3px solid #fff;box-shadow:0 1px 5px #0007">${i + 1}</div>` })
      const m = L.marker(basePos[i], { icon, zIndexOffset: 1000 }).addTo(g.bases).bindPopup(
        `<b>Základna ${i + 1}: ${areaName[b.key]}</b><br>${b.nights}${tip ? `<br>Tip vila: ${esc(tip.name)}` : ''}<br><a href="#lodging">→ Ubytování</a> · <a href="#itinerary">→ Itinerář</a>`, popOpts)
      list.push({ id: `base-${b.key}`, layer: 'bases', label: `${i + 1}. ${areaName[b.key]}`, area: b.key, marker: m })
    })

    Object.entries(lodgings).forEach(([area, ls]) => ls.forEach(l => {
      const p = villaCoords[l.id]; if (!p) return
      const icon = L.divIcon({ className: '', iconSize: [28, 28], iconAnchor: [14, 28],
        html: `<div style="background:#fff;border:2px solid ${colors[area]};width:28px;height:28px;border-radius:8px 8px 8px 0;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 1px 4px #0006">${l.isDefault ? '🏡' : '🏠'}</div>` })
      const m = L.marker(p, { icon, zIndexOffset: 500 }).addTo(g.villas).bindPopup(
        `<div><b>${esc(l.name)}</b> ${l.isDefault ? '<span style="color:#16a34a">★ tip</span>' : '(alternativa)'}<br>
        <small>${esc(l.area)} · ${esc(l.badge)} · ⭐ ${l.rating} (${l.reviews})</small><br>
        <b>$${l.price}</b> celkem (~${czk(l.price)}) · ${l.nights} nocí<br>
        <ul style="margin:4px 0 4px 16px;padding:0">${l.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
        <a href="${esc(l.url)}" target="_blank" rel="noopener">Airbnb ↗</a> · <a href="#lodging">→ Ubytování</a></div>`, popOpts)
      list.push({ id: l.id, layer: 'villas', label: l.name, area, marker: m }); all.push(p)
    }))

    mustSees.forEach(s => {
      const p = seeCoords[s.id]; if (!p) return
      const m = L.circleMarker(p, { radius: 7, color: '#fff', weight: 2, fillColor: colors[s.area], fillOpacity: 0.95 }).addTo(g.sees)
        .bindPopup(`<div><b>${esc(s.name)}</b><br><i>${esc(s.vibe)}</i><br><small>${esc(s.description)}</small><br>
        <small><b>Tip:</b> ${esc(s.tip)}</small><br><a href="#must-see">→ Must-see</a> · <a href="https://www.google.com/maps/search/?api=1&query=${p[0]},${p[1]}" target="_blank" rel="noopener">Navigovat ↗</a></div>`, popOpts)
      list.push({ id: s.id, layer: 'sees', label: s.name, area: s.area, marker: m }); all.push(p)
    })
    map.fitBounds(all, { padding: [20, 20] })
    setItems(list)
    return () => { map.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    const map = mapRef.current, g = groups.current; if (!map || !g) return
    ;(Object.keys(g) as Layer[]).forEach(k => on[k] ? g[k].addTo(map) : g[k].remove())
  }, [on])

  const focus = (it: Item) => {
    const map = mapRef.current; if (!map) return
    if (!on[it.layer]) setOn(o => ({ ...o, [it.layer]: true }))
    map.flyTo(it.marker.getLatLng(), 13, { duration: 0.8 })
    setTimeout(() => it.marker.openPopup(), 850)
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section id="map" className="scroll-mt-16">
      <h2 className="font-display text-3xl md:text-4xl mb-2 flex items-center gap-2"><MapIcon /> Mapa</h2>
      <p className="text-slate-600 mb-3">Trasa Uluwatu → Ubud → východ. Čísla = základny, 🏡 tip vila / 🏠 alternativa, tečky = must-see. Klikni na cokoliv pro detail.</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {(Object.keys(LBL) as Layer[]).map(k => (
          <button key={k} onClick={() => setOn(o => ({ ...o, [k]: !o[k] }))}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${on[k] ? 'bg-ocean-500 text-white border-ocean-500' : 'bg-white text-slate-600 border-sand-200'}`}>
            {on[k] ? '✓ ' : ''}{LBL[k]}
          </button>
        ))}
        <span className="flex flex-wrap gap-3 items-center text-sm ml-auto">
          {Object.entries(areaName).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full inline-block" style={{ background: colors[k] }} />{v}</span>
          ))}
        </span>
      </div>
      <div ref={ref} className="h-[380px] md:h-[500px] w-full rounded-2xl overflow-hidden border border-sand-200 shadow-sm z-0 relative" />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {Object.keys(areaName).map(a => (
          <div key={a} className="rounded-xl border border-sand-200 p-3 bg-white">
            <h3 className="font-semibold mb-2" style={{ color: colors[a] }}>{areaName[a]}</h3>
            <ul className="space-y-1 text-sm">
              {items.filter(i => i.area === a).map(i => (
                <li key={i.id}>
                  <button onClick={() => focus(i)} className={`text-left hover:underline ${on[i.layer] ? '' : 'opacity-40'}`}>
                    {i.layer === 'bases' ? '📍' : i.layer === 'villas' ? '🏡' : '•'} {i.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

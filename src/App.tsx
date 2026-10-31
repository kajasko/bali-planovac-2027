import { useState, useRef } from 'react'
import {
  Plane, MapPin, Star, ExternalLink, Check, ChevronDown, ChevronUp,
  AlertTriangle, Utensils, Eye, Calendar, Truck, Ban, Sun, Coffee, Fish, Mountain, TreePalm, Heart, Sparkles
} from 'lucide-react'
import {
  lodgings, mustSees, mustEats, cultureItems, avoidList, days,
  areaColors, areaLabels,
  type Lodging, type DayPlan
} from './data'
import { MapSection } from './MapSection'

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function formatCZK(usd: number) {
  return `${Math.round(usd * 23).toLocaleString('cs-CZ')} Kč`
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', className)}>
      {children}
    </span>
  )
}

// ─── NAV ─────────────────────────────────────────
function Nav({ activeSection }: { activeSection: string }) {
  const links = [
    { id: 'overview', label: 'Přehled', icon: Sun },
    { id: 'map', label: 'Mapa', icon: MapPin },
    { id: 'lodging', label: 'Ubytování', icon: TreePalm },
    { id: 'must-see', label: 'Must-see', icon: Eye },
    { id: 'must-eat', label: 'Must-eat', icon: Utensils },
    { id: 'culture', label: 'Kultura', icon: Heart },
    { id: 'itinerary', label: 'Itinerář', icon: Calendar },
    { id: 'logistics', label: 'Logistika', icon: Truck },
    { id: 'avoid', label: 'Vynechat', icon: Ban },
  ]
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-sand-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 py-2 min-w-max">
          {links.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                activeSection === l.id
                  ? 'bg-ocean-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-sand-100'
              )}
            >
              <l.icon size={14} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────
function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-ocean-600 via-ocean-500 to-jungle-500 text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <p className="text-ocean-100 font-medium tracking-wide uppercase text-sm mb-2">Květen 2027 · 2 dospělí · 13 nocí</p>
        <h1 className="font-display text-5xl md:text-7xl mb-4 leading-tight">Bali</h1>
        <p className="text-xl md:text-2xl text-ocean-100 max-w-2xl leading-relaxed">
          Útesy, rýžová pole, sopky a warungy.
          Příroda & lokální jídlo &gt; Instagram pasti.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 text-sm px-4 py-1.5">
            <Plane size={14} /> PRG → AUH → DPS
          </Badge>
          <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 text-sm px-4 py-1.5">
            <MapPin size={14} /> Uluwatu → Ubud → Východ
          </Badge>
          <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/30 text-sm px-4 py-1.5">
            <Coffee size={14} /> Warungy & příroda first
          </Badge>
        </div>
      </div>
    </header>
  )
}

// ─── OVERVIEW ────────────────────────────────────
function Overview({ totalUSD }: { totalUSD: number }) {
  const totalCZK = Math.round(totalUSD * 23)
  const budgetLow = 25000
  const budgetHigh = 35000
  const inBudget = totalCZK <= budgetHigh
  const pct = Math.min(100, (totalCZK / budgetHigh) * 100)

  return (
    <section id="overview" className="scroll-mt-16">
      <SectionHeading icon={Sun} title="Přehled výletu" />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Lety</p>
          <p className="font-semibold text-lg">EY156 PRG → AUH</p>
          <p className="text-slate-500 text-sm">8. května 11:20 → 17:05</p>
          <div className="border-t border-sand-100 my-3" />
          <p className="font-semibold text-lg">EY155 AUH → PRG</p>
          <p className="text-slate-500 text-sm">23. května 00:50 → 07:05</p>
          <p className="text-xs text-slate-400 mt-3">AUH–DPS navazující let (typický Etihad routing)</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Trasa po ostrově</p>
          <div className="space-y-3 mt-2">
            {[
              { area: 'uluwatu', dates: '9.–14. 5.', nights: '5 nocí' },
              { area: 'ubud', dates: '14.–18. 5.', nights: '4 noci' },
              { area: 'east', dates: '18.–22. 5.', nights: '4 noci' },
            ].map(s => (
              <div key={s.area} className="flex items-center gap-3">
                <div className={cn('w-3 h-3 rounded-full', areaColors[s.area].accent)} />
                <div>
                  <p className="font-medium text-sm">{areaLabels[s.area]}</p>
                  <p className="text-xs text-slate-400">{s.dates} · {s.nights}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">Budget ubytování</p>
          <p className={cn('text-3xl font-bold mt-1', inBudget ? 'text-jungle-600' : 'text-lava-600')}>
            {totalCZK.toLocaleString('cs-CZ')} Kč
          </p>
          <p className="text-sm text-slate-500">${totalUSD} USD (23 Kč/USD)</p>
          <div className="mt-3 h-2.5 bg-sand-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', inBudget ? 'bg-jungle-400' : 'bg-lava-400')}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{budgetLow.toLocaleString('cs-CZ')} Kč</span>
            <span>{budgetHigh.toLocaleString('cs-CZ')} Kč</span>
          </div>
          <p className={cn('text-xs mt-2 font-medium', inBudget ? 'text-jungle-600' : 'text-lava-600')}>
            {inBudget ? '✓ V rozpočtu' : '⚠ Nad rozpočtem'}
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── LODGING ─────────────────────────────────────
function LodgingCard({ item, selected, onSelect }: { item: Lodging; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-white shadow-sm hover:shadow-md',
        selected ? 'border-ocean-400 ring-2 ring-ocean-200' : 'border-sand-200 hover:border-sand-300'
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={item.photo} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-white/90 text-slate-700 backdrop-blur-sm shadow-sm">
            <Star size={12} className="text-amber-500 fill-amber-500" /> {item.rating} ({item.reviews})
          </Badge>
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200">{item.badge}</Badge>
        </div>
        {selected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-ocean-500 rounded-full flex items-center justify-center shadow-lg">
            <Check size={16} className="text-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg">{item.name}</h4>
        <p className="text-sm text-slate-500">{item.area} · {item.nights} nocí</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {item.highlights.map(h => (
            <Badge key={h} className="bg-sand-50 text-slate-600 text-xs">{h}</Badge>
          ))}
        </div>
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-sand-100">
          <div>
            <p className="text-2xl font-bold">${item.price}</p>
            <p className="text-xs text-slate-400">{formatCZK(item.price)} · celkem za {item.nights}n</p>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-ocean-500 hover:text-ocean-700 flex items-center gap-1 text-sm font-medium"
          >
            Airbnb <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </button>
  )
}

function LodgingSection({ selections, onSelect }: {
  selections: Record<string, string>
  onSelect: (area: string, id: string) => void
}) {
  return (
    <section id="lodging" className="scroll-mt-16">
      <SectionHeading icon={TreePalm} title="Ubytování — vily se soukromým bazénem" />
      <p className="text-slate-500 text-sm -mt-4 mb-6">
        Klikni pro výběr tip vs. alternativa. Ceny z Airbnb (říjen 2026 hledání, květen 2027). Všechno Guest Favorite 4.8+.
      </p>
      {(['uluwatu', 'ubud', 'east'] as const).map(area => (
        <div key={area} className="mb-8">
          <h3 className={cn('text-lg font-bold mb-3 flex items-center gap-2', areaColors[area].text)}>
            <div className={cn('w-3 h-3 rounded-full', areaColors[area].accent)} />
            {areaLabels[area]}
            <span className="text-slate-400 font-normal text-sm">
              {lodgings[area][0].nights} nocí
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {lodgings[area].map(l => (
              <LodgingCard
                key={l.id}
                item={l}
                selected={selections[area] === l.id}
                onSelect={() => onSelect(area, l.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

// ─── MUST-SEE ────────────────────────────────────
function MustSeeSection() {
  const areas = ['uluwatu', 'ubud', 'east'] as const
  return (
    <section id="must-see" className="scroll-mt-16">
      <SectionHeading icon={Eye} title="Must-see — příroda, pláže, chrámy" />
      <p className="text-slate-500 text-sm -mt-4 mb-6">
        Příroda &gt; Instagram. Chrámy ráno před tour busy. Žádné předražené atrakce.
      </p>
      {areas.map(area => (
        <div key={area} className="mb-8">
          <h3 className={cn('text-lg font-bold mb-4 flex items-center gap-2', areaColors[area].text)}>
            <div className={cn('w-3 h-3 rounded-full', areaColors[area].accent)} />
            {areaLabels[area]}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mustSees.filter(m => m.area === area).map(m => (
              <div key={m.id} className={cn('bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow', areaColors[area].border)}>
                <div className="relative h-40 overflow-hidden">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" loading="lazy" />
                  <Badge className={cn('absolute top-2 left-2 backdrop-blur-sm text-xs', areaColors[area].badge)}>{m.vibe}</Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{m.description}</p>
                  <div className={cn('mt-3 p-2.5 rounded-lg text-xs leading-relaxed', areaColors[area].bg)}>
                    <span className="font-semibold">💡 Tip:</span> {m.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

// ─── MUST-EAT ────────────────────────────────────
function MustEatSection() {
  const areas = ['uluwatu', 'ubud', 'east'] as const
  const areaIcons: Record<string, typeof Fish> = { uluwatu: Fish, ubud: Coffee, east: Fish }
  return (
    <section id="must-eat" className="scroll-mt-16">
      <SectionHeading icon={Utensils} title="Must-eat — warungy, street food, lokální jídlo" />
      <p className="text-slate-500 text-sm -mt-4 mb-2">
        Jedno hezčí jídlo denně (warung seafood, babi guling). Jinak lokálně: nasi goreng, bakso, gado-gado.
      </p>
      <p className="text-slate-400 text-xs mb-6">
        Kurz: 1 USD ≈ 15 600 IDR ≈ 23 CZK. Warung oběd = 25–50k IDR = 40–80 Kč.
      </p>
      {areas.map(area => {
        const Icon = areaIcons[area]
        return (
          <div key={area} className="mb-8">
            <h3 className={cn('text-lg font-bold mb-4 flex items-center gap-2', areaColors[area].text)}>
              <Icon size={18} />
              {areaLabels[area]}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mustEats.filter(e => e.area === area).map(e => (
                <div key={e.id} className={cn('bg-white rounded-2xl overflow-hidden border shadow-sm', areaColors[area].border)}>
                  <div className="h-32 overflow-hidden">
                    <img src={e.photo} alt={e.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm">{e.name}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{e.description}</p>
                    <p className={cn('text-xs font-medium mt-2 px-2 py-1 rounded-lg inline-block', areaColors[area].badge)}>
                      {e.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

// ─── CULTURE ─────────────────────────────────────
function CultureSection() {
  const grouped = {
    uluwatu: cultureItems.filter(c => c.area === 'uluwatu'),
    ubud: cultureItems.filter(c => c.area === 'ubud'),
    east: cultureItems.filter(c => c.area === 'east'),
    general: cultureItems.filter(c => c.area === 'general'),
  }

  return (
    <section id="culture" className="scroll-mt-16">
      <SectionHeading icon={Heart} title="Autentická kultura — žitá, ne kupovaná" />
      <p className="text-slate-500 text-sm -mt-4 mb-6">
        Bali není kulturní atrakce — je to živý ostrov s denními rituály. Tady je jak to zažít s úctou, ne jako turistický produkt.
      </p>

      {/* General items first */}
      {grouped.general.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-sand-700">
            <Sparkles size={18} className="text-sand-500" />
            Napříč celým Bali
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {grouped.general.map(c => (
              <CultureCard key={c.id} item={c} />
            ))}
          </div>
        </div>
      )}

      {(['uluwatu', 'ubud', 'east'] as const).map(area => (
        grouped[area].length > 0 ? (
          <div key={area} className="mb-8">
            <h3 className={cn('text-lg font-bold mb-4 flex items-center gap-2', areaColors[area].text)}>
              <div className={cn('w-3 h-3 rounded-full', areaColors[area].accent)} />
              {areaLabels[area]}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[area].map(c => (
                <CultureCard key={c.id} item={c} areaKey={area} />
              ))}
            </div>
          </div>
        ) : null
      ))}
    </section>
  )
}

function CultureCard({ item, areaKey }: { item: typeof cultureItems[number]; areaKey?: string }) {
  const colors = areaKey ? areaColors[areaKey] : areaColors.travel
  return (
    <div className={cn('bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow', colors.border)}>
      <div className="relative h-40 overflow-hidden">
        <img src={item.photo} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        <Badge className={cn('absolute top-2 left-2 backdrop-blur-sm text-xs', colors.badge)}>{item.vibe}</Badge>
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.description}</p>
        <div className={cn('mt-3 p-2.5 rounded-lg text-xs leading-relaxed', colors.bg)}>
          <span className="font-semibold">💡 Tip:</span> {item.tip}
        </div>
      </div>
    </div>
  )
}

// ─── ITINERARY ───────────────────────────────────
function DayCard({ day, isOpen, onToggle }: { day: DayPlan; isOpen: boolean; onToggle: () => void }) {
  const colors = areaColors[day.areaKey] || areaColors.travel
  return (
    <div className={cn('rounded-2xl border overflow-hidden bg-white shadow-sm transition-shadow', isOpen && 'shadow-md', colors.border)}>
      <button onClick={onToggle} className="w-full text-left p-4 flex items-center gap-4 hover:bg-sand-50/50 transition-colors">
        <div className={cn('w-12 h-12 rounded-xl flex flex-col items-center justify-center text-white font-bold text-xs shrink-0 bg-gradient-to-br', colors.gradient)}>
          <span className="text-[10px] opacity-80">DEN</span>
          <span className="text-lg leading-none">{day.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{day.title}</p>
          <p className="text-xs text-slate-400">{day.date} · {day.area}</p>
        </div>
        {day.move && <Badge className={cn('hidden sm:flex text-xs', colors.badge)}><Truck size={12} /> Přesun</Badge>}
        {isOpen ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-sand-100">
          <ul className="mt-3 space-y-2">
            {day.items.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0', colors.accent)} />
                <span className="text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          {day.food && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100 text-sm flex gap-2">
              <Utensils size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <span className="text-amber-800">{day.food}</span>
            </div>
          )}
          {day.tip && (
            <div className="mt-2 p-3 rounded-xl bg-ocean-50 border border-ocean-100 text-sm flex gap-2">
              <Mountain size={15} className="text-ocean-600 shrink-0 mt-0.5" />
              <span className="text-ocean-800">{day.tip}</span>
            </div>
          )}
          {(day.move || day.logistics) && (
            <div className="mt-2 p-3 rounded-xl bg-sand-100 border border-sand-200 text-sm flex gap-2">
              <Truck size={15} className="text-sand-700 shrink-0 mt-0.5" />
              <span className="text-sand-800">{day.move || day.logistics}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ItinerarySection() {
  const [openDays, setOpenDays] = useState<Set<number>>(() => new Set([2, 3]))
  const toggle = (d: number) => setOpenDays(prev => {
    const next = new Set(prev)
    next.has(d) ? next.delete(d) : next.add(d)
    return next
  })

  return (
    <section id="itinerary" className="scroll-mt-16">
      <SectionHeading icon={Calendar} title="Den po dni — itinerář" />
      <p className="text-slate-500 text-sm -mt-4 mb-6">
        Klikni na den pro detail. Jídlo a přesuny označené zvlášť.
      </p>
      <div className="space-y-3">
        {days.map(d => (
          <DayCard key={d.day} day={d} isOpen={openDays.has(d.day)} onToggle={() => toggle(d.day)} />
        ))}
      </div>
    </section>
  )
}

// ─── LOGISTICS ───────────────────────────────────
function LogisticsSection() {
  const transfers = [
    { from: 'DPS letiště', to: 'Uluwatu', method: 'Grab / Klook', cost: '~120k IDR ($8)', time: '~45 min', note: 'Grab app funguje na DPS hned po příletu.' },
    { from: 'Uluwatu', to: 'Ubud', method: 'Grab', cost: '~300k IDR ($19)', time: '1,5–2h', note: 'Zastávka Tirta Empul po cestě.' },
    { from: 'Ubud', to: 'Abang/Sidemen', method: 'Grab', cost: '~250k IDR ($16)', time: '~1,5h', note: 'Krásná cesta přes kopce. Sidemen viewpoint po cestě.' },
    { from: 'Abang', to: 'DPS letiště', method: 'Grab', cost: '~350k IDR ($22)', time: '2–2,5h', note: '⚠️ Velká rezerva — silnice nepředvídatelné!' },
  ]

  return (
    <section id="logistics" className="scroll-mt-16">
      <SectionHeading icon={Truck} title="Logistika & přesuny" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
          <h3 className="font-bold mb-4">Transfery mezi základnami</h3>
          <div className="space-y-4">
            {transfers.map((t, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-ocean-400 border-2 border-ocean-200" />
                  {i < transfers.length - 1 && <div className="w-0.5 flex-1 bg-ocean-200" />}
                </div>
                <div className="pb-4">
                  <p className="font-medium text-sm">{t.from} → {t.to}</p>
                  <p className="text-xs text-slate-500">{t.method} · {t.cost} · {t.time}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
            <h3 className="font-bold mb-3">Praktické info</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span>🛵</span> <span><strong>Skútr:</strong> V Ubud zdarma od vily. Jinde Grab nebo pronájem ~70k IDR/den. Jezděte vlevo!</span></li>
              <li className="flex gap-2"><span>💰</span> <span><strong>Hotovost:</strong> ATM na letišti (BCA, Mandiri). Warungy = jen cash. Grab platí kartou.</span></li>
              <li className="flex gap-2"><span>📱</span> <span><strong>SIM:</strong> Telkomsel na DPS letišti, 100k IDR za 15 GB. Data všude OK, horší v horách.</span></li>
              <li className="flex gap-2"><span>💧</span> <span><strong>Voda:</strong> Nekupujte plastové flašky — refill stanice za 5k IDR všude. Kohoutková ne.</span></li>
              <li className="flex gap-2"><span>🌡️</span> <span><strong>Počasí:</strong> Květen = konec deštivého období, přechod na dry season. 28–32°C, občas odpolední přeháňka.</span></li>
              <li className="flex gap-2"><span>👔</span> <span><strong>Chrámy:</strong> Sarong + šátek přes ramena povinné (půjčují na místě). Kolena a ramena zakrytá.</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-sm">
            <h3 className="font-bold mb-3">Budget odhad mimo ubytování</h3>
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li className="flex justify-between"><span>Jídlo (2 os. / den, warungy + 1× hezčí)</span><span className="font-medium">~300k IDR</span></li>
              <li className="flex justify-between"><span>Transfery celkem (4× Grab)</span><span className="font-medium">~1M IDR</span></li>
              <li className="flex justify-between"><span>Vstupy, aktivity, masáže</span><span className="font-medium">~2M IDR</span></li>
              <li className="flex justify-between"><span>SIM, benzín, drobné</span><span className="font-medium">~500k IDR</span></li>
              <li className="border-t border-sand-100 pt-1.5 flex justify-between font-bold">
                <span>Odhad 13 dní (mimo ubytování)</span>
                <span>~7.5M IDR (~$480 / ~11k Kč)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── AVOID ───────────────────────────────────────
function AvoidSection() {
  return (
    <section id="avoid" className="scroll-mt-16">
      <SectionHeading icon={Ban} title="Co vynechat — ušetříte čas i peníze" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {avoidList.map((a, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-lava-100 shadow-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="text-lava-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-lava-700">{a.name}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{a.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── HELPERS ─────────────────────────────────────
function SectionHeading({ icon: Icon, title }: { icon: typeof Sun; title: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-display flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center text-white shadow-md">
        <Icon size={20} />
      </div>
      {title}
    </h2>
  )
}

// ─── APP ─────────────────────────────────────────
export default function App() {
  const [selections, setSelections] = useState<Record<string, string>>({
    uluwatu: 'uluwatu-tip',
    ubud: 'ubud-tip',
    east: 'east-tip',
  })
  const [activeSection, setActiveSection] = useState('overview')
  const mainRef = useRef<HTMLDivElement>(null)

  const handleSelect = (area: string, id: string) => {
    setSelections(prev => ({ ...prev, [area]: id }))
  }

  const totalUSD = (['uluwatu', 'ubud', 'east'] as const).reduce((sum, area) => {
    const sel = lodgings[area].find(l => l.id === selections[area])
    return sum + (sel?.price || 0)
  }, 0)

  const handleScroll = () => {
    const sections = ['overview', 'map', 'lodging', 'must-see', 'must-eat', 'culture', 'itinerary', 'logistics', 'avoid']
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(id)
          break
        }
      }
    }
  }

  return (
    <div ref={mainRef} onScroll={handleScroll} className="min-h-screen" onScrollCapture={handleScroll}>
      <Hero />
      <Nav activeSection={activeSection} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-16" onMouseMove={handleScroll}>
        <Overview totalUSD={totalUSD} />
        <MapSection />
        <LodgingSection selections={selections} onSelect={handleSelect} />
        <MustSeeSection />
        <MustEatSection />
        <CultureSection />
        <ItinerarySection />
        <LogisticsSection />
        <AvoidSection />
      </main>

      <footer className="bg-slate-800 text-slate-400 text-center py-8 text-sm">
        <p>Bali Květen 2027 · Plánovač pro Karolínu + přítele</p>
        <p className="text-xs mt-1">Ceny orientační (říjen 2026). Kurz 23 CZK/USD.</p>
      </footer>
    </div>
  )
}

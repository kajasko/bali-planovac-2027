export interface Lodging {
  id: string
  name: string
  area: string
  url: string
  price: number
  nights: number
  rating: number
  reviews: number
  badge: string
  highlights: string[]
  photo: string
  isDefault: boolean
}

export interface MustSee {
  id: string
  name: string
  area: 'uluwatu' | 'ubud' | 'east'
  description: string
  tip: string
  photo: string
  vibe: string
}

export interface MustEat {
  id: string
  name: string
  area: 'uluwatu' | 'ubud' | 'east' | 'general'
  description: string
  price: string
  photo: string
}

export interface CultureItem {
  id: string
  name: string
  area: 'uluwatu' | 'ubud' | 'east' | 'general'
  description: string
  tip: string
  photo: string
  vibe: string
}

export interface AvoidItem {
  name: string
  reason: string
}

export interface DayPlan {
  day: number
  date: string
  area: string
  areaKey: 'uluwatu' | 'ubud' | 'east' | 'travel'
  title: string
  items: string[]
  logistics?: string
  move?: string
  tip?: string
  food?: string
}

export const lodgings: Record<string, Lodging[]> = {
  uluwatu: [
    {
      id: 'uluwatu-tip',
      name: 'Cliff-edge Villa Uluwatu',
      area: 'Uluwatu',
      url: 'https://www.airbnb.com/rooms/906358806204043976',
      price: 467,
      nights: 5,
      rating: 4.8,
      reviews: 135,
      badge: 'Guest Favorite',
      highlights: ['Přístup k pláži', 'Soukromý bazén', 'Výhled na útesy'],
      photo: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80',
      isDefault: true,
    },
    {
      id: 'uluwatu-alt',
      name: 'Villa Ungasan',
      area: 'Ungasan',
      url: 'https://www.airbnb.com/rooms/1457029636720220044',
      price: 360,
      nights: 5,
      rating: 4.85,
      reviews: 90,
      badge: 'Guest Favorite',
      highlights: ['Klidnější lokace', 'Soukromý bazén', 'Blízko Melasti Beach'],
      photo: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80',
      isDefault: false,
    },
  ],
  ubud: [
    {
      id: 'ubud-tip',
      name: 'Rice Field Villa Ubud',
      area: 'Ubud',
      url: 'https://www.airbnb.com/rooms/1461401705679628411',
      price: 226,
      nights: 4,
      rating: 4.99,
      reviews: 76,
      badge: 'Top Guest Favorite',
      highlights: ['Výhled na rýžová pole', 'Skútr zdarma', 'Soukromý bazén'],
      photo: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      isDefault: true,
    },
    {
      id: 'ubud-alt',
      name: 'Jungle Villa Payangan',
      area: 'Payangan',
      url: 'https://www.airbnb.com/rooms/1430997742858462304',
      price: 294,
      nights: 4,
      rating: 4.92,
      reviews: 55,
      badge: 'Guest Favorite',
      highlights: ['Džungle kolem', 'Soukromý bazén', 'Klid a ticho'],
      photo: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
      isDefault: false,
    },
  ],
  east: [
    {
      id: 'east-tip',
      name: 'Mountain Villa Abang',
      area: 'Abang',
      url: 'https://www.airbnb.com/rooms/649335930670904875',
      price: 192,
      nights: 4,
      rating: 4.88,
      reviews: 42,
      badge: 'Guest Favorite',
      highlights: ['Výhled na Agung', 'Soukromý bazén', 'Autentický Bali'],
      photo: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
      isDefault: true,
    },
    {
      id: 'east-alt',
      name: 'Valley Villa Sidemen',
      area: 'Sidemen',
      url: 'https://www.airbnb.com/rooms/1669237773483613734',
      price: 239,
      nights: 4,
      rating: 4.9,
      reviews: 38,
      badge: 'Guest Favorite',
      highlights: ['Údolí Sidemen', 'Soukromý bazén', 'Treky v okolí'],
      photo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
      isDefault: false,
    },
  ],
}

export const mustSees: MustSee[] = [
  // ─── ULUWATU ───
  {
    id: 'padang-padang',
    name: 'Padang Padang Beach',
    area: 'uluwatu',
    description: 'Malá pláž schovaná ve skalním průchodu — tyrkysová voda, surfaři, pohodový vibe. Žádný resort, jen písek a vlny.',
    tip: 'Přijďte ráno před 9:00, odpoledne plná. Vstup 15k IDR (~25 Kč). Vezměte svačinu.',
    photo: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&q=80',
    vibe: '🏖️ Pláž & koupání',
  },
  {
    id: 'bingin',
    name: 'Bingin Beach',
    area: 'uluwatu',
    description: 'Strmé schody dolů k útesové pláži — surfařský ráj. Malé warungy přímo na skále, pivo za 25k IDR.',
    tip: 'Hodně schodů — lehké batohy. Ideální k západu slunce. Warung u pláže = nejlepší oběd.',
    photo: 'https://images.unsplash.com/photo-1588625500633-a0443fb4f588?w=800&q=80',
    vibe: '🏖️ Pláž & surfing',
  },
  {
    id: 'uluwatu-temple',
    name: 'Chrám Uluwatu + Kecak',
    area: 'uluwatu',
    description: 'Chrám na 70m útesu. Při západu slunce Kecak dance — stovky mužů skandují v kruhu. Stojí za to jednou vidět.',
    tip: 'Kecak v 18:00, přijďte v 17:00. Pozor na opice — schovejte brýle a mobily! Lístky 150k IDR.',
    photo: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    vibe: '🛕 Kultura — stojí za to jednou',
  },
  {
    id: 'single-fin',
    name: 'Single Fin — sunset drink',
    area: 'uluwatu',
    description: 'Ikonický cliff bar s výhledem na surfaře. Bintang za 45k IDR, koktejl ~80k. Kasual, ne club.',
    tip: 'Neděle = live music a plno. Jindy klid. Přijďte hodinu před západem.',
    photo: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    vibe: '🍺 Kasual sunset spot',
  },
  {
    id: 'beach-volley-uluwatu',
    name: 'Beach volejbal na pláži',
    area: 'uluwatu',
    description: 'Dreamland Beach a Pandawa mají rovný písek a občas i natažené sítě. Sunset session s lokálními hráči je klasika.',
    tip: 'Dreamland odpoledne kolem 16:00 — bývají tam skupiny. Přivezte vlastní míč (koupit v Kuta za 80k IDR) pokud chcete jistotu.',
    photo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80',
    vibe: '🏐 Sport na pláži',
  },
  // ─── UBUD ───
  {
    id: 'campuhan',
    name: 'Campuhan Ridge Walk',
    area: 'ubud',
    description: 'Poklidná procházka po hřebeni mezi dvěma údolími. Zelené kopce, palmy, ranní mlha — nejhezčí Ubud zdarma.',
    tip: 'Ideální za svítání 6:00–7:30. Délka cca 2 km, rovný terén. Pak snídaně v centru.',
    photo: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80',
    vibe: '🥾 Procházka & příroda',
  },
  {
    id: 'tegallalang',
    name: 'Tegallalang Rice Terraces',
    area: 'ubud',
    description: 'Slavné zelené kaskády rýžových teras. Na Instagramu všude, ale naživo pořád dechberoucí — hlavně ráno.',
    tip: 'Ráno 7–8:00 nejlepší světlo + skoro nikdo. Vejděte zdarma z boční cesty (ne hlavní vchod s poplatkem).',
    photo: 'https://images.unsplash.com/photo-1531592937781-2a5c228e083f?w=800&q=80',
    vibe: '🥾 Příroda & procházka',
  },
  {
    id: 'monkey-forest',
    name: 'Sacred Monkey Forest',
    area: 'ubud',
    description: 'Posvátný les s 1260+ makaky — starobylé chrámy, obří stromy, mechové sochy. Fajn na hodinku pokud není narváno.',
    tip: 'Ráno = méně lidí i opic. Neschovávejte jídlo v kapsách! Vstup 80k IDR.',
    photo: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80',
    vibe: '🌳 Příroda — pokud není plno',
  },
  {
    id: 'tirta-empul',
    name: 'Tirta Empul',
    area: 'ubud',
    description: 'Posvátný chrám z r. 962 — Balijci se rituálně očišťují v pramenech. Autentický zážitek. Přijďte ráno před autobusovými toury.',
    tip: 'Půjčí sarong. Otevírá 8:00 — buďte tam do 8:30, v 10 už jsou tour busy. Vstup 50k IDR.',
    photo: 'https://images.unsplash.com/photo-1604922824961-87cefb2e4b07?w=800&q=80',
    vibe: '🛕 Chrám ráno = bez davů',
  },
  {
    id: 'waterfall',
    name: 'Vodopády — Kanto Lampo / Tegenungan',
    area: 'ubud',
    description: 'Kanto Lampo: voda přes vrstvy skal, fotogenický a méně turistický. Tegenungan: velký a dramatický. Oba do 30 min skútrem.',
    tip: 'Kanto Lampo ráno 7:30 = sami. Tegenungan odpoledne OK. Oba vstup 20k IDR.',
    photo: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80',
    vibe: '💧 Vodopády & příroda',
  },
  {
    id: 'batur-trek',
    name: 'Mount Batur — sunrise trek',
    area: 'ubud',
    description: 'Výstup na aktivní sopku (1717 m) za tmy, východ slunce na vrcholu s výhledem na jezero a Agung. Fyzicky náročnější, ale žádná lanovka — reálný trek.',
    tip: 'Odjezd 2:00 z Ubud, výstup 2 hodiny. Průvodce povinný, ~$40/os vč. snídaně na vrchu. Alternativa pro klidnější den: Munduk vodopády na severu.',
    photo: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80',
    vibe: '🌋 Trek na sopku — aktivní',
  },
  {
    id: 'scooter-villages',
    name: 'Skútr výlet — vesnice & kávové farmy',
    area: 'ubud',
    description: 'Vlastní tempo, nulový náklad (skútr od vily zdarma). Kafé plantáže s degustací zdarma, vesnice kde nepotkáte turisty, rýžová pole kam nedojede Grab.',
    tip: 'Trasa: Ubud → Tegallalang → Kintamani → kafé plantáž → zpět. Benzín 10k IDR. Jezděte opatrně, levá strana!',
    photo: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
    vibe: '🛵 Skútr & budget freedom',
  },
  // ─── EAST BALI ───
  {
    id: 'sidemen',
    name: 'Sidemen Valley — treky & rýžová pole',
    area: 'east',
    description: 'Údolí bez davů — autentický Bali. Rýžová pole, palmy, Agung v pozadí. Trek s lokálním průvodcem je nejlepší zážitek celého tripu.',
    tip: 'Půldenní trek cca 300k IDR/os s průvodcem. Ráno = nejlepší světlo. Průvodce vás zavede i tam kam byste sami nešli.',
    photo: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80',
    vibe: '🥾 Trek & příroda',
  },
  {
    id: 'tirta-gangga',
    name: 'Tirta Gangga',
    area: 'east',
    description: 'Královský vodní palác — kamenné bazény, fontány, tropická zahrada, koi kapři. Klidné a krásné.',
    tip: 'Vstup 50k IDR. Hodina tu stačí. Přijďte ráno před tour busy (do 9:00).',
    photo: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80',
    vibe: '🌺 Palác ráno = bez davů',
  },
  {
    id: 'virgin-beach',
    name: 'Virgin Beach (Pasir Putih)',
    area: 'east',
    description: 'Schovaná bílá pláž — žádné davy, čistá voda, warung s grilovanou rybou přímo na písku.',
    tip: 'Cesta přes vesnici, občas 10k IDR vstup. Lehátka 50k. Nejlepší koupání na východě.',
    photo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    vibe: '🏖️ Schovaná pláž',
  },
  {
    id: 'amed',
    name: 'Amed — snorkeling z pláže',
    area: 'east',
    description: 'Rybářská vesnice s korály přímo u břehu. Snorkeling bez lodi, žádný ticket-farm. V Tulamben kousek odsud i japonský vrak USAT Liberty.',
    tip: '30 min od Abang. Masky za 50k IDR. Oběd grilled fish na pláži 80k. Alternativa k Nusa Penida — menší ale autentičtější.',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    vibe: '🐠 Snorkeling — aktivní, ne turistický',
  },
  {
    id: 'lempuyang',
    name: 'Lempuyang (Brána nebes)',
    area: 'east',
    description: 'Slavná "Gates of Heaven" — fotka s Agungem. ALE: fronta 1–3 hodiny, odraz je přes zrcadlo (ne voda), a horní chrámy jsou krásnější.',
    tip: '⚠️ VOLITELNÉ. Pokud jedete: buďte na otevření v 7:00. Jinak vynechte "bránu" a jděte rovnou do horních chrámů — prázdné a krásnější. Hlavně nekupujte předražené tour balíčky.',
    photo: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&q=80',
    vibe: '⚠️ Volitelné — fronty & Instagram past',
  },
]

export const mustEats: MustEat[] = [
  // ─── ULUWATU ───
  {
    id: 'jimbaran-seafood',
    name: 'Jimbaran Bay — grilované ryby na pláži',
    area: 'uluwatu',
    description: 'Řada warungu přímo na písku. Vyberete rybu/krevety z displeje, grilují na uhlících. Nohy v písku, západ slunce. Tohle je "ten jeden lepší meal" dne.',
    price: '150–250k IDR / osoba (~150–250 Kč)',
    photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  },
  {
    id: 'single-fin-food',
    name: 'Single Fin — burgery & nachos na útesu',
    area: 'uluwatu',
    description: 'Cliff bar s výhledem. Burgery, nachos, fish tacos — kasual jídlo k Bintangu. Hlavně kvůli atmosféře.',
    price: '80–120k IDR / hlavní (~80–120 Kč)',
    photo: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  },
  {
    id: 'warung-uluwatu',
    name: 'Warungy Bukit — nasi goreng & mie goreng',
    area: 'uluwatu',
    description: 'Lokální warungy u silnice. Plná porce smažené rýže nebo nudlí za cenu jednoho piva v baru. Základ každého dne.',
    price: '25–45k IDR (~25–45 Kč)',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
  },
  // ─── UBUD ───
  {
    id: 'babi-guling',
    name: 'Babi Guling (pečené prasátko)',
    area: 'ubud',
    description: 'Balijská specialita č. 1. Warung Babi Guling Pak Malen je lokálnější a levnější než turistická Ibu Oka.',
    price: '40–60k IDR (~40–60 Kč)',
    photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  {
    id: 'nasi-campur',
    name: 'Nasi Campur & Gado-gado',
    area: 'ubud',
    description: 'Rýže s mixem příloh (kuře, tempe, sambal, zelenina). Gado-gado = salát s arašídovou omáčkou. Každý warung vaří jinak.',
    price: '25–40k IDR (~25–40 Kč)',
    photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
  },
  {
    id: 'ubud-noodles',
    name: 'Mie Goreng & Bakso polévka',
    area: 'ubud',
    description: 'Smažené nudle nebo horká polévka s masovými kuličkami. Bakso stánky na ulici = nejlepší street food na ostrově.',
    price: '15–30k IDR (~15–30 Kč)',
    photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
  },
  {
    id: 'ubud-coffee',
    name: 'Balijská káva — farmy & Seniman',
    area: 'ubud',
    description: 'Plantáže kolem Ubud: degustace 10+ druhů zdarma (i luwak). Seniman Coffee Studio v centru = nejlepší specialty.',
    price: 'Degustace zdarma, espresso 30–50k IDR',
    photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  // ─── EAST ───
  {
    id: 'amed-fish',
    name: 'Grilled fish na pláži — Amed',
    area: 'east',
    description: 'Čerstvá ryba od rybářů, grilovaná s bumbu bali. Posezení na pláži, jednoduché a skvělé.',
    price: '60–100k IDR (~60–100 Kč)',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    id: 'sidemen-warung',
    name: 'Rodinné warungy — Sidemen údolí',
    area: 'east',
    description: 'Malinké rodinné warungy s výhledem na rýžová pole. Žádné menu — prostě to co vaří. Nejautentičtější jídlo na ostrově.',
    price: '25–50k IDR (~25–50 Kč)',
    photo: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80',
  },
]

export const cultureItems: CultureItem[] = [
  {
    id: 'tirta-empul-ritual',
    name: 'Ranní očista v Tirta Empul',
    area: 'ubud',
    description: 'Přijďte před 9:00, kdy tu jsou hlavně Balijci. Projděte prameny jako oni — tiše, s úctou. Sarong a šátek povinné (půjčí na místě). Tohle není selfie atrakce, je to živý chrám.',
    tip: 'Nejděte s tour skupinou. Přijeďte Grabem sami ráno. Pozorujte lokální rodiny — pochopíte víc než z průvodce. Vstup 50k IDR.',
    photo: 'https://images.unsplash.com/photo-1604922824961-87cefb2e4b07?w=800&q=80',
    vibe: '🙏 Chrám — s úctou',
  },
  {
    id: 'kecak-uluwatu',
    name: 'Kecak dance — Uluwatu sunset',
    area: 'uluwatu',
    description: 'Stovky mužů v kruhu skandují "čak-čak-čak" při západu slunce na 70m útesu. Není to dinner show balíček — je to skutečné představení v přírodním amfiteátru. Jednou za trip stojí za to.',
    tip: 'Přijďte 17:00 na dobré místo (začíná 18:00). Lístky 150k IDR přímo u vchodu — nekupujte přes agenturu. Pozor na opice cestou!',
    photo: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    vibe: '🔥 Autentické představení',
  },
  {
    id: 'canang-sari',
    name: 'Canang sari — každodenní obětiny',
    area: 'general',
    description: 'Malé košíčky z palmových listů s květinami, rýží a kadidlem — najdete je všude: před obchody, na schodech, u chrámů. Balijci je skládají 2–3× denně jako poděkování bohům. Nepřešlapujte je!',
    tip: 'Zeptejte se hostitelky ve vile, jestli můžete pozorovat ranní přípravu. Většina to ráda ukáže — je to krásný ranní rituál. Nefoťte bez dovolení.',
    photo: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    vibe: '🌸 Každodenní spiritualita',
  },
  {
    id: 'cooking-class',
    name: 'Cooking class s návštěvou trhu',
    area: 'ubud',
    description: 'Ranní trh (pasar) v 6:00 s lokální kuchařkou — vybíráte koření, zeleninu, tofu. Pak vaříte nasi goreng, satay, sambal od nuly. Naučíte se víc o Bali než z jakéhokoliv muzea.',
    tip: 'Hledejte domácí cooking class (ne hotelovou). Cena 250–350k IDR/os vč. trhu. Paon Bali a Bumbu Bali jsou oblíbené — ale menší "ibu" varianty jsou autentičtější.',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80',
    vibe: '🍳 Trh + vaření',
  },
  {
    id: 'batik-workshop',
    name: 'Batik / řezbářství workshop',
    area: 'ubud',
    description: 'Hands-on dílna v Ubud nebo okolních vesnicích — batik (voskový tisk na látku), stříbrnictví v Celuk, řezbářství v Mas. 2–3 hodiny, odnesete si vlastní výtvor.',
    tip: 'Hledejte "workshop" ne "factory tour" — v továrně jen koukáte a kupujete. Threads of Life v Ubud je skvělá fair-trade textilní galerie s kontextem.',
    photo: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800&q=80',
    vibe: '🎨 Řemeslo hands-on',
  },
  {
    id: 'subak-walk',
    name: 'Subak & rýžová pole — vesnice Sidemen',
    area: 'east',
    description: 'Subak = tisíciletý balijský systém zavlažování rýžových polí (UNESCO). Průvodce z vesnice vysvětlí, jak voda teče z chrámu přes kanály do každého pole. Pochopíte, proč terasy vypadají tak.',
    tip: 'Objednejte lokálního průvodce přes vilu (300k IDR/os, 3–4h trek). Ten vám ukáže i vesnici, představí rodinu, možná pozvou na čaj.',
    photo: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80',
    vibe: '🌾 UNESCO tradice',
  },
  {
    id: 'pasar-market',
    name: 'Ranní trh (pasar) — Ubud nebo Sidemen',
    area: 'ubud',
    description: 'Ubud Pasar od 5:00–8:00 = lokální sekce (ne suvenýry). Ovoce, koření, obětiny, snídaně za 10k IDR. Sidemen trh je menší a čistě lokální — žádní turisté.',
    tip: 'V Ubud Pasar jděte do zadní části za čerstvé jídlo (přední část = turistické suvenýry od 8:00). Sidemen trh: zeptejte se ve vile na den a čas.',
    photo: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    vibe: '🧺 Lokální trh ráno',
  },
  {
    id: 'odalan',
    name: 'Odalan — chrámové výročí (pokud vyjde)',
    area: 'general',
    description: 'Každý chrám slaví výročí (odalan) každých 210 dní dle balijského kalendáře. Pokud zrovna probíhá jeden blízko — procesí, gamelan hudba, tance, obětiny. Nejautentičtější zážitek co Bali nabízí.',
    tip: '⭐ Nedá se naplánovat dopředu z ČR. Zeptejte se ve vile nebo lokálního průvodce po příjezdu — rádi vás vezmou s sebou. Sarong povinný, buďte tišší než na běžném výletě.',
    photo: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&q=80',
    vibe: '✨ Bonus — pokud vyjde termín',
  },
]

export const avoidList: AvoidItem[] = [
  { name: 'Instagram Bali swings', reason: 'Předražené (350k+ IDR), 5 min na houpačce, fronta. Rýžové terasy jsou zdarma a hezčí.' },
  { name: 'Spa/wellness balíčky', reason: 'Hodinová masáž za 150k IDR v lokálu je skvělá. "Spa day package" za $80 ne.' },
  { name: 'Fancy dinner shows & deguštační menu', reason: 'Warung za 40k > restaurace za 400k. Jednou denně něco hezkého, jinak lokálně.' },
  { name: 'Kuta & Seminyak jako program', reason: 'Traffic, turistické pasti, předražené bary. Jako hlavní program se nevyplatí.' },
  { name: 'Předražené atrakce (lanovky, ATV, vodní parky)', reason: 'Cokoliv nad ~€20/os co by bylo 5 min zábavy. Příroda je tu zdarma a lepší.' },
  { name: 'Lempuyang "Gates" tour balíčky', reason: 'Cestovky prodávají za $50+. Pokud jedete, jeďte sami Grabem — a zvažte jestli vůbec.' },
  { name: 'Inscenované "kulturní vesnice"', reason: 'Balíčkové "cultural village" tour = nafouklá cena za zinscenovaný zážitek. Reálná vesnice Sidemen s průvodcem je lepší a levnější.' },
  { name: 'Bali Swing parky', reason: 'Houpačka nad palmami za 350k+ IDR. Fronta, 5 minut, fotka. Rýžové terasy zdarma mají lepší výhled.' },
]

export const days: DayPlan[] = [
  {
    day: 1, date: '8. května (čt)', area: 'Let', areaKey: 'travel',
    title: 'Odlet z Prahy',
    items: ['Check-in PRG T1 — let EY156 v 11:20', 'Přílet Abú Dhabí (AUH) 17:05 lokálního', 'Čekání na navazující let AUH → DPS'],
  },
  {
    day: 2, date: '9. května (pá)', area: 'Uluwatu', areaKey: 'uluwatu',
    title: 'Přílet na Bali → Uluwatu',
    items: ['Přílet DPS dopoledne', 'Grab/transfer do Uluwatu (~45 min)', 'Check-in do vily, bazén, odpočinek po letu', 'Večeře v lokálním warungu — nasi goreng na uvítanou'],
    logistics: 'Transfer DPS → Uluwatu: Grab ~120k IDR nebo Klook ~$15.',
    food: 'Lokální warung poblíž vily — nasi goreng / mie goreng. Nic fancy, odpočívejte.',
  },
  {
    day: 3, date: '10. května (so)', area: 'Uluwatu', areaKey: 'uluwatu',
    title: 'Plážový den',
    items: ['Ráno: Padang Padang Beach (příchod do 9:00)', 'Svačina z warungu u pláže', 'Odpoledne: Bingin Beach — surfing / pozorování', 'Západ slunce: Single Fin — Bintang + nachos na útesu'],
    food: 'Oběd: warung přímo u Bingin. Večeře: Single Fin burgery + sunset.',
  },
  {
    day: 4, date: '11. května (ne)', area: 'Uluwatu', areaKey: 'uluwatu',
    title: 'Chrám, Jimbaran & volejbal',
    items: ['Dopoledne: volno, bazén, procházka po útesech', 'Odpoledne: Dreamland Beach — beach volejbal session 🏐', '17:00: Chrám Uluwatu + Kecak dance při západu slunce', 'Večeře: Jimbaran Bay — grilovaná ryba na pláži'],
    tip: 'Jimbaran je 20 min od chrámu, ideální combo. Na Dreamland bývají skupinky hráčů odpoledne — přivezte míč.',
    food: 'Jimbaran seafood warungy — vyberete rybu, grilují na uhlích. Nohy v písku, západ slunce.',
  },
  {
    day: 5, date: '12. května (po)', area: 'Uluwatu', areaKey: 'uluwatu',
    title: 'Surf & chill',
    items: ['Ráno: surfová lekce Balangan Beach (~$25/os)', 'Oběd: Cashew Tree nebo warung', 'Odpoledne: bazén / balijská masáž (~150k IDR/hod)', 'Večeře: nasi campur warung'],
    food: 'Balijská masáž za 150k IDR / hodinu = povinnost, ne luxus.',
  },
  {
    day: 6, date: '13. května (út)', area: 'Uluwatu', areaKey: 'uluwatu',
    title: 'Nusa Penida / volný den',
    items: ['Varianta A: Nusa Penida — Kelingking, Angel\'s Billabong (celodenní, aktivní)', 'Varianta B: Melasti Beach + pohodový plážový den', 'Večer: balení, rozlučka s Bukit'],
    tip: 'Nusa Penida ~$35/os z Sanur. Hodně chůze a schody — aktivní den, ne ticket-farm. Alternativa: Amed snorkeling nechat na východ.',
    food: 'Na Nusa Penida oběd součástí tour. Jinak poslední warung dinner v Uluwatu.',
  },
  {
    day: 7, date: '14. května (st)', area: 'Přesun → Ubud', areaKey: 'ubud',
    title: 'Uluwatu → Ubud',
    items: ['Check-out dopoledne', 'Zastávka: Tirta Empul ráno po cestě (před tour busy!)', 'Check-in Ubud vila — skútr zdarma!', 'Odpoledne: Campuhan Ridge Walk', 'Večeře: Warung Biah Biah'],
    move: 'Uluwatu → Ubud: Grab ~300k IDR, 1,5–2 hodiny. Tirta Empul je po cestě — buďte tam do 10:00.',
    food: 'Warung Biah Biah: autentická balijská kuchyně, lokální oblíbenec. 40–60k IDR.',
  },
  {
    day: 8, date: '15. května (čt)', area: 'Ubud', areaKey: 'ubud',
    title: 'Rýžové terasy & Monkey Forest',
    items: ['7:00: Tegallalang Rice Terraces (ranní klid, boční vstup)', '9:00: snídaně v warungu u teras', '10:00: Sacred Monkey Forest (ráno = méně lidí)', 'Odpoledne: Ubud centrum — Art Market, Royal Palace', 'Oběd: babi guling u Pak Malen'],
    food: 'Babi guling = must try. Pak Malen > turistická Ibu Oka. 40–60k IDR.',
  },
  {
    day: 9, date: '16. května (pá)', area: 'Ubud', areaKey: 'ubud',
    title: 'Vodopády & nudle',
    items: ['Ráno: Kanto Lampo vodopád skútrem (7:30 = sami!)', 'Dopoledne: Tegenungan Falls', 'Oběd: mie goreng + bakso polévka v centru', 'Odpoledne: procházka rýžovými poli kolem vily', 'Káva: Seniman Coffee Studio'],
    food: 'Nudlový den: mie goreng, bakso polévka ze stánku. Seniman na specialty kávu.',
  },
  {
    day: 10, date: '17. května (so)', area: 'Ubud', areaKey: 'ubud',
    title: 'Cooking class / Batur trek / skútr',
    items: [
      'Varianta A (aktivní): Mount Batur sunrise trek — odjezd 2:00, ~$40/os',
      'Varianta B (pohodová): skútr na kafé plantáže + vesnice severně od Ubud',
      'Varianta C (kultura): ranní trh (pasar) 6:00 + cooking class s lokální kuchařkou',
      'Odpoledne: odpočinek / Campuhan Ridge Walk #2 / batik workshop',
      'Večer: poslední Ubud večeře — gado-gado, tempe, sambal',
    ],
    tip: 'Cooking class: trh + vaření ~250–350k IDR/os, naučíte se nasi goreng a sambal od nuly. Batur trek: fyzicky OK ale vstávání ve 2 je hardcore.',
    food: 'Po cooking class máte oběd hotový. Na večeři warung — gado-gado & čerstvý džus.',
  },
  {
    day: 11, date: '18. května (ne)', area: 'Přesun → Východ', areaKey: 'east',
    title: 'Ubud → Karangasem',
    items: ['Check-out, vrácení skútru', 'Po cestě: Sidemen Valley viewpoint — fotky!', 'Check-in Abang/Sidemen vila', 'Odpoledne: procházka rýžovými poli kolem vily', 'Večeře: lokální warung — nasi campur s výhledem na Agung'],
    move: 'Ubud → Abang/Sidemen: Grab ~250k IDR, 1,5 hodiny. Krásná cesta přes kopce.',
    food: 'Warungy v Sidemen: malinké, rodinné, žádné menu — prostě to co vaří. Nejlepší jídlo na ostrově.',
  },
  {
    day: 12, date: '19. května (po)', area: 'Východní Bali', areaKey: 'east',
    title: 'Tirta Gangga & Virgin Beach',
    items: ['8:00: Tirta Gangga vodní palác (před tour busy)', 'Dopoledne: Virgin Beach — koupání + grilled fish na oběd', 'Odpoledne: Lempuyang? (viz tip — klidně vynechte) nebo zpět k bazénu', 'Večer: západ slunce s výhledem na Agung od vily'],
    tip: 'Lempuyang "brána": fronta 1–3h, podváděcí zrcadlo. Horní chrámy krásnější a prázdné. Klidně vynechte celé — Virgin Beach je lepší zážitek.',
    food: 'Virgin Beach warung: grilled fish přímo na pláži. Čerstvější nebude.',
  },
  {
    day: 13, date: '20. května (út)', area: 'Východní Bali', areaKey: 'east',
    title: 'Sidemen trek & subak kultura',
    items: ['Ráno: trek v Sidemen s lokálním průvodcem (3–4h)', 'Průvodce vysvětlí subak systém — UNESCO zavlažování rýžových polí', 'Oběd ve vesnici po treku — u rodiny průvodce', 'Odpoledne: bazén + odpočinek', 'Večer: hvězdná obloha — minimální světelný smog (zeptejte se na odalan!)'],
    tip: 'Zeptejte se průvodce, jestli v okolí neprobíhá chrámové výročí (odalan). Pokud ano, vezmou vás — nezapomenutelný zážitek.',
    food: 'Po treku vás průvodce zavede do rodinného warungu — nejautentičtější jídlo celého tripu.',
  },
  {
    day: 14, date: '21. května (st)', area: 'Východní Bali', areaKey: 'east',
    title: 'Amed & poslední den',
    items: ['Dopoledne: Amed — snorkeling z pláže (masky 50k IDR)', 'Oběd: grilled fish na pláži v Amed', 'Odpoledne: volno, bazén, balení', 'Večer: rozlučková večeře'],
    tip: 'Amed 30 min od Abang. Snorkeling přímo z břehu — žádná loď, žádný ticket, jen korály. Alternativa k Nusa Penida.',
    food: 'Amed warungy na pláži: fish grill, cold Bintang. Lepší rozlučku nenajdete.',
  },
  {
    day: 15, date: '22. května (čt)', area: 'Odlet', areaKey: 'travel',
    title: 'Odjezd z Bali',
    items: ['Dopoledne: check-out, poslední nákupy', 'Odpoledne: přejezd do DPS (~2–2,5h z Abang)', 'Večer: let DPS → AUH'],
    logistics: 'Abang → DPS: Grab ~350k IDR. Vyjeďte s velkou rezervou — silnice nepředvídatelné!',
    move: 'Let EY155 z AUH startuje 23.5. v 00:50 — musíte být na DPS včas na navazující let.',
  },
  {
    day: 16, date: '23. května (pá)', area: 'Let', areaKey: 'travel',
    title: 'Návrat domů',
    items: ['Let EY155 AUH → PRG, odlet 00:50, přílet 07:05', 'Doma v pátek ráno — celý víkend na zotavení z jet lagu'],
  },
]

export const areaColors: Record<string, { bg: string; border: string; text: string; accent: string; badge: string; gradient: string }> = {
  uluwatu: { bg: 'bg-ocean-50', border: 'border-ocean-200', text: 'text-ocean-700', accent: 'bg-ocean-500', badge: 'bg-ocean-100 text-ocean-700 border border-ocean-200', gradient: 'from-ocean-400 to-ocean-600' },
  ubud: { bg: 'bg-jungle-50', border: 'border-jungle-200', text: 'text-jungle-700', accent: 'bg-jungle-500', badge: 'bg-jungle-100 text-jungle-700 border border-jungle-200', gradient: 'from-jungle-400 to-jungle-600' },
  east: { bg: 'bg-lava-50', border: 'border-lava-200', text: 'text-lava-700', accent: 'bg-lava-500', badge: 'bg-lava-100 text-lava-700 border border-lava-200', gradient: 'from-lava-400 to-lava-600' },
  travel: { bg: 'bg-sand-50', border: 'border-sand-200', text: 'text-sand-700', accent: 'bg-sand-500', badge: 'bg-sand-100 text-sand-700 border border-sand-200', gradient: 'from-sand-400 to-sand-600' },
}

export const areaLabels: Record<string, string> = {
  uluwatu: 'Uluwatu',
  ubud: 'Ubud',
  east: 'Východní Bali',
}

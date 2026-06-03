export type Route = {
  from: string
  to: string
  fare: number
}

// ── ALL STOPS ──
export const STOPS: string[] = [
  // Station → New Baridih route
  'Station',
  'Jamipol',
  'Burma Mines',
  'Tube Gate',
  'Cable Town',
  'A.B.M College',
  'Tinplate',
  // Shared stops (both routes)
  'New Baridih',
  'Baridih',
  // New Baridih → Sakchi route
  'Vidyapati Nagar',
  'Sidgora',
  'Agrico',
  'Bhalubasa',
  'Kasasdih',
  'Baradwari',
  'Sakchi',
]

export const ROUTES: Route[] = [

  // ══════════════════════════════════════
  // ROUTE 1 — Station → New Baridih
  // ══════════════════════════════════════

  // From Station
  { from: 'Station', to: 'Jamipol',        fare: 10 },
  { from: 'Station', to: 'Burma Mines',    fare: 10 },
  { from: 'Station', to: 'Tube Gate',      fare: 12 },
  { from: 'Station', to: 'Cable Town',     fare: 15 },
  { from: 'Station', to: 'A.B.M College',  fare: 15 },
  { from: 'Station', to: 'Tinplate',       fare: 20 },
  { from: 'Station', to: 'New Baridih',    fare: 30 },
  { from: 'Station', to: 'Baridih',        fare: 30 },

  // From Jamipol
  { from: 'Jamipol', to: 'Burma Mines',    fare: 10 },
  { from: 'Jamipol', to: 'Tube Gate',      fare: 10 },
  { from: 'Jamipol', to: 'Cable Town',     fare: 15 },
  { from: 'Jamipol', to: 'A.B.M College',  fare: 15 },
  { from: 'Jamipol', to: 'Tinplate',       fare: 20 },
  { from: 'Jamipol', to: 'New Baridih',    fare: 30 },
  { from: 'Jamipol', to: 'Baridih',        fare: 30 },

  // From Burma Mines
  { from: 'Burma Mines', to: 'Tube Gate',      fare: 10 },
  { from: 'Burma Mines', to: 'Cable Town',     fare: 12 },
  { from: 'Burma Mines', to: 'A.B.M College',  fare: 15 },
  { from: 'Burma Mines', to: 'Tinplate',       fare: 20 },
  { from: 'Burma Mines', to: 'New Baridih',    fare: 30 },
  { from: 'Burma Mines', to: 'Baridih',        fare: 30 },

  // From Tube Gate
  { from: 'Tube Gate', to: 'Cable Town',     fare: 10 },
  { from: 'Tube Gate', to: 'A.B.M College',  fare: 12 },
  { from: 'Tube Gate', to: 'Tinplate',       fare: 15 },
  { from: 'Tube Gate', to: 'New Baridih',    fare: 20 },
  { from: 'Tube Gate', to: 'Baridih',        fare: 20 },

  // From Cable Town
  { from: 'Cable Town', to: 'A.B.M College',  fare: 10 },
  { from: 'Cable Town', to: 'Tinplate',       fare: 10 },
  { from: 'Cable Town', to: 'New Baridih',    fare: 12 },
  { from: 'Cable Town', to: 'Baridih',        fare: 15 },

  // From A.B.M College
  { from: 'A.B.M College', to: 'Tinplate',    fare: 10 },
  { from: 'A.B.M College', to: 'New Baridih', fare: 12 },
  { from: 'A.B.M College', to: 'Baridih',     fare: 15 },

  // From Tinplate
  { from: 'Tinplate', to: 'New Baridih', fare: 10 },
  { from: 'Tinplate', to: 'Baridih',     fare: 12 },

  // ══════════════════════════════════════
  // ROUTE 2 — New Baridih → Sakchi
  // ══════════════════════════════════════

  // From New Baridih
  { from: 'New Baridih', to: 'Baridih',          fare: 10 },
  { from: 'New Baridih', to: 'Vidyapati Nagar',  fare: 10 },
  { from: 'New Baridih', to: 'Sidgora',          fare: 12 },
  { from: 'New Baridih', to: 'Agrico',           fare: 12 },
  { from: 'New Baridih', to: 'Bhalubasa',        fare: 15 },
  { from: 'New Baridih', to: 'Kasasdih',         fare: 15 },
  { from: 'New Baridih', to: 'Baradwari',        fare: 15 },
  { from: 'New Baridih', to: 'Sakchi',           fare: 15 },

  // From Baridih
  { from: 'Baridih', to: 'Vidyapati Nagar',  fare: 10 },
  { from: 'Baridih', to: 'Sidgora',          fare: 12 },
  { from: 'Baridih', to: 'Agrico',           fare: 12 },
  { from: 'Baridih', to: 'Bhalubasa',        fare: 12 },
  { from: 'Baridih', to: 'Kasasdih',         fare: 15 },
  { from: 'Baridih', to: 'Baradwari',        fare: 15 },
  { from: 'Baridih', to: 'Sakchi',           fare: 15 },

  // From Vidyapati Nagar
  { from: 'Vidyapati Nagar', to: 'Sidgora',      fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Agrico',       fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Bhalubasa',    fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Kasasdih',     fare: 12 },
  { from: 'Vidyapati Nagar', to: 'Baradwari',    fare: 15 },
  { from: 'Vidyapati Nagar', to: 'Sakchi',       fare: 15 },

  // From Sidgora
  { from: 'Sidgora', to: 'Agrico',      fare: 10 },
  { from: 'Sidgora', to: 'Bhalubasa',   fare: 10 },
  { from: 'Sidgora', to: 'Kasasdih',    fare: 12 },
  { from: 'Sidgora', to: 'Baradwari',   fare: 15 },
  { from: 'Sidgora', to: 'Sakchi',      fare: 15 },

  // From Agrico
  { from: 'Agrico', to: 'Bhalubasa',  fare: 10 },
  { from: 'Agrico', to: 'Kasasdih',   fare: 10 },
  { from: 'Agrico', to: 'Baradwari',  fare: 12 },
  { from: 'Agrico', to: 'Sakchi',     fare: 12 },

  // From Bhalubasa
  { from: 'Bhalubasa', to: 'Kasasdih',  fare: 10 },
  { from: 'Bhalubasa', to: 'Baradwari', fare: 10 },
  { from: 'Bhalubasa', to: 'Sakchi',    fare: 12 },

  // From Kasasdih
  { from: 'Kasasdih', to: 'Baradwari', fare: 10 },
  { from: 'Kasasdih', to: 'Sakchi',    fare: 10 },

  // From Baradwari
  { from: 'Baradwari', to: 'Sakchi', fare: 10 },
]

// ── GET FARE (bidirectional) ──
export function getFare(from: string, to: string): number | null {
  const n = (s: string) => s.trim().toLowerCase()
  const match = ROUTES.find(
    (r) =>
      (n(r.from) === n(from) && n(r.to) === n(to)) ||
      (n(r.from) === n(to)   && n(r.to) === n(from))
  )
  return match ? match.fare : null
}

// ── GET ALL ROUTES FROM A STOP ──
export function getRoutesFrom(stop: string): Route[] {
  const n = (s: string) => s.trim().toLowerCase()
  return ROUTES.filter(
    (r) => n(r.from) === n(stop) || n(r.to) === n(stop)
  ).map((r) =>
    n(r.from) === n(stop)
      ? r
      : { from: stop, to: r.from, fare: r.fare }
  )
}

// ── SEARCH STOPS BY KEYWORD ──
export function searchStops(query: string): string[] {
  if (!query.trim()) return []
  const n = query.trim().toLowerCase()
  return STOPS.filter((stop) => stop.toLowerCase().includes(n))
}

// ── GET ROUTE NAME FOR A STOP ──
export function getRouteName(stop: string): string {
  const stationRoute = [
    'Station','Jamipol','Burma Mines','Tube Gate',
    'Cable Town','A.B.M College','Tinplate',
  ]
  const sakchiRoute = [
    'Vidyapati Nagar','Sidgora','Agrico',
    'Bhalubasa','Kasasdih','Baradwari','Sakchi',
  ]
  const shared = ['New Baridih','Baridih']

  if (stationRoute.includes(stop)) return 'Station → New Baridih'
  if (sakchiRoute.includes(stop))  return 'New Baridih → Sakchi'
  if (shared.includes(stop))       return 'Both Routes'
  return ''
}
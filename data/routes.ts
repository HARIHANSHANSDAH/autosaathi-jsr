export type Route = {
  from: string
  to: string
  fare: number
}

// ── FIND INDIRECT ROUTE ──
export function findIndirectRoute(
  from: string,
  to: string
): IndirectRoute[] {
  const n = (s: string) => s.trim().toLowerCase()
  const results: IndirectRoute[] = []

  const fromRoutes = getRoutesFrom(from)

  fromRoutes.forEach((leg1) => {
    const via = n(leg1.from) === n(from) ? leg1.to : leg1.from
    const leg2Fare = getFare(via, to)

    if (
      leg2Fare !== null &&
      n(via) !== n(from) &&
      n(via) !== n(to)
    ) {
      results.push({
        via,
        leg1: { from, to: via, fare: leg1.fare },
        leg2: { from: via, to, fare: leg2Fare },
        totalFare: leg1.fare + leg2Fare,
      })
    }
  })

  return results.sort((a, b) => a.totalFare - b.totalFare)

}

export const STOPS: string[] = [

  'Tatanagar Station',
  'Jamipol',
  'Burma Mines',
  'Tube Gate',
  'Cable Town',
  'A.B.M College',
  'Tinplate',
  'New Baridih',
  'Baridih',
  'Vidyapati Nagar',
  'Sidgora',
  'Agrico',
  'Bhalubasa',
  'Kasasdih',
  'Baradwari',
  'Sakchi',
  'Golmuri Circle',
  'Howrah Bridge',
  'Kashidih Circle',
  'Court',
  'Mango Bus Stand',
  'Mango Chowk',
  'Dimna Chowk',
  'Golpahari',
  'Parsudih',
  'Azad Nagar',
  'Chepapul',
  'Pardih Chowk', 
  'Bagunhatu',
  'Baridih Basti',
  'Mercy Hospital',
  'JRD Tata Sports Complex',
  'Dhatkidih',
  'Kadma',
  'General Office',
  'Bistupur',
  'P&M Mall',
  "Women's College (Bistupur)",
  'S Type More',
  'Adityapur Toll Bridge',
  'DVC More',
  'Gamharia',
  'Kandra',
  'Jugsalai',
  'Golmuri',
  'Nildih',
  'Railway Station',

  'Sonari Aerodrome',
  'Kagalnagar',
  'KPS School Kadma',
  'Kharangajhar Plaza',
  'Jemco'
]

export const ROUTES: Route[] = [

  { from: 'Tatanagar Station', to: 'Jamipol',        fare: 10 },
  { from: 'Tatanagar Station', to: 'Burma Mines',    fare: 10 },
  { from: 'Tatanagar Station', to: 'Tube Gate',      fare: 12 },
  { from: 'Tatanagar Station', to: 'Cable Town',     fare: 15 },
  { from: 'Tatanagar Station', to: 'A.B.M College',  fare: 15 },
  { from: 'Tatanagar Station', to: 'Tinplate',       fare: 20 },
  { from: 'Tatanagar Station', to: 'New Baridih',    fare: 30 },
  { from: 'Tatanagar Station', to: 'Baridih',        fare: 30 },

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


  //  New Baridih to Sakchi
  { from: 'New Baridih', to: 'Baridih',          fare: 10 },
  { from: 'New Baridih', to: 'Vidyapati Nagar',  fare: 10 },
  { from: 'New Baridih', to: 'Sidgora',          fare: 15 },
  { from: 'New Baridih', to: 'Agrico',           fare: 15 },
  { from: 'New Baridih', to: 'Bhalubasa',        fare: 15 },
  { from: 'New Baridih', to: 'Kasasdih',         fare: 15 },
  { from: 'New Baridih', to: 'Baradwari',        fare: 20 },
  { from: 'New Baridih', to: 'Sakchi',           fare: 20 },

  // From Baridih
  { from: 'Baridih', to: 'Vidyapati Nagar',  fare: 10 },
  { from: 'Baridih', to: 'Sidgora',          fare: 15 },
  { from: 'Baridih', to: 'Agrico',           fare: 15 },
  { from: 'Baridih', to: 'Bhalubasa',        fare: 15 },
  { from: 'Baridih', to: 'Kasasdih',         fare: 15 },
  { from: 'Baridih', to: 'Baradwari',        fare: 20 },
  { from: 'Baridih', to: 'Sakchi',           fare: 20 },

  // From Vidyapati Nagar
  { from: 'Vidyapati Nagar', to: 'Sidgora',      fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Agrico',       fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Bhalubasa',    fare: 10 },
  { from: 'Vidyapati Nagar', to: 'Kasasdih',     fare: 15 },
  { from: 'Vidyapati Nagar', to: 'Baradwari',    fare: 20 },
  { from: 'Vidyapati Nagar', to: 'Sakchi',       fare: 20 },

  // From Sidgora
  { from: 'Sidgora', to: 'Agrico',      fare: 10 },
  { from: 'Sidgora', to: 'Bhalubasa',   fare: 10 },
  { from: 'Sidgora', to: 'Kasasdih',    fare: 15 },
  { from: 'Sidgora', to: 'Baradwari',   fare: 15 },
  { from: 'Sidgora', to: 'Sakchi',      fare: 15 },

  // From Agrico
  { from: 'Agrico', to: 'Bhalubasa',  fare: 10 },
  { from: 'Agrico', to: 'Kasasdih',   fare: 10 },
  { from: 'Agrico', to: 'Baradwari',  fare: 15 },
  { from: 'Agrico', to: 'Sakchi',     fare: 15 },

  // From Bhalubasa
  { from: 'Bhalubasa', to: 'Kasasdih',  fare: 15 },
  { from: 'Bhalubasa', to: 'Baradwari', fare: 15 },
  { from: 'Bhalubasa', to: 'Sakchi',    fare: 15 },

  // From Kasasdih
  { from: 'Kasasdih', to: 'Baradwari', fare: 10 },
  { from: 'Kasasdih', to: 'Sakchi',    fare: 10 },

  // From Baradwari
  { from: 'Baradwari', to: 'Sakchi', fare: 10 },

 // Station to Sakchi

 // From Tatanagar Station
  { from: 'Tatanagar Station', to: 'Burma Mines',      fare: 10 },
  { from: 'Tatanagar Station', to: 'Golmuri Circle',   fare: 15 },
  { from: 'Tatanagar Station', to: 'Howrah Bridge',    fare: 15 },
  { from: 'Tatanagar Station', to: 'Kashidih Circle',  fare: 20 },
  { from: 'Tatanagar Station', to: 'Sakchi',           fare: 20 },

  // From Burma Mines
  { from: 'Burma Mines', to: 'Golmuri Circle',   fare: 10 },
  { from: 'Burma Mines', to: 'Howrah Bridge',    fare: 15 },
  { from: 'Burma Mines', to: 'Kashidih Circle',  fare: 15 },
  { from: 'Burma Mines', to: 'Sakchi',           fare: 20 },

  // From Golmuri Circle
  { from: 'Golmuri Circle', to: 'Howrah Bridge',   fare: 10 },
  { from: 'Golmuri Circle', to: 'Kashidih Circle', fare: 10 },
  { from: 'Golmuri Circle', to: 'Sakchi',          fare: 15 },

  // From Howrah Bridge
  { from: 'Howrah Bridge', to: 'Kashidih Circle', fare: 10 },
  { from: 'Howrah Bridge', to: 'Sakchi',          fare: 10 },

  // From Kashidih Circle
  { from: 'Kashidih Circle', to: 'Sakchi', fare: 10 },


 // Sakchi to Dimna Chowk

  { from: 'Sakchi', to: 'Court',          fare: 10 },
  { from: 'Sakchi', to: 'Mango Bus Stand', fare: 10 },
  { from: 'Sakchi', to: 'Mango Chowk',    fare: 15 },
  { from: 'Sakchi', to: 'Dimna Chowk',    fare: 15 },

  // From Court
  { from: 'Court', to: 'Mango Bus Stand', fare: 10 },
  { from: 'Court', to: 'Mango Chowk',     fare: 15 },
  { from: 'Court', to: 'Dimna Chowk',     fare: 15 },

  // From Mango Bus Stand
  { from: 'Mango Bus Stand', to: 'Mango Chowk', fare: 10 },
  { from: 'Mango Bus Stand', to: 'Dimna Chowk', fare: 15 },

  // From Mango Chowk
  { from: 'Mango Chowk', to: 'Dimna Chowk', fare: 15 },

  { from: 'Tatanagar Station', to : 'Golpahari', fare: 10},
  { from: 'Tatanagar Station', to : 'Parsudih', fare: 15},

  { from: 'Golpahari', to : 'Parsudih', fare: 10},


    // From Sakchi to Pardih Chowk
  { from: 'Sakchi', to: 'Court',           fare: 10 },
  { from: 'Sakchi', to: 'Mango Bus Stand', fare: 10 },
  { from: 'Sakchi', to: 'Mango Chowk',     fare: 15 },
  { from: 'Sakchi', to: 'Azad Nagar',      fare: 15 },
  { from: 'Sakchi', to: 'Chepapul',        fare: 20 },
  { from: 'Sakchi', to: 'Pardih Chowk',    fare: 25 },

  // From Court
  { from: 'Court', to: 'Mango Bus Stand', fare: 10 },
  { from: 'Court', to: 'Mango Chowk',     fare: 15 },
  { from: 'Court', to: 'Azad Nagar',      fare: 15 },
  { from: 'Court', to: 'Chepapul',        fare: 20 },
  { from: 'Court', to: 'Pardih Chowk',    fare: 25 },

  // From Mango Bus Stand
  { from: 'Mango Bus Stand', to: 'Mango Chowk',  fare: 10 },
  { from: 'Mango Bus Stand', to: 'Azad Nagar',   fare: 15 },
  { from: 'Mango Bus Stand', to: 'Chepapul',     fare: 15 },
  { from: 'Mango Bus Stand', to: 'Pardih Chowk', fare: 20 },

  // From Mango Chowk
  { from: 'Mango Chowk', to: 'Azad Nagar',   fare: 10 },
  { from: 'Mango Chowk', to: 'Chepapul',     fare: 15 },
  { from: 'Mango Chowk', to: 'Pardih Chowk', fare: 20 },

  // From Azad Nagar
  { from: 'Azad Nagar', to: 'Chepapul',     fare: 10 },
  { from: 'Azad Nagar', to: 'Pardih Chowk', fare: 20 },

  // From Chepapul
  { from: 'Chepapul', to: 'Pardih Chowk', fare: 10 },


  // From Sakchi To Bistupur to Railway Station
  { from: 'Sakchi', to: 'General Office',   fare: 10 },
  { from: 'Sakchi', to: 'Bistupur',         fare: 15 },
  { from: 'Sakchi', to: 'Jugsalai',         fare: 25 },
  { from: 'Sakchi', to: 'Railway Station',  fare: 35 },

  // From General Office
  { from: 'General Office', to: 'Bistupur',        fare: 10 },
  { from: 'General Office', to: 'Jugsalai',        fare: 25 },
  { from: 'General Office', to: 'Railway Station', fare: 35 },

  // From Bistupur
  { from: 'Bistupur', to: 'Jugsalai',        fare: 20 },
  { from: 'Bistupur', to: 'Railway Station', fare: 25 },

  // From Jugsalai
  { from: 'Jugsalai', to: 'Railway Station', fare: 15 },


  // From Sakchi to Kandra
  { from: 'Sakchi', to: "Women's College (Bistupur)", fare: 20 },
  { from: 'Sakchi', to: 'S Type More',                fare: 25 },
  { from: 'Sakchi', to: 'Adityapur Toll Bridge',      fare: 35 },
  { from: 'Sakchi', to: 'DVC More',                   fare: 35 },
  { from: 'Sakchi', to: 'Gamharia',                   fare: 45 },
  { from: 'Sakchi', to: 'Kandra',                     fare: 60 },

  // From Women's College (Bistupur)
  { from: "Women's College (Bistupur)", to: 'S Type More',           fare: 20 },
  { from: "Women's College (Bistupur)", to: 'Adityapur Toll Bridge', fare: 30 },
  { from: "Women's College (Bistupur)", to: 'DVC More',              fare: 35 },
  { from: "Women's College (Bistupur)", to: 'Gamharia',              fare: 45 },
  { from: "Women's College (Bistupur)", to: 'Kandra',                fare: 60 },

  // From S Type More
  { from: 'S Type More', to: 'Adityapur Toll Bridge', fare: 15 },
  { from: 'S Type More', to: 'DVC More',              fare: 25 },
  { from: 'S Type More', to: 'Gamharia',              fare: 35 },
  { from: 'S Type More', to: 'Kandra',                fare: 50 },

  // From Adityapur Toll Bridge
  { from: 'Adityapur Toll Bridge', to: 'DVC More',  fare: 10 },
  { from: 'Adityapur Toll Bridge', to: 'Gamharia',  fare: 25 },
  { from: 'Adityapur Toll Bridge', to: 'Kandra',    fare: 35 },

  // From DVC More
  { from: 'DVC More', to: 'Gamharia', fare: 25 },
  { from: 'DVC More', to: 'Kandra',   fare: 40 },

  // From Gamharia
  { from: 'Gamharia', to: 'Kandra', fare: 30 },



  // From Sakchi to Kadma
  { from: 'Sakchi', to: 'JRD Tata Sports Complex', fare: 10 },
  { from: 'Sakchi', to: 'Dhatkidih',               fare: 15 },
  { from: 'Sakchi', to: 'Kadma',                   fare: 20 },

  // From JRD Tata Sports Complex
  { from: 'JRD Tata Sports Complex', to: 'Dhatkidih', fare: 15 },
  { from: 'JRD Tata Sports Complex', to: 'Kadma',     fare: 15 },

  // From Dhatkidih
  { from: 'Dhatkidih', to: 'Kadma', fare: 10 },


   // From Sakchi to Nildih
  { from: 'Sakchi', to: 'Golmuri',  fare: 15 },
  { from: 'Sakchi', to: 'Tinplate', fare: 20 },
  { from: 'Sakchi', to: 'Nildih',   fare: 20 },

  // From Golmuri
  { from: 'Golmuri', to: 'Tinplate', fare: 10 },
  { from: 'Golmuri', to: 'Nildih',   fare: 15 },

  // From Tinplate
  { from: 'Tinplate', to: 'Nildih', fare: 10 },


  //Sakchi to Bagunhatu
  { from: 'Sakchi', to:'Bagunhatu', fare: 20},

  { from: 'Bagunhatu', to:'Baradwari', fare: 20},
  { from: 'Bagunhatu', to:'Kasasdih', fare: 15},
  { from: 'Bagunhatu', to:'Bhalubasa', fare: 15},
  { from: 'Bagunhatu', to:'Agrico', fare: 15},
  { from: 'Bagunhatu', to:'Sidgora', fare: 15},
  
  //Sakchi to Baridhi Basti
  { from: 'Sakchi', to:'Baridih Basti', fare: 25},

  { from: 'Baridih Basti', to:'Baradwari', fare:25},
  { from: 'Baridih Basti', to:'Kasasdih', fare:20},
  { from: 'Baridih Basti', to:'Bhalubasa', fare:20},
  { from: 'Baridih Basti', to:'Agrico', fare:15},
  { from: 'Baridih Basti', to:'Sidgora', fare:15},
  { from: 'Baridih Basti', to:'Vidyapati Nagar', fare:15},
  { from: 'Baridih Basti', to:'Baridih', fare:10},

  // Sakchi to Others places
  { from: 'Sakchi', to:'Baridih Basti', fare: 25},  

  { from: 'Sakchi', to:'Sonari Aerodrome', fare: 15},
  { from: 'Sakchi', to:'Kagalnagar', fare: 20},
  { from: 'Sakchi', to:'KPS School Kadma', fare: 25},
  { from: 'Sakchi', to:'Kharangajhar Plaza', fare: 25},
  { from: 'Sakchi', to:'Jemco', fare: 30},

  { from: 'Sakchi', to:'P&M Mall', fare: 25},
  { from: 'Bistupur', to:'P&M Mall', fare: 20},
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
  const route1 = ['Tatanagar Station','Jamipol','Burma Mines','Tube Gate','Cable Town','A.B.M College','Tinplate']
  const route2 = ['Vidyapati Nagar','Sidgora','Agrico','Bhalubasa','Kasasdih','Baradwari']
  const route3 = ['Tatanagar Station','Golmuri Circle','Howrah Bridge','Kashidih Circle']
  const route4 = ['Court','Mango Bus Stand','Mango Chowk','Dimna Chowk']
  const route5 = ['Tatanagar Station', 'Golpahari','Parsudih']
  const route6 = ['Sakchi','Azad Nagar','Chepapul','Pardih Chowk']
  const route7 = ['General Office','Bistupur','Jugsalai','Railway Station']
  const route8 = ["Women's College (Bistupur)", 'S Type More', 'Adityapur Toll Bridge', 'DVC Mor', 'Gamharia', 'Kandra',]
  const route9 = ['JRD Tata Sports Complex', 'Dhatkidih', 'Kadma']
  const route10 = ['Golmuri', 'Tinplate','Nildih']
  const route11 = ['Vidyapati Nagar','Sidgora','Agrico','Bhalubasa','Kasasdih','Baradwari','Baridih Basti']
  const route12 = ['Sidgora','Agrico','Bhalubasa','Kasasdih','Baradwari','Bagunhatu']
  const shared = ['New Baridih','Baridih','Sakchi']

  if (route1.includes(stop)) return 'Tatanagar Station → New Baridih'
  if (route2.includes(stop)) return 'New Baridih → Sakchi'
  if (route3.includes(stop)) return 'Tatanagar Station → Sakchi'
  if (route4.includes(stop)) return 'Sakchi → Dimna Chowk'
  if (route5.includes(stop)) return 'Tatanagar Station → Parsudih'
  if (route6.includes(stop)) return 'Sakchi → Pardih Chowk'
  if (route7.includes(stop)) return 'Sakchi → Railway Station'
  if (route8.includes(stop)) return 'Sakchi → Kandra'
  if (route9.includes(stop)) return 'Sakchi → Kadma'
  if (route10.includes(stop)) return 'Sakchi → Nildih'
  if (route11.includes(stop)) return 'Sakchi → Baridih Basti'
  if (route12.includes(stop)) return 'Sakchi → Bagunhatu'
  if (shared.includes(stop)) return 'Multiple Routes'
  return ''
}



// ── INDIRECT ROUTE TYPE ──
export type IndirectRoute = {
  via: string
  leg1: { from: string; to: string; fare: number }
  leg2: { from: string; to: string; fare: number }
  totalFare: number
}


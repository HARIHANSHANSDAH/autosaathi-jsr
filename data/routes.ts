export type Route = {
  from: string
  to: string
  fare: number
  km: number
}


export type IndirectRoute = {
  via: string
  via2?: string  // ← second change point (optional)
  leg1: { from: string; to: string; fare: number }
  leg2: { from: string; to: string; fare: number }
  leg3?: { from: string; to: string; fare: number }  // ← third leg (optional)
  totalFare: number
  changes: number  // ← how many changes
}

// export function findIndirectRoute(
//   from: string,
//   to: string
// ): IndirectRoute[] {
//   const n = (s: string) => s.trim().toLowerCase()
//   const results: IndirectRoute[] = []
//   const seen = new Set<string>()

//   const fromRoutes = getRoutesFrom(from)

//   // ── 1 CHANGE (2 legs) ──
//   fromRoutes.forEach((leg1) => {
//     const via = n(leg1.from) === n(from) ? leg1.to : leg1.from
//     if (n(via) === n(from) || n(via) === n(to)) return

//     const leg2Fare = getFare(via, to)

//     if (leg2Fare !== null) {
//       const key = `${n(via)}`
//       if (!seen.has(key)) {
//         seen.add(key)
//         results.push({
//           via,
//           leg1: { from, to: via, fare: leg1.fare },
//           leg2: { from: via, to, fare: leg2Fare },
//           totalFare: leg1.fare + leg2Fare,
//           changes: 1,
//         })
//       }
//     }

//     // ── 2 CHANGES (3 legs) ──
//     const viaRoutes = getRoutesFrom(via)
//     viaRoutes.forEach((leg2) => {
//       const via2 = n(leg2.from) === n(via) ? leg2.to : leg2.from

//       if (
//         n(via2) === n(from) ||
//         n(via2) === n(to)   ||
//         n(via2) === n(via)
//       ) return

//       const leg3Fare = getFare(via2, to)

//       if (leg3Fare !== null) {
//         const key = `${n(via)}-${n(via2)}`
//         if (!seen.has(key)) {
//           seen.add(key)
//           results.push({
//             via,
//             via2,
//             leg1: { from,  to: via,  fare: leg1.fare  },
//             leg2: { from: via,  to: via2, fare: leg2.fare  },
//             leg3: { from: via2, to,    fare: leg3Fare  },
//             totalFare: leg1.fare + leg2.fare + leg3Fare,
//             changes: 2,
//           })
//         }
//       }
//     })
//   })

//   // Sort by total fare, then by number of changes
//   return results.sort((a, b) => {
//     if (a.totalFare !== b.totalFare) return a.totalFare - b.totalFare
//     return a.changes - b.changes
//   })
// }

export function findIndirectRoute(
  from: string,
  to: string
): IndirectRoute[] {
  const n = (s: string) => s.trim().toLowerCase()
  const results: IndirectRoute[] = []
  const seen = new Set<string>()

  // ── KEY FIX: if direct route exists, return empty ──
  const directFare = getFare(from, to)
  if (directFare !== null) return []

  const fromRoutes = getRoutesFrom(from)

  // ── 1 CHANGE ──
  fromRoutes.forEach((leg1) => {
    const via = n(leg1.from) === n(from) ? leg1.to : leg1.from
    if (n(via) === n(from) || n(via) === n(to)) return

    const leg2Fare = getFare(via, to)
    if (leg2Fare === null) return

    // ── FIX: skip if via is further away than destination ──
    // Skip if total fare is more than 3x the direct fare would be
    if (leg1.fare > leg2Fare * 2) return

    const key = n(via)
    if (seen.has(key)) return
    seen.add(key)

    results.push({
      via,
      leg1: { from, to: via, fare: leg1.fare },
      leg2: { from: via, to, fare: leg2Fare },
      totalFare: leg1.fare + leg2Fare,
      changes: 1,
    })
  })

  // ── 2 CHANGES (only if no 1-change found) ──
  if (results.length === 0) {
    fromRoutes.forEach((leg1) => {
      const via = n(leg1.from) === n(from) ? leg1.to : leg1.from
      if (n(via) === n(from) || n(via) === n(to)) return

      const viaRoutes = getRoutesFrom(via)
      viaRoutes.forEach((leg2) => {
        const via2 = n(leg2.from) === n(via) ? leg2.to : leg2.from

        if (
          n(via2) === n(from) ||
          n(via2) === n(to)   ||
          n(via2) === n(via)
        ) return

        // ── FIX: skip backwards routes ──
        const backtrack = getFare(via2, from)
        if (backtrack !== null && backtrack < leg1.fare) return

        // ── FIX: skip if via2 has direct route to from ──
        const directVia2ToFrom = getFare(from, via2)
        if (directVia2ToFrom !== null && directVia2ToFrom < leg1.fare + leg2.fare) return

        const leg3Fare = getFare(via2, to)
        if (leg3Fare === null) return

        const key = `${n(via)}-${n(via2)}`
        if (seen.has(key)) return
        seen.add(key)

        results.push({
          via,
          via2,
          leg1: { from,  to: via,  fare: leg1.fare  },
          leg2: { from: via,  to: via2, fare: leg2.fare },
          leg3: { from: via2, to,       fare: leg3Fare  },
          totalFare: leg1.fare + leg2.fare + leg3Fare,
          changes: 2,
        })
      })
    })
  }

  return results
    .sort((a, b) => {
      if (a.changes !== b.changes) return a.changes - b.changes
      if (a.totalFare !== b.totalFare) return a.totalFare - b.totalFare
      return a.leg1.fare - b.leg1.fare
    })
    .slice(0, 3)
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

  'Sonari Aerodrome',
  'Kagalnagar',
  'KPS School Kadma',
  'Kharangajhar Plaza',
  'Jemco'
]
{/*
export const ROUTES: Route[] = [

  { from: 'Tatanagar Station', to: 'Jamipol',        fare: 10 },
  { from: 'Tatanagar Station', to: 'Burma Mines',    fare: 10 },
  { from: 'Tatanagar Station', to: 'Tube Gate',      fare: 15 },
  { from: 'Tatanagar Station', to: 'Cable Town',     fare: 15 },
  { from: 'Tatanagar Station', to: 'A.B.M College',  fare: 20 },
  { from: 'Tatanagar Station', to: 'Tinplate',       fare: 30 },
  { from: 'Tatanagar Station', to: 'New Baridih',    fare: 40 },
  { from: 'Tatanagar Station', to: 'Baridih',        fare: 40 },

  // From Jamipol
  { from: 'Jamipol', to: 'Burma Mines',    fare: 10 },
  { from: 'Jamipol', to: 'Tube Gate',      fare: 10 },
  { from: 'Jamipol', to: 'Cable Town',     fare: 15 },
  { from: 'Jamipol', to: 'A.B.M College',  fare: 20 },
  { from: 'Jamipol', to: 'Tinplate',       fare: 30 },
  { from: 'Jamipol', to: 'New Baridih',    fare: 40 },
  { from: 'Jamipol', to: 'Baridih',        fare: 40 },

  // From Burma Mines
  { from: 'Burma Mines', to: 'Tube Gate',      fare: 10 },
  { from: 'Burma Mines', to: 'Cable Town',     fare: 15 },
  { from: 'Burma Mines', to: 'A.B.M College',  fare: 20 },
  { from: 'Burma Mines', to: 'Tinplate',       fare: 30 },
  { from: 'Burma Mines', to: 'New Baridih',    fare: 40 },
  { from: 'Burma Mines', to: 'Baridih',        fare: 40 },

  // From Tube Gate
  { from: 'Tube Gate', to: 'Cable Town',     fare: 10 },
  { from: 'Tube Gate', to: 'A.B.M College',  fare: 15 },
  { from: 'Tube Gate', to: 'Tinplate',       fare: 20 },
  { from: 'Tube Gate', to: 'New Baridih',    fare: 30 },
  { from: 'Tube Gate', to: 'Baridih',        fare: 30 },

  // From Cable Town
  { from: 'Cable Town', to: 'A.B.M College',  fare: 10 },
  { from: 'Cable Town', to: 'Tinplate',       fare: 15 },
  { from: 'Cable Town', to: 'New Baridih',    fare: 20 },
  { from: 'Cable Town', to: 'Baridih',        fare: 25 },

  // From A.B.M College
  { from: 'A.B.M College', to: 'Tinplate',    fare: 10 },
  { from: 'A.B.M College', to: 'New Baridih', fare: 15 },
  { from: 'A.B.M College', to: 'Baridih',     fare: 20 },

  // From Tinplate
  { from: 'Tinplate', to: 'New Baridih', fare: 20 },
  { from: 'Tinplate', to: 'Baridih',     fare: 20 },


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


  // From Sakchi To Bistupur to Tatanagar Stataion
  { from: 'Sakchi', to: 'General Office',   fare: 10 },
  { from: 'Sakchi', to: 'Bistupur',         fare: 15 },
  { from: 'Sakchi', to: 'Jugsalai',         fare: 25 },
  { from: 'Sakchi', to: 'Tatanagar Stataion',  fare: 35 },

  // From General Office
  { from: 'General Office', to: 'Bistupur',        fare: 10 },
  { from: 'General Office', to: 'Jugsalai',        fare: 25 },
  { from: 'General Office', to: 'Tatanagar Stataion', fare: 35 },

  // From Bistupur
  { from: 'Bistupur', to: 'Jugsalai',        fare: 20 },
  { from: 'Bistupur', to: 'Tatanagar Stataion', fare: 25 },

  // From Jugsalai
  { from: 'Jugsalai', to: 'Tatanagar Stataion', fare: 15 },


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


*/}

export const ROUTES: Route[] = [
  { from: 'Tatanagar Station', to: 'Jamipol',       fare: 10, km: 1.5 },
  { from: 'Tatanagar Station', to: 'Burma Mines',    fare: 10, km: 2.0 },
  { from: 'Tatanagar Station', to: 'Tube Gate',      fare: 15, km: 3.5 },
  { from: 'Tatanagar Station', to: 'Cable Town',     fare: 15, km: 5.0 },
  { from: 'Tatanagar Station', to: 'A.B.M College',  fare: 20, km: 6.5 },
  { from: 'Tatanagar Station', to: 'Tinplate',       fare: 30, km: 7.5 },
  { from: 'Tatanagar Station', to: 'New Baridih',    fare: 40, km: 9.0 },
  { from: 'Tatanagar Station', to: 'Baridih',        fare: 40, km: 9.5 },

  // From Jamipol
  { from: 'Jamipol', to: 'Burma Mines',    fare: 10, km: 1.5 },
  { from: 'Jamipol', to: 'Tube Gate',      fare: 10, km: 2.0 },
  { from: 'Jamipol', to: 'Cable Town',     fare: 15, km: 3.2 },
  { from: 'Jamipol', to: 'A.B.M College',  fare: 20, km: 4.5 },
  { from: 'Jamipol', to: 'Tinplate',       fare: 30, km: 5.5 },
  { from: 'Jamipol', to: 'New Baridih',    fare: 40, km: 7.0 },
  { from: 'Jamipol', to: 'Baridih',        fare: 40, km: 7.5 },

  // From Burma Mines
  { from: 'Burma Mines', to: 'Tube Gate',      fare: 10, km: 1.8 },
  { from: 'Burma Mines', to: 'Cable Town',     fare: 15, km: 2.5 },
  { from: 'Burma Mines', to: 'A.B.M College',  fare: 20, km: 3.8 },
  { from: 'Burma Mines', to: 'Tinplate',       fare: 30, km: 4.8 },
  { from: 'Burma Mines', to: 'New Baridih',    fare: 40, km: 6.2 },
  { from: 'Burma Mines', to: 'Baridih',        fare: 40, km: 6.8 },

  // From Tube Gate
  { from: 'Tube Gate', to: 'Cable Town',     fare: 10, km: 1.2 },
  { from: 'Tube Gate', to: 'A.B.M College',  fare: 15, km: 2.2 },
  { from: 'Tube Gate', to: 'Tinplate',       fare: 20, km: 3.2 },
  { from: 'Tube Gate', to: 'New Baridih',    fare: 30, km: 4.5 },
  { from: 'Tube Gate', to: 'Baridih',        fare: 30, km: 5.0 },

  // From Cable Town
  { from: 'Cable Town', to: 'A.B.M College',  fare: 10, km: 1.0 },
  { from: 'Cable Town', to: 'Tinplate',       fare: 15, km: 2.0 },
  { from: 'Cable Town', to: 'New Baridih',    fare: 20, km: 3.5 },
  { from: 'Cable Town', to: 'Baridih',        fare: 25, km: 4.0 },

  // From A.B.M College
  { from: 'A.B.M College', to: 'Tinplate',    fare: 10, km: 1.5 },
  { from: 'A.B.M College', to: 'New Baridih', fare: 15, km: 2.8 },
  { from: 'A.B.M College', to: 'Baridih',      fare: 20, km: 3.2 },

  // From Tinplate
  { from: 'Tinplate', to: 'New Baridih', fare: 20, km: 2.2 },
  { from: 'Tinplate', to: 'Baridih',      fare: 20, km: 2.5 },

  // New Baridih to Sakchi
  { from: 'New Baridih', to: 'Baridih',          fare: 10, km: 1.0 },
  { from: 'New Baridih', to: 'Vidyapati Nagar',  fare: 10, km: 1.5 },
  { from: 'New Baridih', to: 'Sidgora',          fare: 15, km: 2.5 },
  { from: 'New Baridih', to: 'Agrico',           fare: 15, km: 3.5 },
  { from: 'New Baridih', to: 'Bhalubasa',        fare: 15, km: 4.5 },
  { from: 'New Baridih', to: 'Kasasdih',         fare: 15, km: 5.0 },
  { from: 'New Baridih', to: 'Baradwari',        fare: 20, km: 5.5 },
  { from: 'New Baridih', to: 'Sakchi',           fare: 20, km: 6.5 },

  // From Baridih
  { from: 'Baridih', to: 'Vidyapati Nagar',  fare: 10, km: 1.2 },
  { from: 'Baridih', to: 'Sidgora',          fare: 15, km: 2.2 },
  { from: 'Baridih', to: 'Agrico',           fare: 15, km: 3.2 },
  { from: 'Baridih', to: 'Bhalubasa',        fare: 15, km: 4.2 },
  { from: 'Baridih', to: 'Kasasdih',         fare: 15, km: 4.8 },
  { from: 'Baridih', to: 'Baradwari',        fare: 20, km: 5.2 },
  { from: 'Baridih', to: 'Sakchi',           fare: 20, km: 6.2 },

  // From Vidyapati Nagar
  { from: 'Vidyapati Nagar', to: 'Sidgora',      fare: 10, km: 1.0 },
  { from: 'Vidyapati Nagar', to: 'Agrico',       fare: 10, km: 2.0 },
  { from: 'Vidyapati Nagar', to: 'Bhalubasa',    fare: 10, km: 3.0 },
  { from: 'Vidyapati Nagar', to: 'Kasasdih',     fare: 15, km: 3.8 },
  { from: 'Vidyapati Nagar', to: 'Baradwari',    fare: 20, km: 4.2 },
  { from: 'Vidyapati Nagar', to: 'Sakchi',       fare: 20, km: 5.2 },

  // From Sidgora
  { from: 'Sidgora', to: 'Agrico',      fare: 10, km: 1.2 },
  { from: 'Sidgora', to: 'Bhalubasa',    fare: 10, km: 2.2 },
  { from: 'Sidgora', to: 'Kasasdih',     fare: 15, km: 3.0 },
  { from: 'Sidgora', to: 'Baradwari',    fare: 15, km: 3.5 },
  { from: 'Sidgora', to: 'Sakchi',       fare: 15, km: 4.5 },

  // From Agrico
  { from: 'Agrico', to: 'Bhalubasa',  fare: 10, km: 1.0 },
  { from: 'Agrico', to: 'Kasasdih',   fare: 10, km: 2.2 },
  { from: 'Agrico', to: 'Baradwari',  fare: 15, km: 2.5 },
  { from: 'Agrico', to: 'Sakchi',     fare: 15, km: 3.5 },

  // From Bhalubasa
  { from: 'Bhalubasa', to: 'Kasasdih',  fare: 15, km: 1.5 },
  { from: 'Bhalubasa', to: 'Baradwari', fare: 15, km: 1.8 },
  { from: 'Bhalubasa', to: 'Sakchi',    fare: 15, km: 2.5 },

  // From Kasasdih
  { from: 'Kasasdih', to: 'Baradwari', fare: 10, km: 1.0 },
  { from: 'Kasasdih', to: 'Sakchi',    fare: 10, km: 1.8 },

  // From Baradwari
  { from: 'Baradwari', to: 'Sakchi', fare: 10, km: 1.2 },

  // Station to Sakchi via Golmuri
  { from: 'Tatanagar Station', to: 'Burma Mines',      fare: 10, km: 3.0 },
  { from: 'Tatanagar Station', to: 'Golmuri Circle',   fare: 15, km: 5.5 },
  { from: 'Tatanagar Station', to: 'Howrah Bridge',    fare: 15, km: 6.8 },
  { from: 'Tatanagar Station', to: 'Kashidih Circle',  fare: 20, km: 7.5 },
  { from: 'Tatanagar Station', to: 'Sakchi',           fare: 20, km: 8.5 },

  // From Burma Mines
  { from: 'Burma Mines', to: 'Golmuri Circle',   fare: 10, km: 2.5 },
  { from: 'Burma Mines', to: 'Howrah Bridge',    fare: 15, km: 3.8 },
  { from: 'Burma Mines', to: 'Kashidih Circle',  fare: 15, km: 4.5 },
  { from: 'Burma Mines', to: 'Sakchi',           fare: 20, km: 5.5 },

  // From Golmuri Circle
  { from: 'Golmuri Circle', to: 'Howrah Bridge',   fare: 10, km: 1.5 },
  { from: 'Golmuri Circle', to: 'Kashidih Circle', fare: 10, km: 2.2 },
  { from: 'Golmuri Circle', to: 'Sakchi',           fare: 15, km: 3.2 },

  // From Howrah Bridge
  { from: 'Howrah Bridge', to: 'Kashidih Circle', fare: 10, km: 1.0 },
  { from: 'Howrah Bridge', to: 'Sakchi',           fare: 10, km: 1.8 },

  // From Kashidih Circle
  { from: 'Kashidih Circle', to: 'Sakchi', fare: 10, km: 1.2 },

  // Sakchi to Dimna Chowk
  { from: 'Sakchi', to: 'Court',           fare: 10, km: 1.5 },
  { from: 'Sakchi', to: 'Mango Bus Stand', fare: 10, km: 2.5 },
  { from: 'Sakchi', to: 'Mango Chowk',     fare: 15, km: 3.2 },
  { from: 'Sakchi', to: 'Dimna Chowk',     fare: 15, km: 6.5 },

  // From Court
  { from: 'Court', to: 'Mango Bus Stand', fare: 10, km: 1.5 },
  { from: 'Court', to: 'Mango Chowk',     fare: 15, km: 2.2 },
  { from: 'Court', to: 'Dimna Chowk',     fare: 15, km: 5.5 },

  // From Mango Bus Stand
  { from: 'Mango Bus Stand', to: 'Mango Chowk', fare: 10, km: 1.0 },
  { from: 'Mango Bus Stand', to: 'Dimna Chowk', fare: 15, km: 4.2 },

  // From Mango Chowk
  { from: 'Mango Chowk', to: 'Dimna Chowk', fare: 15, km: 3.5 },

  { from: 'Tatanagar Station', to: 'Golpahari', fare: 10, km: 1.5 },
  { from: 'Tatanagar Station', to: 'Parsudih',  fare: 15, km: 3.0 },

  { from: 'Golpahari', to: 'Parsudih', fare: 10, km: 1.8 },

  // From Sakchi to Pardih Chowk
  { from: 'Sakchi', to: 'Azad Nagar',       fare: 15, km: 5.5 },
  { from: 'Sakchi', to: 'Chepapul',         fare: 20, km: 6.8 },
  { from: 'Sakchi', to: 'Pardih Chowk',     fare: 25, km: 8.5 },

  // From Court (to Pardih)
  { from: 'Court', to: 'Azad Nagar',       fare: 15, km: 4.5 },
  { from: 'Court', to: 'Chepapul',         fare: 20, km: 5.8 },
  { from: 'Court', to: 'Pardih Chowk',     fare: 25, km: 7.5 },

  // From Mango Bus Stand (to Pardih)
  { from: 'Mango Bus Stand', to: 'Azad Nagar',   fare: 15, km: 3.2 },
  { from: 'Mango Bus Stand', to: 'Chepapul',     fare: 15, km: 4.5 },
  { from: 'Mango Bus Stand', to: 'Pardih Chowk', fare: 20, km: 6.2 },

  // From Mango Chowk (to Pardih)
  { from: 'Mango Chowk', to: 'Azad Nagar',   fare: 10, km: 2.5 },
  { from: 'Mango Chowk', to: 'Chepapul',     fare: 15, km: 3.8 },
  { from: 'Mango Chowk', to: 'Pardih Chowk', fare: 20, km: 5.5 },

  // From Azad Nagar
  { from: 'Azad Nagar', to: 'Chepapul',     fare: 10, km: 1.5 },
  { from: 'Azad Nagar', to: 'Pardih Chowk', fare: 20, km: 3.2 },

  // From Chepapul
  { from: 'Chepapul', to: 'Pardih Chowk', fare: 10, km: 1.8 },

  // From Sakchi To Bistupur to Tatanagar Station
  { from: 'Sakchi', to: 'General Office',     fare: 10, km: 2.2 },
  { from: 'Sakchi', to: 'Bistupur',           fare: 15, km: 4.0 },
  { from: 'Sakchi', to: 'Jugsalai',           fare: 25, km: 6.5 },
  { from: 'Sakchi', to: 'Tatanagar Station',  fare: 35, km: 8.5 },

  // From General Office
  { from: 'General Office', to: 'Bistupur',         fare: 10, km: 1.8 },
  { from: 'General Office', to: 'Jugsalai',         fare: 25, km: 4.5 },
  { from: 'General Office', to: 'Tatanagar Station', fare: 35, km: 6.5 },

  // From Bistupur
  { from: 'Bistupur', to: 'Jugsalai',         fare: 20, km: 2.8 },
  { from: 'Bistupur', to: 'Tatanagar Station', fare: 25, km: 4.8 },

  // From Jugsalai
  { from: 'Jugsalai', to: 'Tatanagar Station', fare: 15, km: 2.2 },

  // From Sakchi to Kandra
  { from: 'Sakchi', to: "Women's College (Bistupur)", fare: 20, km: 4.2 },
  { from: 'Sakchi', to: 'S Type More',                fare: 25, km: 7.5 },
  { from: 'Sakchi', to: 'Adityapur Toll Bridge',      fare: 35, km: 6.0 }, // alternative route
  { from: 'Sakchi', to: 'DVC More',                    fare: 35, km: 9.5 },
  { from: 'Sakchi', to: 'Gamharia',                    fare: 45, km: 14.0 },
  { from: 'Sakchi', to: 'Kandra',                      fare: 60, km: 23.0 },

  // From Women's College (Bistupur)
  { from: "Women's College (Bistupur)", to: 'S Type More',           fare: 20, km: 3.5 },
  { from: "Women's College (Bistupur)", to: 'Adityapur Toll Bridge', fare: 30, km: 2.5 },
  { from: "Women's College (Bistupur)", to: 'DVC More',              fare: 35, km: 5.5 },
  { from: "Women's College (Bistupur)", to: 'Gamharia',              fare: 45, km: 10.0 },
  { from: "Women's College (Bistupur)", to: 'Kandra',                fare: 60, km: 19.0 },

  // From S Type More
  { from: 'S Type More', to: 'Adityapur Toll Bridge', fare: 15, km: 2.0 },
  { from: 'S Type More', to: 'DVC More',              fare: 25, km: 2.5 },
  { from: 'S Type More', to: 'Gamharia',              fare: 35, km: 6.5 },
  { from: 'S Type More', to: 'Kandra',                fare: 50, km: 15.5 },

  // From Adityapur Toll Bridge
  { from: 'Adityapur Toll Bridge', to: 'DVC More',  fare: 10, km: 3.5 },
  { from: 'Adityapur Toll Bridge', to: 'Gamharia',  fare: 25, km: 8.0 },
  { from: 'Adityapur Toll Bridge', to: 'Kandra',    fare: 35, km: 17.0 },

  // From DVC More
  { from: 'DVC More', to: 'Gamharia', fare: 25, km: 4.5 },
  { from: 'DVC More', to: 'Kandra',   fare: 40, km: 13.5 },

  // From Gamharia
  { from: 'Gamharia', to: 'Kandra', fare: 30, km: 9.0 },

  // From Sakchi to Kadma
  { from: 'Sakchi', to: 'JRD Tata Sports Complex', fare: 10, km: 1.8 },
  { from: 'Sakchi', to: 'Dhatkidih',               fare: 15, km: 3.0 },
  { from: 'Sakchi', to: 'Kadma',                   fare: 20, km: 5.2 },

  // From JRD Tata Sports Complex
  { from: 'JRD Tata Sports Complex', to: 'Dhatkidih', fare: 15, km: 1.5 },
  { from: 'JRD Tata Sports Complex', to: 'Kadma',     fare: 15, km: 3.5 },

  // From Dhatkidih
  { from: 'Dhatkidih', to: 'Kadma', fare: 10, km: 2.2 },

  // From Sakchi to Nildih
  { from: 'Sakchi', to: 'Golmuri',  fare: 15, km: 4.0 },
  { from: 'Sakchi', to: 'Tinplate', fare: 20, km: 5.0 },
  { from: 'Sakchi', to: 'Nildih',   fare: 20, km: 6.5 },

  // From Golmuri
  { from: 'Golmuri', to: 'Tinplate', fare: 10, km: 1.2 },
  { from: 'Golmuri', to: 'Nildih',   fare: 15, km: 2.8 },

  // From Tinplate
  { from: 'Tinplate', to: 'Nildih', fare: 10, km: 1.6 },

  // Sakchi to Bagunhatu
  { from: 'Sakchi', to: 'Bagunhatu', fare: 20, km: 5.5 },

  { from: 'Bagunhatu', to: 'Baradwari', fare: 20, km: 4.5 },
  { from: 'Bagunhatu', to: 'Kasasdih',  fare: 15, km: 3.8 },
  { from: 'Bagunhatu', to: 'Bhalubasa', fare: 15, km: 3.0 },
  { from: 'Bagunhatu', to: 'Agrico',    fare: 15, km: 2.2 },
  { from: 'Bagunhatu', to: 'Sidgora',   fare: 15, km: 1.5 },
   
  // Sakchi to Baridih Basti
  { from: 'Sakchi', to: 'Baridih Basti', fare: 25, km: 7.2 },

  { from: 'Baridih Basti', to: 'Baradwari',        fare: 25, km: 6.0 },
  { from: 'Baridih Basti', to: 'Kasasdih',         fare: 20, km: 5.5 },
  { from: 'Baridih Basti', to: 'Bhalubasa',        fare: 20, km: 4.8 },
  { from: 'Baridih Basti', to: 'Agrico',           fare: 15, km: 3.8 },
  { from: 'Baridih Basti', to: 'Sidgora',          fare: 15, km: 2.8 },
  { from: 'Baridih Basti', to: 'Vidyapati Nagar',  fare: 15, km: 1.8 },
  { from: 'Baridih Basti', to: 'Baridih',          fare: 10, km: 1.2 },

  // Sakchi to Other places
  { from: 'Sakchi', to: 'Sonari Aerodrome',    fare: 15, km: 4.5 },
  { from: 'Sakchi', to: 'Kagalnagar',          fare: 20, km: 5.2 },
  { from: 'Sakchi', to: 'KPS School Kadma',    fare: 25, km: 6.0 },
  { from: 'Sakchi', to: 'Kharangajhar Plaza',  fare: 25, km: 9.0 },
  { from: 'Sakchi', to: 'Jemco',               fare: 30, km: 7.0 },

  { from: 'Sakchi', to: 'P&M Mall',   fare: 25, km: 6.5 },
  { from: 'Bistupur', to: 'P&M Mall', fare: 20, km: 4.8 },
];

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
      : { from: stop, to: r.from, fare: r.fare, km: r.km }
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
  const route7 = ['General Office','Bistupur','Jugsalai','Tatanagar Stataion']
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
  if (route7.includes(stop)) return 'Sakchi → Tatanagar Stataion'
  if (route8.includes(stop)) return 'Sakchi → Kandra'
  if (route9.includes(stop)) return 'Sakchi → Kadma'
  if (route10.includes(stop)) return 'Sakchi → Nildih'
  if (route11.includes(stop)) return 'Sakchi → Baridih Basti'
  if (route12.includes(stop)) return 'Sakchi → Bagunhatu'
  if (shared.includes(stop)) return 'Multiple Routes'
  return ''
}



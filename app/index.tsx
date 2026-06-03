import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { STOPS, getFare } from '../data/routes'

export default function HomeScreen() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([])
  const [toSuggestions, setToSuggestions] = useState<string[]>([])
  const [fareResult, setFareResult] = useState<number | null>(null)
  const [notFound, setNotFound] = useState(false)

  const getSuggestions = (input: string): string[] => {
    if (!input.trim()) return []
    return STOPS.filter((stop) =>
      stop.toLowerCase().includes(input.toLowerCase())
    )
  }

  const handleFromChange = (val: string) => {
    setFrom(val)
    setFareResult(null)
    setNotFound(false)
    setFromSuggestions(getSuggestions(val))
  }

  const handleToChange = (val: string) => {
    setTo(val)
    setFareResult(null)
    setNotFound(false)
    setToSuggestions(getSuggestions(val))
  }

  const selectFrom = (stop: string) => {
    setFrom(stop)
    setFromSuggestions([])
  }

  const selectTo = (stop: string) => {
    setTo(stop)
    setToSuggestions([])
  }

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    setFareResult(null)
    setNotFound(false)
  }

  const handleSearch = () => {
    if (!from.trim() || !to.trim()) return
    const fare = getFare(from, to)
    if (fare !== null) {
      setFareResult(fare)
      setNotFound(false)
    } else {
      setFareResult(null)
      setNotFound(true)
    }
  }

  const popularRoutes = [
    { from: 'New Baridih', to: 'Sakchi',      fare: 15 },
    { from: 'Sakchi',     to: 'New Baridih',      fare: 15 },
  ]

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#1B8C5E" barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🛺</Text>
            </View>
            <View>
              <Text style={styles.logoName}>AutoSaathi JSR</Text>
              <Text style={styles.logoSub}>Jamshedpur Auto Fare Guide</Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🟡 Live Fares</Text>
          </View>
        </View>

        {/* ── HERO TEXT ── */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Know your{' '}
            <Text style={styles.heroYellow}>auto fare</Text>
          </Text>
          <Text style={styles.heroTitle}>before you ride</Text>
          <Text style={styles.heroSub}>
            Accurate fares for every route in Jamshedpur
          </Text>
        </View>

        {/* ── SEARCH BOX ── */}
        <View style={styles.searchBox}>

          {/* FROM / TO row */}
          <View style={styles.searchRow}>

            {/* FROM */}
            <View style={styles.searchField}>
              <Text style={styles.searchLabel}>FROM</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="e.g. Baridih"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={from}
                onChangeText={handleFromChange}
              />
              {fromSuggestions.length > 0 && (
                <View style={styles.suggestions}>
                  {fromSuggestions.map((stop) => (
                    <TouchableOpacity
                      key={stop}
                      style={styles.suggestionItem}
                      onPress={() => selectFrom(stop)}
                    >
                      <Text style={styles.suggestionPin}>📍</Text>
                      <Text style={styles.suggestionText}>{stop}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Swap button */}
            <TouchableOpacity style={styles.swapBtn} onPress={handleSwap}>
              <Text style={styles.swapArrow}>→</Text>
            </TouchableOpacity>

            {/* TO */}
            <View style={styles.searchField}>
              <Text style={styles.searchLabel}>TO</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="e.g. Sakchi"
                placeholderTextColor="rgba(255,255,255,0.45)"
                value={to}
                onChangeText={handleToChange}
              />
              {toSuggestions.length > 0 && (
                <View style={styles.suggestions}>
                  {toSuggestions.map((stop) => (
                    <TouchableOpacity
                      key={stop}
                      style={styles.suggestionItem}
                      onPress={() => selectTo(stop)}
                    >
                      <Text style={styles.suggestionPin}>📍</Text>
                      <Text style={styles.suggestionText}>{stop}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

          </View>

          {/* Search button */}
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>Search Fare ↗</Text>
          </TouchableOpacity>

          {/* Fare result */}
          {fareResult !== null && (
            <View style={styles.fareResult}>
              <Text style={styles.fareAmount}>₹ {fareResult}</Text>
              <Text style={styles.fareLabel}>shared auto fare</Text>
            </View>
          )}

          {/* Not found */}
          {notFound && (
            <View style={styles.fareNotFound}>
              <Text style={styles.fareNotFoundText}>
                Route not found. Try different stops.
              </Text>
            </View>
          )}

        </View>


        {/* ── POPULAR ROUTES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          {popularRoutes.map((route, index) => (
            <TouchableOpacity
              key={index}
              style={styles.routeCard}
              onPress={() => {
                setFrom(route.from)
                setTo(route.to)
                setFareResult(route.fare)
                setNotFound(false)
              }}
            >
              <View style={styles.routeCardLeft}>
                <Text style={styles.routePath}>
                  {route.from}
                  <Text style={styles.routeArrow}> → </Text>
                  {route.to}
                </Text>
              </View>
              <View style={styles.farePill}>
                <Text style={styles.farePillText}>₹ {route.fare}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by Hari</Text>
          <Text style={styles.footerSub}>Jamshedpur, Jharkhand</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1B8C5E',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // ── HEADER ──
  header: {
    backgroundColor: '#1B8C5E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    width: 38,
    height: 38,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 20,
  },
  logoName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  logoSub: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
  },

  // ── HERO ──
  hero: {
    backgroundColor: '#1B8C5E',
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  heroYellow: {
    color: '#FFD166',
  },
  heroSub: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },

  // ── SEARCH BOX ──
  searchBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 10,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 12,
    zIndex:999,
    elevation: 999,

  },
  searchField: {
    flex: 1,
    position: 'relative',
    zIndex: 999,
    elevation: 999,
  },
  searchLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    fontWeight: '500',
  },
  swapBtn: {
    width: 36,
    height: 40,
    backgroundColor: '#E1F5EE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  swapArrow: {
    color: '#1B8C5E',
    fontSize: 16,
    fontWeight: '700',
  },

  // ── SUGGESTIONS ──
  suggestions: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 9999,
    zIndex: 9999,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    gap: 8,
  },
  suggestionPin: {
    fontSize: 13,
  },
  suggestionText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },

  // ── SEARCH BUTTON ──
  searchBtn: {
    backgroundColor: '#1B8C5E',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    zIndex: 1,
    elevation: 1,

  },
  searchBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',

  },

  // ── FARE RESULT ──
  fareResult: {
    marginTop: 12,
    backgroundColor: '#E1F5EE',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b2deca',
  },
  fareAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B8C5E',
  },
  fareLabel: {
    fontSize: 12,
    color: '#4a9e7e',
    marginTop: 2,
  },
  fareNotFound: {
    marginTop: 12,
    backgroundColor: '#fff3f3',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f5c0c0',
  },
  fareNotFoundText: {
    color: '#c0392b',
    fontSize: 13,
    textAlign: 'center',
  },

  // ── STATS ──
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B8C5E',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e8e8e8',
  },

  // ── POPULAR ROUTES ──
  section: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  routeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  routeCardLeft: {
    flex: 1,
  },
  routePath: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  routeArrow: {
    color: '#1B8C5E',
    fontWeight: '700',
  },
  farePill: {
    backgroundColor: '#E1F5EE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  farePillText: {
    color: '#085041',
    fontSize: 13,
    fontWeight: '600',
  },

  // ── FOOTER ──
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginTop: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  footerSub: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 3,
  },
})
import { Tabs } from 'expo-router'
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Modal, Linking } from 'react-native'
import { useState } from 'react'

// ── SOS MODAL COMPONENT ──
function SOSModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const contacts = [
    { name: 'Police',        number: '100',  emoji: '👮', color: '#1a4fa0', bg: '#e8f0fd', desc: 'Jamshedpur Police'   },
    { name: 'Ambulance',     number: '108',  emoji: '🚑', color: '#c0392b', bg: '#fdecea', desc: 'Emergency Ambulance' },
    { name: 'Fire Brigade',  number: '101',  emoji: '🚒', color: '#e67e22', bg: '#fef3e2', desc: 'Fire & Rescue'       },
    { name: 'Women Helpline',number: '1091', emoji: '👩', color: '#8e44ad', bg: '#f5eef8', desc: 'Women Safety'        },
    { name: 'Child Helpline',number: '1098', emoji: '🧒', color: '#16a085', bg: '#e8f8f5', desc: 'Child in Danger'     },
    { name: 'Disaster',      number: '1070', emoji: '🆘', color: '#c0392b', bg: '#fdecea', desc: 'National Disaster'   },
  ]

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={sos.overlay}>
        <View style={sos.box}>

          <View style={sos.header}>
            <View>
              <Text style={sos.title}>🆘 Emergency Help</Text>
              <Text style={sos.sub}>Tap any number to call instantly</Text>
            </View>
            <TouchableOpacity style={sos.closeBtn} onPress={onClose}>
              <Text style={sos.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {contacts.map((c) => (
            <TouchableOpacity
              key={c.number}
              style={sos.row}
              onPress={() => Linking.openURL(`tel:${c.number}`)}
            >
              <View style={[sos.icon, { backgroundColor: c.bg }]}>
                <Text style={{ fontSize: 20 }}>{c.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={sos.name}>{c.name}</Text>
                <Text style={sos.desc}>{c.desc}</Text>
              </View>
              <View style={[sos.callBtn, { backgroundColor: c.bg }]}>
                <Text style={[sos.callNum, { color: c.color }]}>{c.number}</Text>
                <Text style={[sos.callLabel, { color: c.color }]}>📞 Call</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={sos.tip}>
            <Text style={sos.tipText}>
              💡 Stay calm. Share your location with the operator.
            </Text>
          </View>

          <TouchableOpacity style={sos.closeFullBtn} onPress={onClose}>
            <Text style={sos.closeFullText}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  )
}

// ── CUSTOM TAB BAR ──
function CustomTabBar({ state, descriptors, navigation }: any) {
  const [sosVisible, setSosVisible] = useState(false)

  const handleSOS = () => {
    Vibration.vibrate([0, 200, 100, 200])
    setSosVisible(true)
  }

  const tabs = [
    { name: 'index',      label: 'Home',     emoji: '🏠' },
    { name: 'routes',     label: 'Routes',   emoji: '🗺️'  },
    { name: 'settings',   label: 'Settings', emoji: '⚙️'  },
  ]

  return (
    <>
      <SOSModal visible={sosVisible} onClose={() => setSosVisible(false)} />

      <View style={bar.container}>

        {/* Home tab */}
        {tabs.map((tab, index) => {
          const isFocused = state.index === index
          return (
            <TouchableOpacity
              key={tab.name}
              style={bar.tab}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Text style={bar.tabEmoji}>{tab.emoji}</Text>
              <Text style={[bar.tabLabel, isFocused && bar.tabLabelActive]}>
                {tab.label}
              </Text>
              {isFocused && <View style={bar.activeDot} />}
            </TouchableOpacity>
          )
        })}

        {/* SOS Button — center raised */}
        <TouchableOpacity style={bar.sosBtn} onPress={handleSOS}>
          <Text style={bar.sosEmoji}>🆘</Text>
        </TouchableOpacity>

      </View>
    </>
  )
}

// ── ROOT LAYOUT ──
export default function RootLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index"    options={{ headerShown: false }} />
      <Tabs.Screen name="routes"   options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  )
}

// ── STYLES ──
const bar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e8e8e8',
    paddingBottom: 16,
    paddingTop: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    position: 'relative',
    paddingVertical: 4,
  },
  tabEmoji: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#1B8C5E',
    fontWeight: '700',
  },
  activeDot: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1B8C5E',
  },

  // SOS raised button
  sosBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#e74c3c',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  sosEmoji: {
    fontSize: 20,
  },
  sosLabel: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '700',
    marginTop: 1,
  },
})

const sos = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  sub: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  desc: {
    fontSize: 11,
    color: '#888',
    marginTop: 1,
  },
  callBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 64,
  },
  callNum: {
    fontSize: 15,
    fontWeight: '700',
  },
  callLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 1,
  },
  tip: {
    backgroundColor: '#f7fdfb',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#d4ede3',
  },
  tipText: {
    fontSize: 12,
    color: '#1B8C5E',
    lineHeight: 18,
  },
  closeFullBtn: {
    marginTop: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  closeFullText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
})
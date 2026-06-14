'use client'
import { useState } from 'react'
import {
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [reportModal, setReportModal] = useState(false)
  const [aboutModal, setAboutModal] = useState(false)

  const handleReport = () => {
    Linking.openURL('mailto:autosaathijsr@gmail.com?subject=Report%20Issue&body=Describe%20your%20issue%20here...')
  }

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/91XXXXXXXXXX?text=Hi%20AutoSaathi%20JSR,%20I%20want%20to%20report%20an%20issue.')
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#1B8C5E" barStyle="light-content" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Text style={styles.headerSub}>AutoSaathi JSR v1.0.0</Text>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── ABOUT SECTION ── */}
        <Text style={styles.sectionLabel}>ABOUT</Text>
        <View style={styles.card}>

          <TouchableOpacity style={styles.row} onPress={() => setAboutModal(true)}>
            <View style={[styles.rowIcon, { backgroundColor: '#E1F5EE' }]}>
              <Text style={styles.rowEmoji}>🛺</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>About AutoSaathi JSR</Text>
              <Text style={styles.rowSub}>App info, version & mission</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('https://harihanshansdah.online')}
          >
            <View style={[styles.rowIcon, { backgroundColor: '#e8f0fd' }]}>
              <Text style={styles.rowEmoji}>🌐</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Visit Website</Text>
              <Text style={styles.rowSub}>harihanshansdah.online</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fef3e2' }]}>
              <Text style={styles.rowEmoji}>⭐</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Rate the App</Text>
              <Text style={styles.rowSub}>Love it? Give us 5 stars!</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#f5eef8' }]}>
              <Text style={styles.rowEmoji}>📋</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Privacy Policy</Text>
              <Text style={styles.rowSub}>How we handle your data</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* ── THEME SECTION ── */}
        <Text style={styles.sectionLabel}>THEME</Text>
        <View style={styles.card}>

          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#1a1a1a' }]}>
              <Text style={styles.rowEmoji}>🌙</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Dark Mode</Text>
              <Text style={styles.rowSub}>
                {darkMode ? 'Dark theme is ON' : 'Light theme is ON'}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#1B8C5E' }}
              thumbColor={darkMode ? '#fff' : '#fff'}
            />
          </View>

        </View>
        {/* ── REPORT SECTION ── */}
        <Text style={styles.sectionLabel}>REPORT</Text>
        <View style={styles.card}>

          <TouchableOpacity style={styles.row} onPress={() => setReportModal(true)}>
            <View style={[styles.rowIcon, { backgroundColor: '#fdecea' }]}>
              <Text style={styles.rowEmoji}>🚨</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Report Wrong Fare</Text>
              <Text style={styles.rowSub}>Help us keep fares accurate</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row} onPress={handleReport}>
            <View style={[styles.rowIcon, { backgroundColor: '#e8f0fd' }]}>
              <Text style={styles.rowEmoji}>🐛</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Report a Bug</Text>
              <Text style={styles.rowSub}>Something not working?</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#fef3e2' }]}>
              <Text style={styles.rowEmoji}>➕</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Suggest a Route</Text>
              <Text style={styles.rowSub}>Know a route we're missing?</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* ── MADE BY ── */}
        <View style={styles.madeBy}>
          <Text style={styles.madeByText}>Made with ❤️ by Hari</Text>
          <Text style={styles.madeByVersion}>AutoSaathi JSR v1.0.0 • Jamshedpur</Text>
        </View>

      </ScrollView>

      {/* ── ABOUT MODAL ── */}
      <Modal visible={aboutModal} animationType="slide" transparent onRequestClose={() => setAboutModal(false)}>
        <View style={modal.overlay}>
          <View style={modal.box}>
            <View style={modal.header}>
              <Text style={modal.title}>🛺 AutoSaathi JSR</Text>
              <TouchableOpacity style={modal.closeBtn} onPress={() => setAboutModal(false)}>
                <Text style={modal.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={modal.logoBox}>
              <Text style={{ fontSize: 48 }}>🛺</Text>
              <Text style={modal.appName}>AutoSaathi JSR</Text>
              <Text style={modal.version}>Version 1.0.0</Text>
            </View>

            {[
              { label: 'Developer',  value: 'Hari'              },
              { label: 'City',       value: 'Jamshedpur, Jharkhand' },
              { label: 'Routes',     value: '10+ routes covered' },
              { label: 'Min Fare',   value: '₹10'               },
              { label: 'Max Fare',   value: '₹60'              },
            ].map((item) => (
              <View key={item.label} style={modal.infoRow}>
                <Text style={modal.infoLabel}>{item.label}</Text>
                <Text style={modal.infoValue}>{item.value}</Text>
              </View>
            ))}

            <View style={modal.mission}>
              <Text style={modal.missionText}>
                🎯 Our mission is to make auto rickshaw travel fair and transparent for every commuter in Jamshedpur.
              </Text>
            </View>

            <TouchableOpacity style={modal.closeFullBtn} onPress={() => setAboutModal(false)}>
              <Text style={modal.closeFullText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── REPORT MODAL ── */}
      <Modal visible={reportModal} animationType="slide" transparent onRequestClose={() => setReportModal(false)}>
        <View style={modal.overlay}>
          <View style={modal.box}>
            <View style={modal.header}>
              <Text style={modal.title}>🚨 Report Issue</Text>
              <TouchableOpacity style={modal.closeBtn} onPress={() => setReportModal(false)}>
                <Text style={modal.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={modal.reportDesc}>
              How would you like to report the issue?
            </Text>

            {[
              { emoji: '📧', label: 'Send Email',    desc: 'autosaathijsr@gmail.com', fn: handleReport     },
              { emoji: '💬', label: 'WhatsApp',      desc: 'Chat with us directly',   fn: handleWhatsApp   },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={modal.reportOption}
                onPress={() => { opt.fn(); setReportModal(false) }}
              >
                <Text style={{ fontSize: 24 }}>{opt.emoji}</Text>
                <View>
                  <Text style={modal.reportOptionTitle}>{opt.label}</Text>
                  <Text style={modal.reportOptionDesc}>{opt.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={modal.closeFullBtn} onPress={() => setReportModal(false)}>
              <Text style={modal.closeFullText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#1B8C5E' },
  scroll:       { flex: 1, backgroundColor: '#f5f5f5' },
  header:       { backgroundColor: '#1B8C5E', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  headerTitle:  { fontSize: 22, fontWeight: '700', color: '#fff' },
  headerSub:    { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#888', letterSpacing: 1, marginTop: 20, marginBottom: 6, marginHorizontal: 16 },
  card:         { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 14, overflow: 'hidden', borderWidth: 0.5, borderColor: '#e8e8e8' },
  divider:      { height: 0.5, backgroundColor: '#f0f0f0', marginLeft: 68 },
  row:          { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  rowIcon:      { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowEmoji:     { fontSize: 18 },
  rowContent:   { flex: 1 },
  rowTitle:     { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  rowSub:       { fontSize: 11, color: '#888', marginTop: 1 },
  rowArrow:     { fontSize: 20, color: '#ccc', fontWeight: '300' },
  colorRow:     { flexDirection: 'row', gap: 8, marginTop: 10 },
  colorDot:     { width: 26, height: 26, borderRadius: 13 },
  colorDotActive: { borderWidth: 3, borderColor: '#fff', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  madeBy:       { alignItems: 'center', paddingVertical: 28 },
  madeByText:   { fontSize: 13, color: '#888', fontWeight: '500' },
  madeByVersion:{ fontSize: 11, color: '#aaa', marginTop: 3 },
})

const modal = StyleSheet.create({
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  box:              { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 32 },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title:            { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  closeBtn:         { width: 32, height: 32, backgroundColor: '#f0f0f0', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  closeBtnText:     { fontSize: 13, color: '#555', fontWeight: '600' },
  logoBox:          { alignItems: 'center', paddingVertical: 16 },
  appName:          { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginTop: 8 },
  version:          { fontSize: 12, color: '#888', marginTop: 4 },
  infoRow:          { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  infoLabel:        { fontSize: 13, color: '#888' },
  infoValue:        { fontSize: 13, fontWeight: '600', color: '#1a1a1a' },
  mission:          { backgroundColor: '#E1F5EE', borderRadius: 10, padding: 12, marginTop: 14 },
  missionText:      { fontSize: 13, color: '#085041', lineHeight: 20 },
  closeFullBtn:     { marginTop: 14, backgroundColor: '#f0f0f0', borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  closeFullText:    { fontSize: 14, fontWeight: '600', color: '#555' },
  reportDesc:       { fontSize: 13, color: '#888', marginBottom: 14 },
  reportOption:     { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#f7fdfb', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#d4ede3' },
  reportOptionTitle:{ fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  reportOptionDesc: { fontSize: 12, color: '#888', marginTop: 2 },
})
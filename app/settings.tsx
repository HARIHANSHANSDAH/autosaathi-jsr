'use client'
import { useState } from 'react';
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
} from 'react-native';
import { useTheme } from '../components/ThemeContext';

export default function SettingsScreen() {
  const { darkMode, setDarkMode, theme } = useTheme()
  
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
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.headerBg }]}>
      <StatusBar backgroundColor={theme.statusBar} barStyle="light-content" />

      {/* ── HEADER ── */}
      <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Text style={styles.headerSub}>AutoSaathi JSR v1.2.0</Text>
      </View>

      <ScrollView style={[styles.scroll, { backgroundColor: theme.bg }]} showsVerticalScrollIndicator={false}>

        {/* ── ABOUT SECTION ── */}
        <Text style={[styles.sectionLabel, { color: theme.subText }]}>ABOUT</Text>
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>

          <TouchableOpacity style={styles.row} onPress={() => setAboutModal(true)}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#E1F5EE' }]}>
              <Text style={styles.rowEmoji}>🛺</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>About AutoSaathi JSR</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>App info, version & mission</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL('https://harihanshansdah.online')}
          >
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#e8f0fd' }]}>
              <Text style={styles.rowEmoji}>🌐</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Visit Website</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>harihanshansdah.online</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#fef3e2' }]}>
              <Text style={styles.rowEmoji}>⭐</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Rate the App</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>Love it? Give us 5 stars!</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#f5eef8' }]}>
              <Text style={styles.rowEmoji}>📋</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Privacy Policy</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>How we handle your data</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* ── THEME SECTION ── */}
        <Text style={[styles.sectionLabel, { color: theme.subText }]}>THEME</Text>
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#333' : '#1a1a1a' }]}>
              <Text style={styles.rowEmoji}>🌙</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Dark Mode</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>
                {darkMode ? 'Dark theme is ON' : 'Light theme is ON'}
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#1B8C5E' }}
              thumbColor={darkMode ? '#FFD166' : '#e9e1e1'}
            />
          </View>
        </View>

        {/* ── REPORT SECTION ── */}
        <Text style={[styles.sectionLabel, { color: theme.subText }]}>REPORT</Text>
        <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>

          <TouchableOpacity style={styles.row} onPress={() => setReportModal(true)}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#fdecea' }]}>
              <Text style={styles.rowEmoji}>🚨</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Report Wrong Fare</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>Help us keep fares accurate</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <TouchableOpacity style={styles.row} onPress={handleReport}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#e8f0fd' }]}>
              <Text style={styles.rowEmoji}>🐛</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Report a Bug</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>Something not working?</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <TouchableOpacity style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: darkMode ? '#2c2c2c' : '#fef3e2' }]}>
              <Text style={styles.rowEmoji}>➕</Text>
            </View>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: theme.text }]}>Suggest a Route</Text>
              <Text style={[styles.rowSub, { color: theme.subText }]}>Know a route we're missing?</Text>
            </View>
            <Text style={styles.rowArrow}>›</Text>
          </TouchableOpacity>

        </View>

        {/* ── MADE BY ── */}
        <View style={styles.madeBy}>
          <Text style={[styles.madeByText, { color: theme.subText }]}>Made with ❤️ by Hari</Text>
          <Text style={styles.madeByVersion}>AutoSaathi JSR v1.2.0 • Jamshedpur</Text>
        </View>

      </ScrollView>

      {/* ── ABOUT MODAL ── */}
      <Modal visible={aboutModal} animationType="slide" transparent onRequestClose={() => setAboutModal(false)}>
        <View style={modal.overlay}>
          <View style={[modal.box, { backgroundColor: theme.modalBox }]}>
            <View style={modal.header}>
              <Text style={[modal.title, { color: theme.text }]}>🛺 About AutoSaathi JSR</Text>
              <TouchableOpacity style={[modal.closeBtn, { backgroundColor: theme.closeBtn }]} onPress={() => setAboutModal(false)}>
                <Text style={[modal.closeBtnText, { color: theme.closeText }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={modal.logoBox}>
              <Text style={{ fontSize: 48 }}>🛺</Text>
              <Text style={[modal.appName, { color: theme.text }]}>AutoSaathi JSR</Text>
              <Text style={[modal.version, { color: theme.subText }]}>Version 1.2.0</Text>
            </View>

            {[
              { label: 'Developer',  value: 'Hari'              },
              { label: 'City',       value: 'Jamshedpur, Jharkhand' },
              { label: 'Routes',     value: '10+ routes covered' },
              { label: 'Min Fare',   value: '₹10'               },
              { label: 'Max Fare',   value: '₹60'               },
            ].map((item) => (
              <View key={item.label} style={[modal.infoRow, { borderBottomColor: theme.border }]}>
                <Text style={[modal.infoLabel, { color: theme.subText }]}>{item.label}</Text>
                <Text style={[modal.infoValue, { color: theme.text }]}>{item.value}</Text>
              </View>
            ))}

            <View style={modal.mission}>
              <Text style={modal.missionText}>
                🎯 Our mission is to make auto rickshaw travel fair and transparent for every commuter in Jamshedpur.
              </Text>
            </View>

            <TouchableOpacity style={[modal.closeFullBtn, { backgroundColor: theme.closeBtn }]} onPress={() => setAboutModal(false)}>
              <Text style={[modal.closeFullText, { color: theme.closeText }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── REPORT MODAL ── */}
      <Modal visible={reportModal} animationType="slide" transparent onRequestClose={() => setReportModal(false)}>
        <View style={modal.overlay}>
          <View style={[modal.box, { backgroundColor: theme.modalBox }]}>
            <View style={modal.header}>
              <Text style={[modal.title, { color: theme.text }]}>🚨 Report Issue</Text>
              <TouchableOpacity style={[modal.closeBtn, { backgroundColor: theme.closeBtn }]} onPress={() => setReportModal(false)}>
                <Text style={[modal.closeBtnText, { color: theme.closeText }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={[modal.reportDesc, { color: theme.subText }]}>
              How would you like to report the issue?
            </Text>

            {[
              { emoji: '📧', label: 'Send Email',    desc: 'autosaathijsr@gmail.com', fn: handleReport     },
              { emoji: '💬', label: 'WhatsApp',      desc: 'Chat with us directly',   fn: handleWhatsApp   },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={[modal.reportOption, { backgroundColor: darkMode ? '#2c2c2c' : '#f7fdfb', borderColor: theme.border }]}
                onPress={() => { opt.fn(); setReportModal(false) }}
              >
                <Text style={{ fontSize: 24 }}>{opt.emoji}</Text>
                <View>
                  <Text style={[modal.reportOptionTitle, { color: theme.text }]}>{opt.label}</Text>
                  <Text style={[modal.reportOptionDesc, { color: theme.subText }]}>{opt.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[modal.closeFullBtn, { backgroundColor: theme.closeBtn }]} onPress={() => setReportModal(false)}>
              <Text style={[modal.closeFullText, { color: theme.closeText }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:         { flex: 1 },
  scroll:       { flex: 1 },
  header:       { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  headerTitle:  { fontSize: 22, fontWeight: '700', color: '#fff' },
  headerSub:    { fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 3 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginTop: 20, marginBottom: 6, marginHorizontal: 16 },
  card:         { marginHorizontal: 16, borderRadius: 14, overflow: 'hidden', borderWidth: 0.5 },
  divider:      { height: 0.5, marginLeft: 68 },
  row:          { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  rowIcon:      { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  rowEmoji:     { fontSize: 18 },
  rowContent:   { flex: 1 },
  rowTitle:     { fontSize: 14, fontWeight: '600' },
  rowSub:       { fontSize: 11, marginTop: 1 },
  rowArrow:     { fontSize: 20, color: '#ccc', fontWeight: '300' },
  madeBy:       { alignItems: 'center', paddingVertical: 28 },
  madeByText:   { fontSize: 13, fontWeight: '500' },
  madeByVersion:{ fontSize: 11, color: '#aaa', marginTop: 3 },
})

const modal = StyleSheet.create({
  overlay:          { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  box:              { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 32 },
  header:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title:            { fontSize: 18, fontWeight: '700' },
  closeBtn:         { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  closeBtnText:     { fontSize: 13, fontWeight: '600' },
  logoBox:          { alignItems: 'center', paddingVertical: 16 },
  appName:          { fontSize: 20, fontWeight: '700', marginTop: 8 },
  version:          { fontSize: 12, marginTop: 4 },
  infoRow:          { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5 },
  infoLabel:        { fontSize: 13 },
  infoValue:        { fontSize: 13, fontWeight: '600' },
  mission:          { backgroundColor: '#E1F5EE', borderRadius: 10, padding: 12, marginTop: 14 },
  missionText:      { fontSize: 13, color: '#085041', lineHeight: 20 },
  closeFullBtn:     { marginTop: 14, borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  closeFullText:    { fontSize: 14, fontWeight: '600' },
  reportDesc:       { fontSize: 13, marginBottom: 14 },
  reportOption:     { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1 },
  reportOptionTitle:{ fontSize: 14, fontWeight: '600' },
  reportOptionDesc: { fontSize: 12, marginTop: 2 },
})
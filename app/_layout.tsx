import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Linking, Modal, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
// 1. Import the global theme hook and provider
import { ThemeProvider, useTheme } from '../components/ThemeContext';

// ── SOS MODAL COMPONENT ──
function SOSModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  // 2. Consume the current theme styles inside the modal
  const { theme, darkMode } = useTheme();

  const contacts = [
    { name: 'Police',         number: '100',  emoji: '👮', color: '#1a4fa0', bg: '#e8f0fd', desc: 'Jamshedpur Police'   },
    { name: 'Ambulance',      number: '108',  emoji: '🚑', color: '#c0392b', bg: '#fdecea', desc: 'Emergency Ambulance' },
    { name: 'Fire Brigade',   number: '101',  emoji: '🚒', color: '#e67e22', bg: '#fef3e2', desc: 'Fire & Rescue'       },
    { name: 'Women Helpline', number: '1091', emoji: '👩', color: '#8e44ad', bg: '#f5eef8', desc: 'Women Safety'        },
    { name: 'Child Helpline', number: '1098', emoji: '🧒', color: '#16a085', bg: '#e8f8f5', desc: 'Child in Danger'     },
    { name: 'Disaster',       number: '1070', emoji: '🆘', color: '#c0392b', bg: '#fdecea', desc: 'National Disaster'   },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={sos.overlay}>
        {/* Dynamic modal container background color */}
        <View style={[sos.box, { backgroundColor: theme.modalBox }]}>

          <View style={sos.header}>
            <View>
              <Text style={[sos.title, { color: theme.text }]}>🆘 Emergency Help</Text>
              <Text style={[sos.sub, { color: theme.subText }]}>Tap any number to call instantly</Text>
            </View>
            <TouchableOpacity 
              style={[sos.closeBtn, { backgroundColor: theme.closeBtn }]} 
              onPress={onClose}
            >
              <Text style={[sos.closeBtnText, { color: theme.closeText }]}>✕</Text>
            </TouchableOpacity>
          </View>

          {contacts.map((c) => (
            <TouchableOpacity
              key={c.number}
              style={[sos.row, { borderBottomColor: theme.divider }]}
              onPress={() => Linking.openURL(`tel:${c.number}`)}
            >
              {/* If dark mode is on, we give the contact row icons a neutral background */}
              <View style={[sos.icon, { backgroundColor: darkMode ? '#2c2c2c' : c.bg }]}>
                <Text style={{ fontSize: 20 }}>{c.emoji}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[sos.name, { color: theme.text }]}>{c.name}</Text>
                <Text style={[sos.desc, { color: theme.subText }]}>{c.desc}</Text>
              </View>
              <View style={[sos.callBtn, { backgroundColor: darkMode ? '#2c2c2c' : c.bg }]}>
                <Text style={[sos.callNum, { color: darkMode ? '#ffffff' : c.color }]}>{c.number}</Text>
                <Text style={[sos.callLabel, { color: darkMode ? theme.subText : c.color }]}>📞 Call</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={[sos.tip, { backgroundColor: darkMode ? '#2c2c2c' : '#f7fdfb', borderColor: theme.border }]}>
            <Text style={sos.tipText}>
              💡 Stay calm. Share your location with the operator.
            </Text>
          </View>

          <TouchableOpacity 
            style={[sos.closeFullBtn, { backgroundColor: theme.closeBtn }]} 
            onPress={onClose}
          >
            <Text style={[sos.closeFullText, { color: theme.closeText }]}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

// ── CUSTOM TAB BAR ──
function CustomTabBar({ state, descriptors, navigation }: any) {
  const [sosVisible, setSosVisible] = useState(false);
  // 3. Consume theme inside custom tab controller
  const { theme, darkMode } = useTheme();

  const handleSOS = () => {
    Vibration.vibrate([0, 200, 100, 200]);
    setSosVisible(true);
  };

  const tabs = [
    { name: 'index',      label: 'Home',     emoji: '🏠' },
    { name: 'routes',     label: 'Routes',   emoji: '🗺️'  },
    { name: 'settings',   label: 'Settings', emoji: '⚙️'  },
  ];

  return (
    <>
      <SOSModal visible={sosVisible} onClose={() => setSosVisible(false)} />

      {/* Dynamic tab container styling */}
      <View style={[bar.container, { backgroundColor: theme.cardBg, borderTopColor: theme.border }]}>

        {tabs.map((tab, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={tab.name}
              style={bar.tab}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Text style={bar.tabEmoji}>{tab.emoji}</Text>
              <Text style={[
                bar.tabLabel, 
                { color: theme.subText }, 
                isFocused && bar.tabLabelActive
              ]}>
                {tab.label}
              </Text>
              {isFocused && <View style={bar.activeDot} />}
            </TouchableOpacity>
          );
        })}

        {/* SOS Button — center raised with white border adjusting slightly to clear dark layouts */}
        <TouchableOpacity 
          style={[bar.sosBtn, { borderColor: theme.cardBg }]} 
          onPress={handleSOS}
        >
          <Text style={bar.sosEmoji}>🆘</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

// ── INNER LAYOUT WRAPPER ──
// 4. Extracted core routing setup to consume ThemeProvider safely inside the export
function TabNavigator() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="index"    options={{ headerShown: false }} />
      <Tabs.Screen name="routes"   options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  );
}

// ── EXPORTED ROOT ENTRY ──
export default function RootLayout() {
  return (
    <ThemeProvider>
      <TabNavigator />
    </ThemeProvider>
  );
}

// ── STYLES ──
const bar = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
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
  },
  sosEmoji: {
    fontSize: 20,
  },
});

const sos = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'flex-end',
  },
  box: {
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
  },
  sub: {
    fontSize: 12,
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
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
  },
  desc: {
    fontSize: 11,
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
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    borderWidth: 1,
  },
  tipText: {
    fontSize: 12,
    color: '#1B8C5E',
    lineHeight: 18,
  },
  closeFullBtn: {
    marginTop: 14,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  closeFullText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
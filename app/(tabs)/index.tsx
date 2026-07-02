import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { IndirectRoute } from '../../data/routes';


const [indirectRoutes, setIndirectRoutes] = useState<IndirectRoute[]>([])

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  indirectContainer:  { marginTop: 12, gap: 10 },
indirectHeader:     { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
indirectIcon:       { fontSize: 22 },
indirectTitle:      { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },
indirectSub:        { fontSize: 11, color: '#888', marginTop: 1 },
indirectCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  borderWidth: 0.5,
  borderColor: '#e8e8e8',
  padding: 12,
  flexDirection: 'row',
  gap: 10,
  elevation: 2,
},
indirectNum: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: '#1B8C5E',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
},
indirectNumText:  { color: '#fff', fontSize: 11, fontWeight: '700' },
indirectBody:     { flex: 1, gap: 6 },
legRow:           { flexDirection: 'row', alignItems: 'center', gap: 8 },
legDot:           { width: 10, height: 10, borderRadius: 5, backgroundColor: '#1B8C5E', flexShrink: 0 },
legInfo:          { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
legRoute:         { fontSize: 12, fontWeight: '500', color: '#1a1a1a', flex: 1 },
legFare:          { fontSize: 12, fontWeight: '700', color: '#1B8C5E' },
changeRow:        { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 2 },
changeLine:       { flex: 1, height: 0.5, backgroundColor: '#e0e0e0' },
changeBadge:      { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
changeText:       { fontSize: 10, color: '#B45309', fontWeight: '600' },
totalRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#E1F5EE',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 6,
  marginTop: 4,
},
totalLabel:  { fontSize: 12, color: '#085041', fontWeight: '500' },
totalFare:   { fontSize: 16, fontWeight: '700', color: '#1B8C5E' },
});

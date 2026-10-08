import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function DurgaPujaModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Web par check karega taaki baar-baar refresh par popup na aaye
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const hasSeen = localStorage.getItem('seen_pujo_banner_2026');
      if (!hasSeen) {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      localStorage.setItem('seen_pujo_banner_2026', 'true');
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.cardContainer}>
          {/* Close Button (X) */}
          <Pressable
            style={styles.closeBtn}
            onPress={handleClose}
            hitSlop={15}
            accessibilityLabel="Close Banner"
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>

          {/* Durga Puja Banner Image */}
          <Image
            source={require('../../assets/images/dp.png')}
            style={styles.bannerImg}
            resizeMode="cover"
          />
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 9999,
  },
  cardContainer: {
    position: 'relative',
    width: Math.min(width * 0.9, 420),
    aspectRatio: 1, // Square image ke liye perfect fit
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E0505',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDB813',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
});
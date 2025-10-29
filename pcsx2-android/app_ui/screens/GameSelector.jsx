import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, BackHandler, TextInput } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SideDrawer from '../components/SideDrawer.jsx';
import ThemedButton from '../components/ThemedButton.jsx';
import { useTheme } from '../theme.jsx';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function GameItem({ item, colors, onPress }) {
  return (
    <Pressable 
      onPress={() => {
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        onPress?.(item);
      }} 
      android_ripple={{ color: colors.surfaceContainerHigh }} 
      style={styles.itemRow}
    >
      <View style={[styles.cover, { backgroundColor: colors.surfaceContainerHigh }]} />
      <Text numberOfLines={2} style={[styles.itemTitle, { color: colors.onSurface }]}>{item.title}</Text>
    </Pressable>
  );
}

export default function GameSelector({ navigation }) {
  const { colors } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [games, setGames] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState(''); 

  const drawerItems = useMemo(() => ([
    { type: 'section', label: 'Emulation' },
    { label: 'Boot BIOS', onPress: () => navigation?.navigate('/') },
    { label: 'BIOS', onPress: () => navigation?.navigate('Settings') },
    { type: 'section', label: 'Library' },
    { label: 'Choose games folder', onPress: () => {} },
    { label: 'Refresh games', onPress: () => {} },
    { label: 'Covers', onPress: () => {} },
    { label: 'Remove cover URL', onPress: () => {} },
    { type: 'section', label: 'Background' },
    { label: 'Choose landscape background', onPress: () => {} },
    { label: 'Choose portrait background', onPress: () => {} },
    { label: 'Clear background', onPress: () => {} },
    { type: 'section', label: 'Settings' },
    { label: 'Settings', onPress: () => navigation?.navigate('Settings') },
  ]), [navigation]); 
  if (!colors || !colors.surface) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#1A1F24' }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: '#C4C7C5' }]}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.surface }] }>
      <AndroidBackCloser open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      <View style={styles.header}>
        {!drawerOpen && (
          <Pressable 
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
              setDrawerOpen(true);
            }} 
            style={styles.headerIcon}
            android_ripple={{ color: colors.primary + '33', borderless: true }}
          >
            <View style={[styles.hamburgerBar, { backgroundColor: colors.onSurface }]} />
            <View style={[styles.hamburgerBar, { backgroundColor: colors.onSurface, marginVertical: 3 }]} />
            <View style={[styles.hamburgerBar, { backgroundColor: colors.onSurface }]} />
          </Pressable>
        )}
        
        {drawerOpen && <View style={styles.headerIcon} />}
        
        <Pressable 
          onPress={() => {
            ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
            setSearchVisible(!searchVisible);
          }} 
          style={[styles.headerIcon, styles.searchIcon]}
          android_ripple={{ color: colors.primary + '33', borderless: true }}
        >
          <View style={[styles.searchIconShape, { borderColor: colors.onSurface }]} />
          <View style={[styles.searchHandle, { backgroundColor: colors.onSurface }]} />
        </Pressable>
      </View>

      {/* Search bar */}
      {searchVisible && (
        <TextInput
          style={[styles.searchBar, { 
            backgroundColor: colors.surfaceContainer,
            color: colors.onSurface,
            borderColor: colors.outline,
          }]}
          placeholder="Search games…"
          placeholderTextColor={colors.onSurfaceVariant}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="done"
          onSubmitEditing={() => setSearchVisible(false)}
        />
      )}

      {games.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.onSurfaceVariant }]}>Please select a game folder</Text>
          <ThemedButton title="Choose games folder" onPress={() => {}} colors={colors} variant="outlined" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 12 }}
          data={games}
          keyExtractor={(g, i) => g.id ?? String(i)}
          renderItem={({ item }) => (
            <GameItem item={item} colors={colors} onPress={() => {}} />
          )}
        />
      )}


      <Pressable 
        onPress={() => {
          ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
        }} 
        android_ripple={{ color: colors.onPrimary + '22' }} 
        style={[styles.fab, { backgroundColor: colors.primary }] }
      >
        <View style={[styles.fabDot, { backgroundColor: colors.onPrimary }]} />
      </Pressable>

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} colors={colors} items={drawerItems} />
    </SafeAreaView>
  );
}

function AndroidBackCloser({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => sub.remove();
  }, [open, onClose]);
  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    zIndex: 100,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'relative',
  },
  hamburgerBar: { 
    height: 2, 
    width: 18, 
    borderRadius: 1 
  },
  searchIconShape: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  searchHandle: {
    width: 2,
    height: 6,
    borderRadius: 1,
    position: 'absolute',
    right: 14,
    bottom: 14,
    transform: [{ rotate: '45deg' }],
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 18, marginBottom: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 12, minHeight: 72 },
  cover: { width: 80, aspectRatio: 2/3, borderRadius: 6, marginRight: 12 },
  itemTitle: { flex: 1, fontSize: 16, lineHeight: 20 },
  fab: { 
    position: 'absolute', 
    right: 16, 
    bottom: 16, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 6, 
    shadowColor: '#000', 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 4 } 
  },
  fabDot: { width: 20, height: 20, borderRadius: 10 },
});

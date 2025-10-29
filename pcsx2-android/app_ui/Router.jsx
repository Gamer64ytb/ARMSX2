import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, StatusBar, BackHandler } from 'react-native';
import HomeScreen from './screens/HomeScreen.jsx';
import GameSelector from './screens/GameSelector.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';
import { useTheme } from './theme.jsx';

export default function Router() {
  const { scheme, colors } = useTheme();
  const [currentScreen, setCurrentScreen] = useState('GameSelector');
  const [navigationStack, setNavigationStack] = useState(['GameSelector']);
  
  if (!colors || !colors.background) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0F1419' }}>
        <StatusBar barStyle="light-content" backgroundColor="#0F1419" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#C4C7C5', fontSize: 16 }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Navigation functions
  const navigate = (screenName) => {
    setNavigationStack(prev => [...prev, screenName]);
    setCurrentScreen(screenName);
  };
  
  const goBack = () => {
    setNavigationStack(prev => {
      const newStack = prev.slice(0, -1);
      if (newStack.length === 0) {
        return ['GameSelector'];
      }
      setCurrentScreen(newStack[newStack.length - 1]);
      return newStack;
    });
  };
  
  // Handle Android back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigationStack.length > 1) {
        goBack();
        return true;
      }
      return false;
    });
    
    return () => backHandler.remove();
  }, [navigationStack]);
  
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Settings':
        return (
          <View style={styles.screenContainer}>
            <SettingsScreen navigation={{ goBack, navigate }} />
          </View>
        );
      case 'About':
        return (
          <View style={styles.screenContainer}>
            <AboutScreen navigation={{ goBack, navigate }} />
          </View>
        );
      case 'GameSelector':
      default:
        return (
          <View style={styles.screenContainer}>
            <GameSelector navigation={{ goBack, navigate }} />
          </View>
        );
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenContainer: { flex: 1 },
});

import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SwipeableSlider from '../components/SwipeableSlider.jsx';
import { useTheme } from '../theme.jsx';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function SettingsScreen({ navigation }) {
  const { colors } = useTheme();

  if (!colors || !colors.surface) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0F1419' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#C4C7C5', fontSize: 16 }}>Loading...</Text>
        </View>
      </View>
    );
  }

  // General
  const [fsui, setFsui] = useState(false);
  const [frameLimiter, setFrameLimiter] = useState(true);
  const [fpsLimit, setFpsLimit] = useState(60);
  const [aspect, setAspect] = useState('16:9');
  const [fastBoot, setFastBoot] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [oscTimeout, setOscTimeout] = useState(3);
  const [oscNever, setOscNever] = useState(false);

  // Graphics
  const [renderer, setRenderer] = useState('Vulkan');
  const [upscale, setUpscale] = useState(1);
  const [filtering, setFiltering] = useState('Bilinear');
  const [interlace, setInterlace] = useState('Auto');
  const [fxaa, setFxaa] = useState(false);
  const [casMode, setCasMode] = useState('Off');
  const [casSharpness, setCasSharpness] = useState(50);
  const [hwMipmap, setHwMipmap] = useState(false);
  const [vsync, setVsync] = useState(false);
  const [autoFlushSw, setAutoFlushSw] = useState(false);
  const [autoFlushHw, setAutoFlushHw] = useState('Off');

  // Controller
  const [vibration, setVibration] = useState(true);

  // Performance 
  const [cpuCore, setCpuCore] = useState('Dynarec');

 
  const handleSwitchChange = (setter, value) => {
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
    setter(value);
  };


  const handleSliderChange = (setter, value) => {
    setter(value);
  };

  const handleSliderComplete = () => {
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  };

  const cardStyle = useMemo(() => ({ 
    backgroundColor: colors.surfaceContainer, 
    borderColor: colors.outline 
  }), [colors]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.screenTitle, { color: colors.onSurface }]}>Settings</Text>

        {/* General */}
        <View style={[styles.card, cardStyle]}>
          <Text style={[styles.cardHeader, { color: colors.primary }]}>General</Text>
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>FSUI</Text>
            <Switch
              value={fsui}
              onValueChange={(value) => handleSwitchChange(setFsui, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={fsui ? colors.onPrimaryContainer : colors.outline}
            />
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Frame limiter</Text>
            <Switch
              value={frameLimiter}
              onValueChange={(value) => handleSwitchChange(setFrameLimiter, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={frameLimiter ? colors.onPrimaryContainer : colors.outline}
            />
          </View>

          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>FPS limit</Text>
            <SwipeableSlider
              value={fpsLimit}
              minimumValue={30}
              maximumValue={120}
              step={5}
              onValueChange={(value) => handleSliderChange(setFpsLimit, value)}
              onSlidingComplete={handleSliderComplete}
              colors={colors}
              style={styles.slider}
            />
            <Text style={[styles.sliderValue, { color: colors.onSurfaceVariant }]}>{fpsLimit} fps</Text>
          </View>

          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Aspect ratio</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.surface, borderColor: colors.outline }]}>
              <Picker
                selectedValue={aspect}
                onValueChange={setAspect}
                dropdownIconColor={colors.onSurface}
                style={[styles.picker, { color: colors.onSurface }]}
              >
                <Picker.Item label="16:9" value="16:9" color={colors.onSurface} />
                <Picker.Item label="4:3" value="4:3" color={colors.onSurface} />
                <Picker.Item label="Stretch" value="stretch" color={colors.onSurface} />
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Fast boot</Text>
            <Switch
              value={fastBoot}
              onValueChange={(value) => handleSwitchChange(setFastBoot, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={fastBoot ? colors.onPrimaryContainer : colors.outline}
            />
          </View>

          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Brightness</Text>
            <SwipeableSlider
              value={brightness}
              minimumValue={25}
              maximumValue={125}
              step={5}
              onValueChange={(value) => handleSliderChange(setBrightness, value)}
              onSlidingComplete={handleSliderComplete}
              colors={colors}
              style={styles.slider}
            />
            <Text style={[styles.sliderValue, { color: colors.onSurfaceVariant }]}>{brightness}%</Text>
          </View>
        </View>

        {/* Graphics */}
        <View style={[styles.card, cardStyle]}>
          <Text style={[styles.cardHeader, { color: colors.primary }]}>Graphics</Text>
          
          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Renderer</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.surface, borderColor: colors.outline }]}>
              <Picker
                selectedValue={renderer}
                onValueChange={setRenderer}
                dropdownIconColor={colors.onSurface}
                style={[styles.picker, { color: colors.onSurface }]}
              >
                <Picker.Item label="Vulkan" value="Vulkan" color={colors.onSurface} />
                <Picker.Item label="OpenGL" value="OpenGL" color={colors.onSurface} />
                <Picker.Item label="Software" value="Software" color={colors.onSurface} />
              </Picker>
            </View>
          </View>

          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Upscaling</Text>
            <SwipeableSlider
              value={upscale}
              minimumValue={1}
              maximumValue={6}
              step={1}
              onValueChange={(value) => handleSliderChange(setUpscale, value)}
              onSlidingComplete={handleSliderComplete}
              colors={colors}
              style={styles.slider}
            />
            <Text style={[styles.sliderValue, { color: colors.onSurfaceVariant }]}>{upscale}x</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>FXAA</Text>
            <Switch
              value={fxaa}
              onValueChange={(value) => handleSwitchChange(setFxaa, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={fxaa ? colors.onPrimaryContainer : colors.outline}
            />
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>VSync</Text>
            <Switch
              value={vsync}
              onValueChange={(value) => handleSwitchChange(setVsync, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={vsync ? colors.onPrimaryContainer : colors.outline}
            />
          </View>
        </View>

        {/* Controller */}
        <View style={[styles.card, cardStyle]}>
          <Text style={[styles.cardHeader, { color: colors.primary }]}>Controller</Text>
          
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.onSurface }]}>Vibration</Text>
            <Switch
              value={vibration}
              onValueChange={(value) => handleSwitchChange(setVibration, value)}
              trackColor={{ false: colors.outline, true: colors.primaryContainer }}
              thumbColor={vibration ? colors.onPrimaryContainer : colors.outline}
            />
          </View>
        </View>

        {/* Performance Card */}
        <View style={[styles.card, cardStyle]}>
          <Text style={[styles.cardHeader, { color: colors.primary }]}>Performance</Text>
          
          <View style={styles.column}>
            <Text style={[styles.label, { color: colors.onSurface }]}>CPU core</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.surface, borderColor: colors.outline }]}>
              <Picker
                selectedValue={cpuCore}
                onValueChange={setCpuCore}
                dropdownIconColor={colors.onSurface}
                style={[styles.picker, { color: colors.onSurface }]}
              >
                <Picker.Item label="Dynarec" value="Dynarec" color={colors.onSurface} />
                <Picker.Item label="Interpreter" value="Interpreter" color={colors.onSurface} />
                <Picker.Item label="Cached interpreter" value="CachedInterpreter" color={colors.onSurface} />
              </Picker>
            </View>
          </View>
        </View>

        {/* Action Buttons - XML Style */}
        <View style={styles.buttonContainer}>
          <Pressable 
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
              navigation?.goBack();
            }} 
            style={[styles.actionButton, { backgroundColor: colors.surfaceContainerHigh }]}
            android_ripple={{ color: colors.primary + '33' }}
          >
            <View style={[styles.backIconLarge, { borderColor: colors.onSurface }]} />
            <Text style={[styles.buttonText, { color: colors.onSurface }]}>Back</Text>
          </Pressable>

          <Pressable 
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
              navigation?.navigate('About');
            }} 
            style={[styles.actionButton, { backgroundColor: colors.surfaceContainerHigh }]}
            android_ripple={{ color: colors.primary + '33' }}
          >
            <View style={[styles.aboutIconLarge, { backgroundColor: colors.onSurface }]} />
            <Text style={[styles.buttonText, { color: colors.onSurface }]}>About</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    paddingLeft: 4,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  column: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  slider: {
    marginVertical: 8,
  },
  sliderValue: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  picker: { 
    backgroundColor: 'transparent' 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    justifyContent: 'center',
  },
  backIconLarge: {
    width: 16,
    height: 16,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginRight: 8,
  },
  aboutIconLarge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;

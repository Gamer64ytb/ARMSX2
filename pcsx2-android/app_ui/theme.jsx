import { useColorScheme } from 'react-native';
import {
  useMaterialYouPalette,
  getPaletteSync,
  deviceSupportsMaterialYou,
  defaultPalette,
} from '@assembless/react-native-material-you';

/**
 * @returns {{ scheme: 'light'|'dark', colors: Record<string, string|undefined> }}
 */
export function useTheme() {
  const scheme = useColorScheme() ?? 'light';
  const isDark = scheme === 'dark';

  let hookPalette = null;
  try {
    hookPalette = useMaterialYouPalette();
  } catch {
    hookPalette = null;
  }

  const snap = getPaletteSync(); 

  const palette = hookPalette ?? snap ?? defaultPalette;

  const n1 = palette.system_neutral1 ?? [];
  const n2 = palette.system_neutral2 ?? [];
  const a1 = palette.system_accent1 ?? [];
  const a2 = palette.system_accent2 ?? [];
  const a3 = palette.system_accent3 ?? [];

  const tint = a2.length ? a2 : (a3.length ? a3 : a1);

  const background =
    n2[isDark ? 10 : 2] ??
    n1[isDark ? 10 : 2] ??
    a1[isDark ? 10 : 2] ??
    a1[6];

  const surface = tint[isDark ? 9 : 3] ?? background;
  const surfaceContainer = tint[isDark ? 8 : 4] ?? surface;
  const surfaceContainerHigh = tint[isDark ? 7 : 5] ?? surfaceContainer;

  const outline = n2[isDark ? 6 : 5] ?? n1[isDark ? 6 : 5] ?? surfaceContainer;
  const onSurface = isDark ? (n1[0] ?? n2[0] ?? a1[0]) : (n1[10] ?? n2[10] ?? a1[10]);
  const onSurfaceVariant = n1[6] ?? n2[6] ?? a1[6] ?? onSurface;
  const primary = a1[6] ?? n1[6] ?? n2[6] ?? onSurface;
  const onPrimary = isDark ? (n1[0] ?? a1[0]) : (n1[10] ?? a1[10]);

  const colors = {
    background,
    surface,
    surfaceContainer,
    surfaceContainerHigh,
    outline,
    onSurface,
    onSurfaceVariant,
    primary,
    onPrimary,
    card: surfaceContainer,
    textPrimary: onSurface,
    textSecondary: onSurfaceVariant,
    border: outline,
    tint: primary,
  };

  return { scheme, colors };
}
import React from 'react';
import {
  Svg,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop
} from 'react-native-svg';

// TODO: Fix resizing on Android
// TODO: Fix Sunset size on iOS
export function Background() {
  return (
    <Svg width="100%" height="100%">
      <Defs>
        <LinearGradient id="Bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="rgb(0, 9, 21)" />
          <Stop offset="100%" stopColor="rgb(22, 35, 95)" />
        </LinearGradient>
        <RadialGradient id="Sunset">
          <Stop offset="0%" stopColor="rgb(107, 76, 122)" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="rgb(107, 76, 122)" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#Bg)" />
      <Rect x="-50%" y="10%" width="200%" height="200%" fill="url(#Sunset)" />
    </Svg>
  );
}

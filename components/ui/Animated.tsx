import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';

// Fade In Animation
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export function FadeIn({ children, delay = 0, duration = 300, style }: FadeInProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Slide In Animation
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
}

export function SlideIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 300,
  style,
}: SlideInProps) {
  const slideAnim = useRef(new Animated.Value(getInitialValue(direction))).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function getInitialValue(dir: string) {
    switch (dir) {
      case 'left': return -50;
      case 'right': return 50;
      case 'up': return 50;
      case 'down': return -50;
      default: return 50;
    }
  }

  function getTransform() {
    if (direction === 'left' || direction === 'right') {
      return { translateX: slideAnim };
    }
    return { translateY: slideAnim };
  }

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [getTransform()],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

// Scale Press Animation (for buttons/cards)
interface ScalePressProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  scale?: number;
  style?: StyleProp<ViewStyle>;
}

export function ScalePress({
  children,
  onPress,
  disabled = false,
  scale = 0.97,
  style,
}: ScalePressProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scale,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      disabled={disabled}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// Staggered List Animation
interface StaggeredListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  style?: StyleProp<ViewStyle>;
}

export function StaggeredList({
  children,
  staggerDelay = 100,
  style,
}: StaggeredListProps) {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <FadeIn delay={index * staggerDelay} style={style}>
          {child}
        </FadeIn>
      ))}
    </>
  );
}

// Pulse Animation
interface PulseProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Pulse({ children, style }: PulseProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[style, { transform: [{ scale: pulseAnim }] }]}>
      {children}
    </Animated.View>
  );
}

// Shake Animation (for errors)
interface ShakeProps {
  children: React.ReactNode;
  trigger: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Shake({ children, trigger, style }: ShakeProps) {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [trigger]);

  return (
    <Animated.View style={[style, { transform: [{ translateX: shakeAnim }] }]}>
      {children}
    </Animated.View>
  );
}

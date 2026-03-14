import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { COLORS } from '@/constants/theme';

interface WalkingManProps {
  size?: number;
  color?: string;
  isWalking?: boolean;
}

const AnimatedG = Animated.createAnimatedComponent(G);

export function WalkingMan({ 
  size = 40, 
  color = COLORS.primary, 
  isWalking = true 
}: WalkingManProps) {
  const legAnim = useRef(new Animated.Value(0)).current;
  const armAnim = useRef(new Animated.Value(0)).current;
  const bodyBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isWalking) {
      // Leg animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(legAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(legAnim, {
            toValue: -1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(legAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Arm animation (opposite to legs)
      Animated.loop(
        Animated.sequence([
          Animated.timing(armAnim, {
            toValue: -1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(armAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Body bounce
      Animated.loop(
        Animated.sequence([
          Animated.timing(bodyBounce, {
            toValue: -2,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bodyBounce, {
            toValue: 0,
            duration: 150,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      legAnim.setValue(0);
      armAnim.setValue(0);
      bodyBounce.setValue(0);
    }
  }, [isWalking]);

  const leftLegRotate = legAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const rightLegRotate = legAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['30deg', '0deg', '-30deg'],
  });

  const leftArmRotate = armAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['30deg', '0deg', '-30deg'],
  });

  const rightArmRotate = armAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size * 1.5 }]}>
      <Animated.View style={{ transform: [{ translateY: bodyBounce }] }}>
        <Svg width={size} height={size * 1.5} viewBox="0 0 40 60">
          {/* Head */}
          <Circle cx="20" cy="8" r="7" fill={color} />
          
          {/* Body */}
          <Path
            d="M20 15 L20 35"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Left Arm */}
          <Animated.View 
            style={{ 
              position: 'absolute',
              left: 12,
              top: 15,
              transform: [{ rotate: leftArmRotate }],
              transformOrigin: 'top',
            }}
          >
            <Svg width={16} height={20} viewBox="0 0 16 20">
              <Path
                d="M8 0 L2 18"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
          
          {/* Right Arm */}
          <Animated.View 
            style={{ 
              position: 'absolute',
              right: 12,
              top: 15,
              transform: [{ rotate: rightArmRotate }],
              transformOrigin: 'top',
            }}
          >
            <Svg width={16} height={20} viewBox="0 0 16 20">
              <Path
                d="M8 0 L14 18"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
          
          {/* Left Leg */}
          <Animated.View 
            style={{ 
              position: 'absolute',
              left: 10,
              top: 32,
              transform: [{ rotate: leftLegRotate }],
              transformOrigin: 'top',
            }}
          >
            <Svg width={16} height={28} viewBox="0 0 16 28">
              <Path
                d="M8 0 L4 26"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
          
          {/* Right Leg */}
          <Animated.View 
            style={{ 
              position: 'absolute',
              right: 10,
              top: 32,
              transform: [{ rotate: rightLegRotate }],
              transformOrigin: 'top',
            }}
          >
            <Svg width={16} height={28} viewBox="0 0 16 28">
              <Path
                d="M8 0 L12 26"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

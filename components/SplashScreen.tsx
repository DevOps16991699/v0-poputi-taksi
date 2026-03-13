import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, MapPin, Users, Shield, Star, ChevronRight } from 'lucide-react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const carPosition = useRef(new Animated.Value(-100)).current;
  const dotsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const slides = [
    {
      icon: Car,
      title: "Poputi Taksi",
      subtitle: "O'zbekistonning eng ishonchli sherikli sayohat ilovasi",
      color: COLORS.primary,
    },
    {
      icon: MapPin,
      title: "Qulay yo'nalishlar",
      subtitle: "Istalgan shahardan shahrga - arzon va tez",
      color: COLORS.secondary,
    },
    {
      icon: Users,
      title: "Haydovchi yoki Yo'lovchi",
      subtitle: "O'zingizga qulay rolni tanlang va sayohatni boshlang",
      color: COLORS.primary,
    },
    {
      icon: Shield,
      title: "Xavfsiz sayohat",
      subtitle: "Barcha haydovchilar tekshirilgan va tasdiqlangan",
      color: COLORS.success,
    },
  ];

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(carPosition, {
        toValue: width + 100,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo rotation
    Animated.loop(
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Dots animation
    const animateDots = () => {
      dotsAnim.forEach((dot, index) => {
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.loop(
            Animated.sequence([
              Animated.timing(dot, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(dot, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start();
      });
    };
    animateDots();

    // Auto-advance slides
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: currentSlide,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish();
    }
  };

  const handleSkip = () => {
    onFinish();
  };

  const CurrentIcon = slides[currentSlide].icon;

  const spinRotate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#059669', '#047857']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Animated Car */}
        <Animated.View
          style={[
            styles.animatedCar,
            { transform: [{ translateX: carPosition }] },
          ]}
        >
          <Car size={40} color={COLORS.white} />
        </Animated.View>

        {/* Road Line */}
        <View style={styles.roadContainer}>
          <View style={styles.roadLine} />
          {dotsAnim.map((dot, index) => (
            <Animated.View
              key={index}
              style={[
                styles.roadDot,
                {
                  left: `${25 + index * 25}%`,
                  opacity: dot,
                  transform: [
                    {
                      scale: dot.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>O'tkazib yuborish</Text>
        </TouchableOpacity>

        {/* Main Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Icon */}
          <Animated.View
            style={[
              styles.iconContainer,
              currentSlide === 0 && { transform: [{ rotate: spinRotate }] },
            ]}
          >
            <CurrentIcon size={80} color={COLORS.white} />
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>{slides[currentSlide].title}</Text>
          <Text style={styles.subtitle}>{slides[currentSlide].subtitle}</Text>

          {/* Features (only on first slide) */}
          {currentSlide === 0 && (
            <View style={styles.features}>
              <View style={styles.featureItem}>
                <Star size={20} color={COLORS.warning} fill={COLORS.warning} />
                <Text style={styles.featureText}>4.9 Reyting</Text>
              </View>
              <View style={styles.featureItem}>
                <Users size={20} color={COLORS.white} />
                <Text style={styles.featureText}>50K+ Foydalanuvchi</Text>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentSlide(index)}
            >
              <View
                style={[
                  styles.dot,
                  currentSlide === index && styles.dotActive,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentSlide === slides.length - 1 ? 'Boshlash' : 'Keyingisi'}
          </Text>
          <ChevronRight size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  animatedCar: {
    position: 'absolute',
    top: height * 0.15,
  },
  roadContainer: {
    position: 'absolute',
    top: height * 0.18,
    width: '100%',
    height: 4,
    justifyContent: 'center',
  },
  roadLine: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: '100%',
  },
  roadDot: {
    position: 'absolute',
    width: 20,
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 2,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: SPACING.lg,
  },
  skipText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FONT_SIZE.sm,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE['3xl'],
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: SPACING.md,
  },
  features: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
    gap: SPACING.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  featureText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 140,
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: COLORS.white,
    width: 30,
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.xs,
  },
  nextButtonText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.primary,
  },
});

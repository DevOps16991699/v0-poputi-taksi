import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
  default: { bg: COLORS.gray100, text: COLORS.gray700 },
  success: { bg: COLORS.successLight, text: COLORS.primaryDark },
  warning: { bg: COLORS.warningLight, text: '#92400E' },
  error: { bg: COLORS.errorLight, text: '#991B1B' },
  info: { bg: COLORS.infoLight, text: '#1E40AF' },
  outline: { bg: 'transparent', text: COLORS.gray700, border: COLORS.border },
};

export function Badge({ children, variant = 'default', size = 'md', style }: BadgeProps) {
  const variantStyle = variantStyles[variant];
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyle.bg,
          borderColor: variantStyle.border || 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          paddingVertical: isSm ? SPACING.xs : SPACING.sm,
          paddingHorizontal: isSm ? SPACING.sm : SPACING.md,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: variantStyle.text,
            fontSize: isSm ? FONT_SIZE.xs : FONT_SIZE.sm,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { Card, Avatar } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { mockReviews } from '@/shared/data/mock';
import type { Review } from '@/shared/types';

const renderStars = (rating: number) => {
  return (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={14}
          color={star <= rating ? Colors.warning : Colors.textMuted}
        />
      ))}
    </View>
  );
};

export default function ReviewsScreen() {
  const reviews = mockReviews;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const renderReview = ({ item }: { item: Review }) => (
    <Card style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Avatar
          source={item.reviewerAvatar ? { uri: item.reviewerAvatar } : undefined}
          name={item.reviewerName}
          size="medium"
        />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{item.reviewerName}</Text>
          <View style={styles.reviewMeta}>
            {renderStars(item.rating)}
            <Text style={styles.reviewDate}>
              {new Date(item.createdAt).toLocaleDateString('uz-UZ')}
            </Text>
          </View>
        </View>
      </View>
      {item.comment && (
        <Text style={styles.reviewComment}>{item.comment}</Text>
      )}
      {item.rideInfo && (
        <View style={styles.rideInfo}>
          <Ionicons name="car-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.rideInfoText}>
            {item.rideInfo.from} - {item.rideInfo.to}
          </Text>
        </View>
      )}
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sharhlar</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.statsCard}>
        <View style={styles.ratingOverview}>
          <Text style={styles.averageRating}>{averageRating}</Text>
          <View style={styles.ratingDetails}>
            {renderStars(Math.round(Number(averageRating)))}
            <Text style={styles.totalReviews}>{reviews.length} ta sharh</Text>
          </View>
        </View>
      </View>

      {reviews.length === 0 ? (
        <EmptyState
          icon="chatbubbles-outline"
          title="Sharhlar yo'q"
          description="Hali sizga sharh qoldirilmagan"
        />
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.reviewsList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 32,
  },
  statsCard: {
    margin: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: '700',
    color: Colors.text,
  },
  ratingDetails: {
    gap: Spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  totalReviews: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  reviewsList: {
    padding: Spacing.md,
    paddingTop: 0,
  },
  reviewCard: {
    padding: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 4,
  },
  reviewDate: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  reviewComment: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    lineHeight: 20,
  },
  rideInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  rideInfoText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  separator: {
    height: Spacing.sm,
  },
});

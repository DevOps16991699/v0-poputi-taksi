import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ticket, QrCode } from 'lucide-react-native';
import { Header } from '@/components/Header';
import { Card, Badge } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { mockTickets } from '@/shared/data/mock';
import { format } from 'date-fns';

export default function TicketsScreen() {
  const insets = useSafeAreaInsets();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Faol</Badge>;
      case 'used':
        return <Badge variant="default">Ishlatilgan</Badge>;
      case 'cancelled':
        return <Badge variant="error">Bekor qilingan</Badge>;
      case 'expired':
        return <Badge variant="warning">Muddati o'tgan</Badge>;
      default:
        return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + " so'm";
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Chiptalarim" />
      
      <FlatList
        data={mockTickets}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <View style={styles.routeInfo}>
                <Text style={styles.city}>{item.ride.from.city}</Text>
                <Text style={styles.arrow}>→</Text>
                <Text style={styles.city}>{item.ride.to.city}</Text>
              </View>
              {getStatusBadge(item.status)}
            </View>

            <View style={styles.ticketDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Sana</Text>
                <Text style={styles.detailValue}>
                  {format(new Date(item.ride.date), 'dd.MM.yyyy')} {item.ride.time}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Joylar</Text>
                <Text style={styles.detailValue}>{item.seats} ta</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Narx</Text>
                <Text style={[styles.detailValue, styles.price]}>
                  {formatPrice(item.totalPrice)}
                </Text>
              </View>
            </View>

            <View style={styles.qrSection}>
              <QrCode size={80} color={COLORS.gray300} />
              <Text style={styles.qrCode}>{item.qrCode}</Text>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Ticket size={48} color={COLORS.gray300} />}
            title="Chiptalar yo'q"
            description="Safar band qilganingizda chiptalar bu yerda ko'rinadi"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  listContent: {
    padding: SPACING.lg,
    flexGrow: 1,
  },
  ticketCard: {
    marginBottom: SPACING.md,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderStyle: 'dashed',
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  city: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray400,
  },
  ticketDetails: {
    marginBottom: SPACING.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.text,
  },
  price: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  qrSection: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderStyle: 'dashed',
  },
  qrCode: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    fontFamily: 'monospace',
  },
});

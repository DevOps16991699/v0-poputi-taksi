import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import { Avatar, Badge } from '@/components/ui';
import { EmptyState } from '@/components/EmptyState';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { mockChats } from '@/shared/data/mock';
import { format, isToday, isYesterday } from 'date-fns';
import type { Chat } from '@/shared/types';

export default function ChatsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore(state => state.user);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    if (isYesterday(date)) {
      return 'Kecha';
    }
    return format(date, 'dd.MM');
  };

  const getOtherParticipant = (chat: Chat) => {
    return chat.participants.find(p => p.id !== user?.id) || chat.participants[0];
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const otherUser = getOtherParticipant(item);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => router.push(`/chat/${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <Avatar source={otherUser.avatar} name={otherUser.name} size="lg" />
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {otherUser.name}
            </Text>
            <Text style={styles.chatTime}>
              {item.lastMessage ? formatTime(item.lastMessage.createdAt) : ''}
            </Text>
          </View>
          
          {item.ride && (
            <Text style={styles.rideInfo} numberOfLines={1}>
              {item.ride.from.city} - {item.ride.to.city}
            </Text>
          )}
          
          {item.lastMessage && (
            <Text
              style={[
                styles.lastMessage,
                item.unreadCount > 0 && styles.lastMessageUnread,
              ]}
              numberOfLines={1}
            >
              {item.lastMessage.senderId === user?.id ? 'Siz: ' : ''}
              {item.lastMessage.text}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Xabarlar</Text>
      </View>

      <FlatList
        data={mockChats}
        keyExtractor={item => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={<MessageCircle size={48} color={COLORS.gray300} />}
            title="Xabarlar yo'q"
            description="Safar band qilganingizda xabarlar bu yerda ko'rinadi"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
  },
  listContent: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  unreadCount: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.white,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  chatTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
  },
  rideInfo: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    marginBottom: 2,
  },
  lastMessage: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  lastMessageUnread: {
    color: COLORS.text,
    fontWeight: '500',
  },
});

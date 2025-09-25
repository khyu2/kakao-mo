import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

type ChatRoom = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
};

// 데모를 위한 가상 채팅방 데이터
const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: '이영희',
    lastMessage: '네, 그럼 내일 뵐게요!',
    timestamp: '오후 11:23',
    unreadCount: 2,
    avatar: 'https://github.com/vercel.png',
  },
  {
    id: '3',
    name: '김철수',
    lastMessage: '사진 고마워요!',
    timestamp: '오후 5:12',
    unreadCount: 0,
    avatar: 'https://github.com/shadcn.png',
  },
  {
    id: '4',
    name: '최지우',
    lastMessage: 'ㅋㅋㅋㅋㅋ 진짜 웃기다',
    timestamp: '오전 11:30',
    unreadCount: 0,
    avatar: 'https://github.com/microsoft.png',
  },
  {
    id: '6',
    name: '송준호',
    lastMessage: 'OK',
    timestamp: '2일 전',
    unreadCount: 0,
    avatar: 'https://github.com/apple.png',
  },
];

// 채팅방 목록 아이템 컴포넌트
const ChatListItem = React.memo(({ item }: { item: ChatRoom }) => (
  <Pressable className="active:bg-accent">
    <View className="p-4 flex-row items-center">
      {/* 아바타 */}
      <Avatar alt={`${item.name}'s Avatar`} className="w-14 h-14 me-4 rounded-2xl">
        <AvatarImage source={{ uri: item.avatar }} />
        <AvatarFallback>
          <Text>{item.name.charAt(0)}</Text>
        </AvatarFallback>
      </Avatar>

      {/* 채팅방 이름 및 마지막 메시지 */}
      <View className="flex-1">
        <Text className="text-base text-foreground font-semibold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {/* 시간 및 안 읽은 메시지 수 */}
      <View className="items-end ms-2 gap-y-1">
        <Text className="text-xs text-muted-foreground">{item.timestamp}</Text>
        {item.unreadCount > 0 && (
          <View className="bg-destructive rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
            <Text className="text-destructive-foreground text-xs font-bold">
              {item.unreadCount > 99 ? '99+' : item.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  </Pressable>
));

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-px bg-border/50 mx-4" />}
      />
    </View>
  );
}
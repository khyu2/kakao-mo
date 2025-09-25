import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';

// 오픈채팅방 데이터 타입을 정의합니다.
type OpenChatRoom = {
  id: string;
  name: string;
  tags: string[];
  participantCount: number;
  avatar: string;
};

// 데모를 위한 가상 오픈채팅방 데이터
const openChatRooms: OpenChatRoom[] = [
  {
    id: '1',
    name: 'React Native 스터디',
    tags: ['#개발', '#리액트네이티브', '#Expo'],
    participantCount: 128,
    avatar: 'https://github.com/facebook.png',
  },
  {
    id: '2',
    name: '가족 단톡방',
    tags: ['#일상', '#가족'],
    participantCount: 8,
    avatar: 'https://github.com/google.png',
  },
  {
    id: '3',
    name: '맛집 탐방 모임 🍜',
    tags: ['#음식', '#서울맛집', '#주말'],
    participantCount: 45,
    avatar: 'https://github.com/airbnb.png',
  },
  {
    id: '4',
    name: '등산, 하이킹 같이 가요!',
    tags: ['#운동', '#등산', '#아웃도어'],
    participantCount: 231,
    avatar: 'https://github.com/amazon.png',
  },
];

// 오픈채팅방 목록 아이템 컴포넌트
const OpenChatListItem = React.memo(({ item }: { item: OpenChatRoom }) => {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].text;

  return (
    <Pressable className="active:bg-accent">
      <View className="p-4 flex-row items-start">
        {/* 아바타 */}
        <Avatar alt={`${item.name}'s Avatar`} className="w-16 h-16 me-4 rounded-3xl">
          <AvatarImage source={{ uri: item.avatar }} />
          <AvatarFallback>
            <Text>{item.name.charAt(0)}</Text>
          </AvatarFallback>
        </Avatar>

        {/* 채팅방 정보 */}
        <View className="flex-1">
          <Text className="text-base text-foreground font-semibold" numberOfLines={2}>
            {item.name}
          </Text>
          <View className="flex-row flex-wrap mt-1">
            {item.tags.map((tag) => (
              <Text key={tag} className="text-sm text-muted-foreground me-2">
                {tag}
              </Text>
            ))}
          </View>
          <View className="flex-row items-center mt-1.5">
            <Ionicons name="person" size={12} color={iconColor} style={{ marginRight: 4 }} />
            <Text className="text-sm text-muted-foreground font-medium">{item.participantCount}명</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
});

export default function OpenChatScreen() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].text;

  return (
    <FlatList
      data={openChatRooms}
      renderItem={({ item }) => <OpenChatListItem item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="h-px bg-border/50 mx-4" />}
    />
  );
}
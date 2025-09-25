import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';

type Friend = {
  id: string;
  name: string;
  message?: string;
  avatar: string;
};

const myProfile: Friend = {
  id: '0',
  name: '홍길동',
  message: '안녕하세요! 반갑습니다.',
  avatar: 'https://github.com/mrzachnugent.png',
};

const friends: Friend[] = [
  { id: '1', name: '김철수', avatar: 'https://github.com/shadcn.png' },
  { id: '2', name: '이영희', message: '좋은 하루 보내세요.', avatar: 'https://github.com/vercel.png' },
  { id: '3', name: '강민수', message: 'React Native 재밌어요.', avatar: 'https://github.com/facebook.png' },
  { id: '4', name: '최지우', message: '커피 한잔 하실래요?', avatar: 'https://github.com/microsoft.png' },
  { id: '5', name: '정다은', message: '오늘 날씨 좋네요.', avatar: 'https://github.com/google.png' },
  { id: '6', name: '송준호', avatar: 'https://github.com/apple.png' },
  { id: '7', name: '윤서연', message: '새로운 프로젝트 시작이에요!', avatar: 'https://github.com/netflix.png' },
  { id: '8', name: '장민석', message: '점심 뭐 드실 건가요?', avatar: 'https://github.com/spotify.png' },
  { id: '9', name: '한소영', message: '주말에 영화 보러 가요.', avatar: 'https://github.com/twitter.png' },
  { id: '10', name: '배현우', avatar: 'https://github.com/github.png' },
];

const FriendListItem = React.memo(
  ({ item, onPress }: { item: Friend; onPress: (item: Friend) => void }) => (
    <Pressable onPress={() => onPress(item)} className="active:bg-accent">
      <View className="p-3 ms-2 flex-row justify-start items-center">
        <Avatar alt={`${item.name}'s Avatar`} className="w-12 h-12 me-4 rounded-2xl">
          <AvatarImage source={{ uri: item.avatar }} />
          <AvatarFallback>
            <Text>{item.name.charAt(0)}</Text>
          </AvatarFallback>
        </Avatar>
        <View className={`flex-1 ${!item.message ? 'justify-center' : ''}`}>
          <Text className="text-lg text-foreground font-semibold">{item.name}</Text>
          {item.message && (
            <Text className="text-sm text-muted-foreground">{item.message}</Text>
          )}
        </View>
      </View>
    </Pressable>
  ),
);

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleOpenModal = useCallback((item: Friend) => {
    setSelectedFriend(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            {/*내 프로필 섹션*/}
            <Pressable onPress={() => handleOpenModal(myProfile)} className="active:bg-accent">
              <View className="p-4 border-b border-border flex-row justify-start items-center">
                <Avatar alt="My Avartar" className="w-16 h-16 me-4 rounded-2xl">
                  <AvatarImage source={{ uri: myProfile.avatar }} />
                  <AvatarFallback>
                    <Text>{myProfile.name.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>
                <View>
                  <Text className="text-xl font-bold text-foreground">{myProfile.name}</Text>
                  {myProfile.message && (
                    <Text className="text-sm text-muted-foreground">{myProfile.message}</Text>
                  )}
                </View>
              </View>
            </Pressable>

            {/*친구 수 표시*/}
            <View className="p-4 flex-row">
              <Text className="text-sm opacity-50 me-2">Friends</Text>
              <Text className="text-sm opacity-70">{friends.length}</Text>
            </View>
          </>
        }
        data={friends}
        renderItem={({ item }) => <FriendListItem item={item} onPress={handleOpenModal} />}
        keyExtractor={item => item.id}
        className="flex-1 bg-background"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          {/*배경 클릭시 모달 닫기*/}
          <Pressable className="absolute inset-0" onPress={handleCloseModal} />

          {/*모달 컨텐츠*/}
          {selectedFriend && (
            <View className="bg-background pb-12">
              {/*닫기 버튼*/}
              <View className="items-start p-2">
                <Pressable onPress={handleCloseModal} className="p-2">
                  <Ionicons name="close-outline" size={24}
                            color={Colors[colorScheme ?? 'light'].tint} />
                </Pressable>
              </View>

              {/*프로필 정보*/}
              <View className="items-center px-4">
                <Avatar alt={selectedFriend.name} className="w-24 h-24 rounded-3xl">
                  <AvatarImage source={{ uri: selectedFriend.avatar }} />
                  <AvatarFallback>
                    <Text className="text-3xl">{selectedFriend.name.charAt(0)}</Text>
                  </AvatarFallback>
                </Avatar>
                <Text className="text-2xl font-bold text-foreground mt-4">
                  {selectedFriend.name}
                </Text>
                {selectedFriend.message && (
                  <Text className="text-sm text-muted-foreground mt-1">
                    {selectedFriend.message}
                  </Text>
                )}
              </View>

              <View className="w-full h-px gap-8 p-4" />

              {/*액션 버튼들*/}
              <View className="flex-row justify-center gap-8">
                <View className="items-center gap-2">
                  <Pressable
                    className="w-14 h-14 bg-secondary rounded-full items-center justify-center active:bg-border">
                    <Ionicons name="chatbubbles" size={24} color={Colors[colorScheme ?? 'light'].tint} />
                  </Pressable>
                  <Text className="text-xs text-foreground">1:1 채팅</Text>
                </View>
                <View className="items-center gap-2">
                  <Pressable
                    className="w-14 h-14 bg-secondary rounded-full items-center justify-center active:bg-border">
                    <Feather name="edit" size={24} color={Colors[colorScheme ?? 'light'].tint} />
                  </Pressable>
                  <Text className="text-xs text-foreground">프로필 편집</Text>
                </View>
                <View className="items-center gap-2">
                  <Pressable
                    className="w-14 h-14 bg-secondary rounded-full items-center justify-center active:bg-border">
                    <FontAwesome name="star" size={24} color={Colors[colorScheme ?? 'light'].tint} />
                  </Pressable>
                  <Text className="text-xs text-foreground">즐겨찾기</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
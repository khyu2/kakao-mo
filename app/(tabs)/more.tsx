import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { cn } from '@/lib/utils';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

// 내 프로필 정보
const myProfile = {
  name: '홍길동',
  email: 'gildong.hong@example.com',
  avatar: 'https://github.com/mrzachnugent.png',
};

// 아이콘 그리드 메뉴
const gridMenuItems = [
  { icon: 'wallet-outline', label: 'Pay' },
  { icon: 'color-palette-outline', label: '테마' },
  { icon: 'happy-outline', label: '스티커' },
  { icon: 'calendar-outline', label: '캘린더' },
  { icon: 'albums-outline', label: '서랍' },
  { icon: 'game-controller-outline', label: '게임' },
] as const;

const listMenuItems = [
  { icon: 'megaphone-outline', label: '공지사항', isDestructive: false },
  { icon: 'information-circle-outline', label: '도움말', isDestructive: false },
  { icon: 'cog-outline', label: '설정', isDestructive: false },
  { icon: 'log-out-outline', label: '로그아웃', isDestructive: true },
] as const;

const MenuGridItem = ({
                        icon,
                        label,
                        iconColor,
                      }: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  iconColor: string;
}) => (
  <Pressable className="w-1/4 items-center justify-center p-3 active:bg-accent rounded-lg">
    <View className="h-16 w-16 items-center justify-center">
      <Ionicons name={icon} size={32} color={iconColor} />
      <Text className="text-sm text-foreground mt-2 text-center" numberOfLines={1}>
        {label}
      </Text>
    </View>
  </Pressable>
);

const MenuListItem = ({
                        icon,
                        label,
                        iconColor,
                        onPress,
                        isDestructive,
                      }: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  iconColor: string;
  onPress: () => void;
  isDestructive?: boolean;
}) => (
  <Pressable onPress={onPress} className="flex-row items-center p-4 active:bg-accent">
    <Ionicons
      name={icon}
      size={24}
      color={isDestructive ? 'hsl(var(--destructive))' : iconColor}
      className="w-10"
    />
    <Text
      className={cn(
        'flex-1 text-base text-foreground',
        isDestructive && 'text-destructive',
      )}
    >
      {label}
    </Text>
    {/* 로그아웃 버튼에는 오른쪽 화살표 아이콘을 표시하지 않음 */}
    {!isDestructive && <Feather name="chevron-right" size={20} color={Colors.light.tabIconDefault} />}
  </Pressable>
);

// --- 메인 화면 컴포넌트 ---

export default function MoreScreen() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].text;

  // 4. 메뉴 아이템 클릭 시 실행될 핸들러 함수를 정의합니다.
  const handleMenuItemPress = (label: string) => {
    if (label === '로그아웃') {
      Alert.alert(
        '로그아웃',
        '정말 로그아웃 하시겠습니까?',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '로그아웃',
            style: 'destructive',
            // '로그아웃' 버튼 클릭 시 로그인 화면으로 이동
            onPress: () => router.replace('/login'),
          },
        ],
        { cancelable: true },
      );
    } else {
      // 다른 메뉴들은 간단한 알림만 표시 (기능 구현 시 확장)
      Alert.alert(`${label} 메뉴`, '준비 중인 기능입니다.');
    }
  };

  return (
    <ScrollView>
      {/* 헤더 */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground">더보기</Text>
      </View>

      {/* 프로필 섹션 */}
      <Pressable className="mx-4 mb-4 flex-row items-center rounded-lg p-4 active:bg-accent">
        <Avatar alt="My Avatar" className="h-16 w-16 rounded-2xl">
          <AvatarImage source={{ uri: myProfile.avatar }} />
          <AvatarFallback>
            <Text>{myProfile.name.charAt(0)}</Text>
          </AvatarFallback>
        </Avatar>
        <View className="ml-4">
          <Text className="text-lg font-bold text-foreground">{myProfile.name}</Text>
          <Text className="text-sm text-muted-foreground">{myProfile.email}</Text>
        </View>
      </Pressable>

      {/* 아이콘 그리드 메뉴 */}
      <View className="mx-4 my-4 flex-row flex-wrap">
        {gridMenuItems.map((item) => (
          <MenuGridItem key={item.label} icon={item.icon} label={item.label} iconColor={iconColor} />
        ))}
      </View>

      {/* 구분선 */}
      <View className="h-2 bg-secondary" />

      {/* 리스트 메뉴 */}
      <View className="mt-2">
        {/* 5. map 함수에서 handleMenuItemPress 함수를 onPress 프롭으로 전달합니다. */}
        {listMenuItems.map((item) => (
          <MenuListItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            iconColor={iconColor}
            onPress={() => handleMenuItemPress(item.label)}
            isDestructive={item.isDestructive}
          />
        ))}
      </View>
    </ScrollView>
  );
}
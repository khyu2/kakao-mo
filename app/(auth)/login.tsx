import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-8">
        <View className="w-full max-w-sm">
          <Text className="mb-6 text-center text-3xl font-bold tracking-tight text-foreground">
            로그인
          </Text>

          <View className="gap-y-6">
            <View className="gap-y-2">
              <Label nativeID="email-label">이메일</Label>
              <Input
                nativeID="email-label"
                placeholder="email@example.com"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
              />
            </View>
            <View className="gap-y-2">
              <Label nativeID="password-label">비밀번호</Label>
              <Input nativeID="password-label" placeholder="********" secureTextEntry />
            </View>
            <Button size="lg">
              <Text>로그인</Text>
            </Button>
          </View>

          <Text className="mt-6 text-center text-sm text-muted-foreground">
            계정이 없으신가요?{' '}
            <Link href="/register" asChild>
              <Text className="font-semibold text-primary">가입하기</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
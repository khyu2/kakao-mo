import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';

import Colors from '@/constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Friends',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chats',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="openChat"
        options={{
          title: 'Open Chat',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

import { Text } from '@/components/ui/text';
import { FlatList, ScrollView, View } from 'react-native';

export default function IndexScreen() {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5]}
      renderItem={() => (
        <View className="p-4 border-b border-border">
          <Text className="text-lg text-foreground">Hello, world!</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      className="flex-1 bg-background"
    >
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground"></Text>
      </View>
    </FlatList>
  );
}
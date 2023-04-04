import { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
});

export function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params?.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.name || 'Detalhes da receita',
      headerRight: () => (
        <Pressable onPress={() => console.log('something')}>
          <Entypo
            name="heart"
            size={28}
            color="#ff4141"
          />
        </Pressable>
      ),
    });
  }, [navigation, data]);

  return (
    <View style={styles.container}>
      <Text>
        {data.name}
      </Text>
    </View>
  );
}

import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import api from '../../services/api';
import { FoodList } from '../../components/foodlist';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9ff',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16,
  },
});

export function Search() {
  const route = useRoute();
  const data = route.params?.data;
  const name = route.params?.name;
  const [receipes, setReceipes] = useState([]);

  useEffect(() => {
    async function fecthReceipes() {
      const response = await api.get(`foods?name_like=${name}`);
      setReceipes(response.data);
    }

    fecthReceipes();
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        ListEmptyComponent={
          () => (
            <Text style={styles.text}>
              Não encontramos o que está buscando...
            </Text>
          )
        }
      />
    </View>
  );
}

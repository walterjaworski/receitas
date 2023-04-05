import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Entypo, AntDesign, Feather } from '@expo/vector-icons';

import { Ingredients } from '../../components/ingredients';
import { Instructions } from '../../components/instructions';
import { VideoView } from '../../components/video';

import { isFavorite, saveFavorite, removeFavorite } from '../../utils/storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9ff',
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 14,
  },
  playIcon: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 14,
    marginBottom: 4,
  },
  ingredientsText: {
    marginBottom: 14,
    fontSize: 16,
  },
  instructionsArea: {
    backgroundColor: '#4cbe6c',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderradius: 4,
    marginBottom: 14,
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: 500,
    color: '#fff',
    marginRight: 8,
  },
});

export function Detail() {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params?.data;

  const [showVideo, setShowVideo] = useState(false);
  const [favorite, setFavorite] = useState(false);

  async function handleFavoriteReceipe(receipe) {
    if (favorite) {
      await removeFavorite(receipe.id);
      setFavorite(false);
    } else {
      await saveFavorite('@appreceitas', receipe);
      setFavorite(true);
    }
  }

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorite(data);
      setFavorite(receipeFavorite);
    }

    getStatusFavorites();

    navigation.setOptions({
      title: data?.name || 'Detalhes da receita',
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(data)}>
          <Entypo
            name={`${favorite ? 'heart' : 'heart-outlined'}`}
            size={28}
            color="#ff4141"
          />
        </Pressable>
      ),
    });
  }, [navigation, data, favorite]);

  function handleOpenVideo() {
    setShowVideo((prevState) => !prevState);
  }

  async function shareReceipe() {
    try {
      await Share.share({
        url: 'https://www.google.com.br',
        message: `Receita: ${data.name}\nIngredientes: ${data.total_ingredients}\nVi lá no app Receita Fácil!`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenVideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#fafafa" />
        </View>
        <Image
          source={{ uri: data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.ingredientsText}>
            ingredientes
            {' '}
            (
            {data.total_ingredients}
            )
          </Text>
        </View>
        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {data.ingredients.map((ingredient) => (
        <Ingredients
          key={ingredient.id}
          name={ingredient.name}
          amount={ingredient.amount}
        />
      ))}

      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de Preparo</Text>
        <Feather
          name="arrow-down"
          size={24}
          color="#fff"
        />
      </View>
      {data.instructions.map((instruction, index) => (
        <Instructions
          key={instruction.id}
          index={index}
          text={instruction.text}
        />
      ))}

      <Modal visible={showVideo} animationType="slide">
        <VideoView
          handleClose={() => setShowVideo((prevState) => !prevState)}
          videoUrl={data.video}
        />
      </Modal>
    </ScrollView>
  );
}

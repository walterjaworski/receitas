import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 14,
  },
  index: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    lineHeight: 20,
  },
});

export function Instructions({ index, text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.index}>
        {index + 1}
        {' '}
        -
        {' '}
      </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

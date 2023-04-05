import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export function Ingredients({ name, amount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text>{amount}</Text>
    </View>
  );
}

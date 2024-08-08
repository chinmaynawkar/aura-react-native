import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  return(
    <View style={styles.container}>
      <Text>Hello, Welcome to Aura!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

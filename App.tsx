import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css";
export default function App() {
  return (
    <View className="flex items-center">
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar/>
    </View>
  );
}

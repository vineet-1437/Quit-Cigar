
  import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen"
import QuizScreen from "./screens/QuizScreen"
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Quiz"
    >
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
  
  export default function App() {
    return (
      <SafeAreaProvider style={styles.container}>
      <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });

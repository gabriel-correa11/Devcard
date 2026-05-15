import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // tentei slide_from_bottom mas ficou estranho
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="preview" />
        <Stack.Screen name="sucesso" />
      </Stack>
    </>
  );
}

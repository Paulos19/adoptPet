import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Index() {
  const { isLoaded, user } = useUser(); // Verifica se o estado do usuário está carregado
  const rootNavigationState = useRootNavigationState();
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);

  useEffect(() => {
    // Verifica se a navegação e o estado do usuário estão carregados
    if (rootNavigationState.key && isLoaded) {
      setIsReadyToRedirect(true);
    }
  }, [rootNavigationState.key, isLoaded]);

  if (!isReadyToRedirect) {
    // Renderiza um elemento vazio enquanto a navegação e o estado do usuário carregam
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={'/login/'} />
      )}
    </View>
  );
}

import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as SecureStore from 'expo-secure-store';
import useAuth from 'hooks/useAuth';
import { useLayoutEffect } from 'react';
import { View, StyleSheet, LogBox, ImageBackground, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  const { setUser } = useAuth();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log('credential', credential);
      setUser?.(credential);

      const result = await SecureStore.setItemAsync('credential', JSON.stringify(credential));
      console.log('store result', result);
    } catch (e) {
      console.error('apple signin error', JSON.stringify(e));

      if ((e as any).code === 'ERR_REQUEST_CANCELED') {
        LogBox.ignoreAllLogs();
      }
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={{ uri: 'https://tinder.com/static/tinder.png' }}>
        <TouchableOpacity className="absolute bottom-40" style={{ marginHorizontal: '25%' }}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.button}
            onPress={login}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});

export default LoginScreen;

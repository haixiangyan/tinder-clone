import * as AppleAuthentication from 'expo-apple-authentication';
import useAuth from 'hooks/useAuth';
import { View, StyleSheet, LogBox } from 'react-native';

const LoginScreen = () => {
  const { user, setUser } = useAuth();

  console.log('user', user);

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });

            console.log('credential', credential);
            setUser?.(credential);
            // signed in
          } catch (e) {
            console.error('apple signin error', JSON.stringify(e));

            if (e.code === 'ERR_REQUEST_CANCELED') {
              LogBox.ignoreAllLogs();
            }
          }
        }}
      />
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

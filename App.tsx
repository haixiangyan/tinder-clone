import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from 'hooks/useAuth';

import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC */}
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

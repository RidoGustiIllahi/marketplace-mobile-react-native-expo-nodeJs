import { TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function LogoutButton() {
    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Apakah Anda yakin ingin keluar?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Keluar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('id_user');

                            router.replace('/(auth)/login');
                        } catch (err) {
                            Alert.alert('Error', 'Gagal logout');
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={26} color="#FF3B30" />
        </TouchableOpacity>
    );
}

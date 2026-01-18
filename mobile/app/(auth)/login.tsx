import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { loginService } from '../../services/authService';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Validasi', 'Email dan password wajib diisi');
            return;
        }

        try {
            setLoading(true);
            const result = await loginService({ email, password });
            if (result.role === 'penjual') {
                router.replace('/(seller)/dashboard');
            } else {
                router.replace('/(buyer)/products');
            }
        } catch (error: any) {
            Alert.alert('Login Gagal', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.background}
            />

            <View style={styles.card}>
                <View style={styles.headerSection}>
                    <Text style={styles.title}>Selamat Datang</Text>
                    <Text style={styles.subtitle}>Silakan masuk untuk melanjutkan</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="contoh@email.com"
                            placeholderTextColor="#999"
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Masukkan password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Memproses...' : 'Masuk ke Akun'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/(auth)/register')}
                    style={styles.footerLink}
                >
                    <Text style={styles.footerText}>
                        Belum punya akun? <Text style={styles.linkText}>Daftar Sekarang</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        marginTop: '30%', // Membuat card menggantung di tengah-bawah
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        paddingTop: 40,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    headerSection: {
        marginBottom: 35,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#192f6a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        letterSpacing: 0.5,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b5998',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#f5f7fa',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#e1e8ee',
    },
    button: {
        backgroundColor: '#3b5998',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#3b5998",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: '#aab6d3',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    footerLink: {
        marginTop: 25,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    linkText: {
        color: '#3b5998',
        fontWeight: 'bold',
    },
});
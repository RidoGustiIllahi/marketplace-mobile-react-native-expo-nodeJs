import {
    View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
    ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { registerService } from '../../services/authService';
import RoleSelector from '../../components/auth/RoleSelector';
import AddressDropdown from '../../components/auth/AddressDropdown';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'penjual' | 'pembeli'>('pembeli');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !address) {
            Alert.alert('Error', 'Semua kolom harus diisi');
            return;
        }
        try {
            setLoading(true);
            await registerService({ name, email, password, role, address });
            Alert.alert('Sukses', 'Akun berhasil dibuat');
            router.replace('/(auth)/login');
        } catch (e: any) {
            Alert.alert('Gagal', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background} />

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.title}>Daftar Akun</Text>
                    <Text style={styles.subtitle}>Lengkapi data diri Anda</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nama Lengkap</Text>
                        <TextInput style={styles.input} placeholder="Nama Anda" onChangeText={setName} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="email@contoh.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} placeholder="Min. 6 Karakter" secureTextEntry onChangeText={setPassword} />
                    </View>

                    <RoleSelector role={role} setRole={setRole} />

                    <View style={{ zIndex: 5000 }}>
                        <Text style={styles.label}>Alamat Domisili</Text>
                        <AddressDropdown setAddress={setAddress} />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, loading && { opacity: 0.7 }]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Menyimpan...' : 'Daftar Sekarang'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.footerText}>Sudah punya akun? <Text style={styles.link}>Masuk</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300, // Background hanya di bagian atas untuk memberi kesan kedalaman
    },
    scrollContainer: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 25,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#192f6a',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3b5998',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#eee',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#3b5998',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    link: {
        color: '#3b5998',
        fontWeight: 'bold',
    }
});
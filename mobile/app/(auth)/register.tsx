import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { api } from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'penjual' | 'pembeli'>('pembeli');

    const handleRegister = async () => {
        try {
            await api.post('/users/register', { name, email, password, role });
            Alert.alert('Sukses', 'Akun berhasil dibuat!');
            router.replace('/(auth)/login');
        } catch (err: any) {
            Alert.alert('Register Gagal', err.response?.data?.message || 'Terjadi kesalahan');
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.title}>Daftar Akun</Text>
                    <Text style={styles.subtitle}>Lengkapi data diri Anda untuk memulai</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nama Lengkap</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Masukkan nama lengkap" 
                            onChangeText={setName} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="contoh@email.com" 
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={setEmail} 
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Minimal 6 karakter" 
                            secureTextEntry 
                            onChangeText={setPassword} 
                        />
                    </View>

                    <Text style={styles.label}>Daftar Sebagai:</Text>
                    <View style={styles.roleContainer}>
                        <TouchableOpacity 
                            style={[styles.roleButton, role === 'pembeli' && styles.roleButtonActive]} 
                            onPress={() => setRole('pembeli')}
                        >
                            <Text style={[styles.roleText, role === 'pembeli' && styles.roleTextActive]}>Pembeli</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.roleButton, role === 'penjual' && styles.roleButtonActive]} 
                            onPress={() => setRole('penjual')}
                        >
                            <Text style={[styles.roleText, role === 'penjual' && styles.roleTextActive]}>Penjual</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Daftar Sekarang</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.footerText}>
                            Sudah punya akun? <Text style={styles.link}>Masuk</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
    },
    roleContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 25,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    roleButtonActive: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    roleText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    roleTextActive: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
    },
    link: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
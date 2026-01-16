import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import axios from 'axios';

const API_KEY = 'frYruszswkud342oBbuC16NGknkQZ3UpRB3FqI3IdPz9qL0RBW';

type DropdownItem = {
    label: string;
    value: string;
};


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'penjual' | 'pembeli'>('pembeli');
    const [address, setAddress] = useState('');

    const [province, setProvince] = useState<string | null>(null);
    const [regency, setRegency] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);
    const [village, setVillage] = useState<string | null>(null);

    const [provinces, setProvinces] = useState<DropdownItem[]>([]);
    const [regencies, setRegencies] = useState<DropdownItem[]>([]);
    const [districts, setDistricts] = useState<DropdownItem[]>([]);
    const [villages, setVillages] = useState<DropdownItem[]>([]);

    const [openProvince, setOpenProvince] = useState(false);
    const [openRegency, setOpenRegency] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);
    const [openVillage, setOpenVillage] = useState(false);

    const handleRegister = async () => {
        try {
            await api.post('/users/register', { name, email, password, role, address });
            Alert.alert('Sukses', 'Akun berhasil dibuat!');
            router.replace('/(auth)/login');
        } catch (err: any) {
            Alert.alert('Register Gagal', err.response?.data?.message || 'Terjadi kesalahan');
        }
    };

    useEffect(() => {
        axios.get('https://use.api.co.id/regional/indonesia/provinces', {
            headers: { 'x-api-co-id': API_KEY }
        }).then(res => {
            setProvinces(
                res.data.data.map((item: any) => ({
                    label: item.name,
                    value: item.code
                }))
            );
        });
    }, []);

    useEffect(() => {
        if (!province) return;
        setRegency(null);
        setDistrict(null);
        setVillage(null);
        setRegencies([]);
        setDistricts([]);
        setVillages([]);

        axios.get(`https://use.api.co.id/regional/indonesia/provinces/${province}/regencies`, {
            headers: { 'x-api-co-id': API_KEY }
        }).then(res => {
            setRegencies(
                res.data.data.map((item: any) => ({
                    label: item.name,
                    value: item.code
                }))
            );
        });
    }, [province]);

    useEffect(() => {
        if (!regency) return;
        setDistrict(null);
        setVillage(null);
        setDistricts([]);
        setVillages([]);

        axios.get(`https://use.api.co.id/regional/indonesia/regencies/${regency}/districts`, {
            headers: { 'x-api-co-id': API_KEY }
        }).then(res => {
            setDistricts(
                res.data.data.map((item: any) => ({
                    label: item.name,
                    value: item.code
                }))
            );
        });
    }, [regency]);

    useEffect(() => {
        if (!district) return;
        setVillage(null);
        setVillages([]);

        axios.get(`https://use.api.co.id/regional/indonesia/districts/${district}/villages`, {
            headers: { 'x-api-co-id': API_KEY }
        }).then(res => {
            setVillages(
                res.data.data.map((item: any) => ({
                    label: item.name,
                    value: item.code
                }))
            );
        });
    }, [district]);

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

                    {/* PROVINCE */}
                    <DropDownPicker
                        open={openProvince}
                        value={province}
                        items={provinces}
                        setOpen={setOpenProvince}
                        setValue={setProvince}
                        setItems={setProvinces}
                        placeholder="Pilih Provinsi"
                        listMode="SCROLLVIEW" // Lebih stabil di dalam ScrollView
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholderStyle}
                        zIndex={4000}
                        zIndexInverse={1000}
                    />

                    {/* REGENCY */}
                    <DropDownPicker
                        open={openRegency}
                        value={regency}
                        items={regencies}
                        setOpen={setOpenRegency}
                        setValue={setRegency}
                        setItems={setRegencies}
                        placeholder="Pilih Kabupaten"
                        disabled={!province}
                        listMode="SCROLLVIEW"
                        style={[styles.dropdown, !province && styles.disabledDropdown]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholderStyle}
                        zIndex={3000}
                        zIndexInverse={2000}
                    />

                    {/* DISTRICT */}
                    <DropDownPicker
                        open={openDistrict}
                        value={district}
                        items={districts}
                        setOpen={setOpenDistrict}
                        setValue={setDistrict}
                        setItems={setDistricts}
                        placeholder="Pilih Kecamatan"
                        disabled={!regency}
                        listMode="SCROLLVIEW"
                        style={[styles.dropdown, !regency && styles.disabledDropdown]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholderStyle}
                        zIndex={2000}
                        zIndexInverse={3000}
                    />

                    {/* VILLAGE */}
                    <DropDownPicker
                        open={openVillage}
                        value={village}
                        items={villages}
                        setOpen={setOpenVillage}
                        setValue={setVillage}
                        setItems={setVillages}
                        placeholder="Pilih Kelurahan"
                        disabled={!district}
                        listMode="SCROLLVIEW"
                        style={[styles.dropdown, !district && styles.disabledDropdown]}
                        dropDownContainerStyle={styles.dropdownContainer}
                        placeholderStyle={styles.placeholderStyle}
                        zIndex={1000}
                        zIndexInverse={4000}
                    />

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
        marginTop: 10,
        marginLeft: 4,
    },
    dropdown: {
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 15,
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    disabledDropdown: {
        backgroundColor: '#eee',
        opacity: 0.6,
    },
    placeholderStyle: {
        color: '#aaa',
        fontSize: 15,
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
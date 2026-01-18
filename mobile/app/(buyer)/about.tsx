import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';

const TechTag = ({ icon, label, color }: { icon: any, label: string, color: string }) => (
    <View style={styles.techTag}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={styles.techLabel}>{label}</Text>
    </View>
);

export default function BuyerChat() {
    return (
        <View style={styles.container}>
            <BuyerHeader title="Chat Penjual" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Bagian: Deskripsi Aplikasi */}
                <Text style={styles.title}>Tentang Aplikasi</Text>
                <View style={styles.descCard}>
                    <Text style={styles.descText}>
                        <Text style={{ fontWeight: '700', color: '#192f6a' }}>Marketplace App</Text> ini merupakan platform perdagangan digital terintegrasi yang dirancang untuk mempertemukan <Text style={{ fontWeight: '600' }}>Penjual</Text> dan <Text style={{ fontWeight: '600' }}>Pembeli</Text> dalam satu ekosistem yang efisien.
                        {"\n\n"}
                        Sistem ini menyediakan fitur manajemen produk yang dinamis bagi penjual, lengkap dengan dashboard analitik berbasis grafik untuk memantau performa bisnis secara <Text style={{ fontStyle: 'italic' }}>real-time</Text>. Kami menjamin akurasi data pengiriman melalui integrasi <Text style={{ fontWeight: '600' }}>API Wilayah Indonesia</Text> yang mencakup data Provinsi hingga Desa secara presisi.
                        {"\n\n"}
                        Fitur unggulan lainnya meliputi perhitungan ongkos kirim otomatis yang disesuaikan dengan berat produk, koordinat lokasi, serta status pelacakan pesanan yang transparan. Dengan teknologi ini, kami berupaya menciptakan transaksi yang aman, efektif, dan akuntabel bagi seluruh pengguna.
                    </Text>
                </View>

                {/* Bagian: Teknologi yang Digunakan */}
                <Text style={styles.title}>Teknologi & Fitur</Text>
                <View style={styles.techGrid}>
                    <TechTag icon="logo-react" label="React Native" color="#61DAFB" />
                    <TechTag icon="server-outline" label="Rest API" color="#47A248" />
                    <TechTag icon="map-outline" label="Indo-Region API" color="#FF4444" />
                    <TechTag icon="analytics-outline" label="Soft UI Analytics" color="#192f6a" />
                    <TechTag icon="cube-outline" label="Stock Management" color="#F57C00" />
                </View>

                {/* Bagian: Tim Developer */}
                <Text style={styles.title}>Tim Developer</Text>
                <View style={styles.devContainer}>
                    <View style={styles.devItem}>
                        <View>
                            <Text style={styles.devName}>Fikriansyah</Text>
                            <Text style={styles.devNpm}>NRP: 152023138</Text>
                        </View>
                        <Ionicons name="code-slash" size={20} color="#192f6a" />
                    </View>

                    <View style={styles.devItem}>
                        <View>
                            <Text style={styles.devName}>Rido Gusti Illahi</Text>
                            <Text style={styles.devNpm}>NRP: 152023169</Text>
                        </View>
                        <Ionicons name="code-slash" size={20} color="#192f6a" />
                    </View>
                </View>

                {/* Bagian: Video Demo */}
                <Text style={styles.title}>Video Demo</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.linkContainer}
                    onPress={() => Linking.openURL('https://www.youtube.com/watch?v=LINK_VIDEO_DEMO')}
                >
                    <Ionicons name="logo-youtube" size={24} color="#FFF" />
                    <Text style={styles.linkText}>Tonton Demo Aplikasi di YouTube</Text>
                </TouchableOpacity>
            </ScrollView>

            <BuyerBottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 20,
        paddingBottom: 120, // Ruang agar tidak tertutup floating bottom nav
    },
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: '#192f6a',
        marginTop: 25,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    descCard: {
        backgroundColor: '#FFF',
        padding: 18,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    descText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 24,
        textAlign: 'justify',
    },
    techGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    techTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    techLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
        color: '#333',
    },
    devContainer: {
        gap: 12,
    },
    devItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#192f6a',
        elevation: 2,
    },
    devName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    devNpm: {
        fontSize: 13,
        color: '#777',
        marginTop: 2,
    },
    linkContainer: {
        backgroundColor: '#FF0000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 15,
        marginTop: 5,
        elevation: 4,
        shadowColor: '#FF0000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    linkText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 15,
        marginLeft: 10,
    },
});
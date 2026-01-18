import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export default function SellerBottomNav() {
    const pathname = usePathname();

    const tabs = [
        { name: 'Home', icon: 'home-outline', path: '/(seller)/dashboard' },
        { name: 'Produk', icon: 'cube-outline', path: '/(seller)/products' },
        { name: 'About', icon: 'chatbubbles-outline', path: '/(seller)/about' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map(tab => {
                const active = pathname === tab.path;

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={() => router.replace(tab.path as any)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={22}
                            // Menggunakan warna biru tema saat aktif
                            color={active ? '#192f6a' : '#8E8E93'}
                        />
                        <Text style={[styles.label, active && styles.activeLabel]}>
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Membuat efek melayang (Floating)
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 65,
        borderRadius: 20,
        // Shadow untuk Android
        elevation: 10,
        // Shadow untuk iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    label: {
        fontSize: 10,
        color: '#8E8E93',
        marginTop: 4,
        fontWeight: '500',
    },
    activeLabel: {
        color: '#192f6a', // Konsisten dengan tema biru Seller
        fontWeight: '700',
    },
});
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export default function SellerBottomNav() {
    const pathname = usePathname();

    const tabs = [
        { name: 'Dashboard', icon: 'home-outline', path: '/(seller)/dashboard' },
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
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={24}
                            color={active ? '#007AFF' : '#8E8E93'}
                        />
                        <Text style={[styles.label, active && styles.active]}>
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
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 10,
    },
    tab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    label: { fontSize: 11, marginTop: 4, color: '#8E8E93' },
    active: { color: '#007AFF', fontWeight: 'bold' }
});
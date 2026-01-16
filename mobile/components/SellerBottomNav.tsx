import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export default function SellerBottomNav() {
    const pathname = usePathname();

    const tabs = [
        { name: 'Dashboard', icon: 'home-outline', path: '/(seller)/dashboard' },
        { name: 'Produk', icon: 'cube-outline', path: '/(seller)/products' },
        { name: 'Chat', icon: 'chatbubbles-outline', path: '/(seller)/chat' },
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
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
    tab: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    active: {
        color: '#007AFF',
        fontWeight: '600',
    },
});

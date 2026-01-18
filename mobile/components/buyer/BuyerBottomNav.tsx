import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

export default function BuyerBottomNav() {
    const path = usePathname();

    const NavItem = ({ icon, route }: any) => (
        <TouchableOpacity onPress={() => router.replace(route)}>
            <Ionicons
                name={icon}
                size={26}
                color={path === route ? '#007AFF' : '#8E8E93'}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.nav}>
            <NavItem icon="pricetags-outline" route="/(buyer)/products" />
            <NavItem icon="receipt-outline" route="/(buyer)/orders" />
            <NavItem icon="chatbubble-outline" route="/(buyer)/about" />
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 65,
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
});

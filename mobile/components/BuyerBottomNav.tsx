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
            <NavItem icon="chatbubble-outline" route="/(buyer)/chat" />
        </View>
    );
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 30,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
    },
});

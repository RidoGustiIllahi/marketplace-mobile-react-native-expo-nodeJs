import { View, Text, StyleSheet } from 'react-native';
import BuyerHeader from '../../components/BuyerHeader';
import BuyerBottomNav from '../../components/BuyerBottomNav';

export default function BuyerOrders() {
    return (
        <View style={styles.container}>
            <BuyerHeader title="Pesanan Saya" />

            <View style={styles.content}>
                <Text>Riwayat Pesanan</Text>
            </View>

            <BuyerBottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 20 },
});

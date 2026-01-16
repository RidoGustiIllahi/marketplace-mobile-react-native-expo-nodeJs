import { View, Text, StyleSheet } from 'react-native';
import SellerHeader from '../../components/SellerHeader';

export default function SellerDashboard() {
    return (
        <View style={styles.container}>
            <SellerHeader title="Dashboard Penjual" />

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.label}>Total Pendapatan</Text>
                    <Text style={styles.value}>Rp 8.450.000</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
    card: {
        backgroundColor: '#1C1C1E',
        borderRadius: 20,
        padding: 20,
    },
    label: { color: '#8E8E93' },
    value: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

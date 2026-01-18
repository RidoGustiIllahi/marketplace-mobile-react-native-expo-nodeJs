import {
    View, Text, StyleSheet, FlatList, Image,
    ActivityIndicator, RefreshControl, Alert, TouchableOpacity, ScrollView, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SellerHeader from '../../components/seller/SellerHeader';
import { useSellerOrders } from '../../hooks/seller/useSellerOrders';
import OrderPieChart from "../../components/seller/OrderPieChart";
import { useOrderStats } from "../../hooks/seller/useOrderStats";

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function SellerDashboard() {
    const {
        orders, loading, refresh, shipOrder, statusFilter, changeFilter
    } = useSellerOrders();

    const stats = useOrderStats(orders);

    const FILTERS = [
        { label: "Semua", value: "all" },
        { label: "Baru", value: "ordered" },
        { label: "Dikirim", value: "shipped" },
        { label: "Selesai", value: "completed" },
        { label: "Batal", value: "cancelled" }
    ];

    const getStatusTheme = (status: string) => {
        switch (status) {
            case 'ordered': return { bg: '#E3F2FD', text: '#1976D2', icon: 'time-outline' };
            case 'shipped': return { bg: '#FFF3E0', text: '#F57C00', icon: 'airplane-outline' };
            case 'completed': return { bg: '#E8F5E9', text: '#388E3C', icon: 'checkmark-done-circle-outline' };
            case 'cancelled': return { bg: '#FFEBEE', text: '#D32F2F', icon: 'close-circle-outline' };
            default: return { bg: '#F5F5F5', text: '#616161', icon: 'help-circle-outline' };
        }
    };

    const renderItem = ({ item }: any) => {
        const theme = getStatusTheme(item.status);

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.buyerInfo}>
                        <Ionicons name="person-circle-outline" size={20} color="#666" />
                        <Text style={styles.buyerName}>{item.user.name}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: theme.bg }]}>
                        <Text style={[styles.statusText, { color: theme.text }]}>{item.status.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.productRow}>
                    <Image source={{ uri: IMAGE_URL + item.product.image }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
                        <Text style={styles.qtyText}>Qty: {item.quantity} pcs</Text>
                        <Text style={styles.totalPrice}>Rp {Number(item.total_price).toLocaleString()}</Text>
                    </View>
                </View>

                {item.status === "ordered" && (
                    <TouchableOpacity
                        style={styles.shipBtn}
                        onPress={() => Alert.alert("Proses Kirim", "Konfirmasi pengiriman produk?", [
                            { text: "Nanti", style: "cancel" },
                            { text: "Kirim Sekarang", onPress: () => shipOrder(item.id_order) }
                        ])}
                    >
                        <Ionicons name="send" size={16} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={styles.shipBtnText}>Kirim Pesanan</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <SellerHeader title="Dashboard Penjual" />

            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filterBar}
                    contentContainerStyle={{ paddingRight: 20 }}
                >
                    {FILTERS.map(f => (
                        <TouchableOpacity
                            key={f.value}
                            onPress={() => changeFilter(f.value as any)}
                            style={[styles.chip, statusFilter === f.value && styles.activeChip]}
                        >
                            <Text style={[styles.chipText, statusFilter === f.value && styles.activeChipText]}>
                                {f.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.content}>
                {loading && orders.length === 0 ? (
                    <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id_order.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
                        ListHeaderComponent={
                            !loading ? (
                                <View>
                                    <OrderPieChart stats={stats} />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="file-tray-outline" size={64} color="#DDD" />
                                <Text style={styles.empty}>Tidak ada pesanan untuk filter ini</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    filterBar: {
        paddingVertical: 12,
        paddingLeft: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F0F2F5',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeChip: {
        backgroundColor: '#192f6a',
        borderColor: '#192f6a',
    },
    chipText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    activeChipText: {
        color: '#FFF',
    },
    content: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    buyerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buyerName: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginLeft: 6,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    qtyText: {
        fontSize: 12,
        color: '#888',
        marginVertical: 2,
    },
    totalPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#192f6a',
    },
    shipBtn: {
        backgroundColor: '#192f6a',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    shipBtnText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    empty: {
        color: '#AAA',
        marginTop: 10,
    }
});
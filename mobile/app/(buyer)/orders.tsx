import {
    View, Text, StyleSheet, FlatList, Image,
    ActivityIndicator, RefreshControl, Alert, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';
import { useBuyerOrders } from '../../hooks/buyer/useBuyerOrders';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function BuyerOrders() {
    const { orders, loading, refresh, changeStatus } = useBuyerOrders();

    // Helper untuk warna status
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'ordered': return { bg: '#E3F2FD', text: '#1976D2', label: 'Menunggu' };
            case 'shipped': return { bg: '#FFF3E0', text: '#F57C00', label: 'Dikirim' };
            case 'completed': return { bg: '#E8F5E9', text: '#388E3C', label: 'Selesai' };
            case 'cancelled': return { bg: '#FFEBEE', text: '#D32F2F', label: 'Dibatalkan' };
            default: return { bg: '#F5F5F5', text: '#616161', label: status };
        }
    };

    const renderItem = ({ item }: any) => {
        const statusConfig = getStatusStyle(item.status);

        return (
            <View style={styles.card}>
                {/* Header Card: Tanggal & Status */}
                <View style={styles.cardHeader}>
                    <View style={styles.dateContainer}>
                        <Ionicons name="calendar-outline" size={14} color="#888" />
                        <Text style={styles.dateText}>
                            {new Date(item.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                        <Text style={[styles.statusText, { color: statusConfig.text }]}>
                            {statusConfig.label}
                        </Text>
                    </View>
                </View>

                {/* Body Card: Produk Info */}
                <View style={styles.productRow}>
                    <Image  
                        source={{ uri: IMAGE_URL + item.product.image }}
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>{item.product.name}</Text>
                        <Text style={styles.productQty}>{item.quantity} Barang</Text>
                        <Text style={styles.totalLabel}>Total Belanja:</Text>
                        <Text style={styles.totalPrice}>Rp {Number(item.total_price).toLocaleString()}</Text>
                    </View>
                </View>

                {/* Footer Card: Action Buttons */}
                {(item.status === "ordered" || item.status === "shipped") && (
                    <View style={styles.cardFooter}>
                        {item.status === "ordered" && (
                            <TouchableOpacity
                                style={styles.outlineBtn}
                                onPress={() => {
                                    Alert.alert("Batalkan Pesanan", "Apakah Anda yakin?", [
                                        { text: "Tidak", style: "cancel" },
                                        { text: "Ya, Batal", onPress: () => changeStatus(item.id_order, "cancelled") }
                                    ]);
                                }}
                            >
                                <Text style={styles.outlineBtnText}>Batalkan</Text>
                            </TouchableOpacity>
                        )}

                        {item.status === "shipped" && (
                            <TouchableOpacity
                                style={styles.primaryBtn}
                                onPress={() => {
                                    Alert.alert("Selesaikan Pesanan", "Sudah menerima barang?", [
                                        { text: "Belum", style: "cancel" },
                                        { text: "Sudah", onPress: () => changeStatus(item.id_order, "completed") }
                                    ]);
                                }}
                            >
                                <Text style={styles.primaryBtnText}>Pesanan Diterima</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <BuyerHeader title="Daftar Pesanan" />

            <View style={styles.content}>
                {loading && orders.length === 0 ? (
                    <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id_order.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainer}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={refresh} />
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Ionicons name="receipt-outline" size={80} color="#DDD" />
                                <Text style={styles.emptyText}>Belum ada riwayat pesanan</Text>
                            </View>
                        }
                    />
                )}
            </View>

            <BuyerBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { flex: 1 },
    listContainer: { padding: 16, paddingBottom: 100 },

    // Card Styles
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        paddingBottom: 12,
        marginBottom: 12,
    },
    dateContainer: { flexDirection: 'row', alignItems: 'center' },
    dateText: { fontSize: 12, color: '#888', marginLeft: 4 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusText: { fontSize: 11, fontWeight: '700' },

    // Product Info
    productRow: { flexDirection: 'row', alignItems: 'center' },
    productImage: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#F5F5F5' },
    productInfo: { flex: 1, marginLeft: 16 },
    productName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
    productQty: { fontSize: 13, color: '#777', marginTop: 2 },
    totalLabel: { fontSize: 11, color: '#AAA', marginTop: 8 },
    totalPrice: { fontSize: 15, fontWeight: 'bold', color: '#007AFF' },

    // Footer & Buttons
    cardFooter: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'flex-end',
    },
    primaryBtn: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
    outlineBtn: {
        borderWidth: 1,
        borderColor: '#FF3B30',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    outlineBtnText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 13 },

    // Empty State
    emptyState: { marginTop: 100, alignItems: 'center' },
    emptyText: { marginTop: 16, fontSize: 16, color: '#AAA' }
});
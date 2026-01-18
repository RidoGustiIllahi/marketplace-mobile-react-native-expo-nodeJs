import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useOrder } from "../../hooks/buyer/useOrder";
import BuyerHeader from './BuyerHeader';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function CheckoutScreen({ product, quantity, setQuantity, buyerAddress, sellerAddress, shippingOptions, selectedCourier, setSelectedCourier, loadingShipping, onBack }: any) {
    const productTotal = Number(product.price) * quantity;
    const shippingCost = selectedCourier ? Number(selectedCourier.price) : 0;
    const totalPay = productTotal + shippingCost;
    const { placeOrder, loading } = useOrder();

    return (
        <SafeAreaView style={styles.container}>
            <BuyerHeader title="Checkout" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                {/* Item Card */}
                <View style={styles.sectionCard}>
                    <View style={styles.productRow}>
                        <Image source={{ uri: IMAGE_URL + product.image }} style={styles.thumb} />
                        <View style={styles.productDetail}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>Rp {Number(product.price).toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                {/* Address Section */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Detail Pengiriman</Text>

                    <View style={styles.addressWrapper}>
                        <View style={styles.timeline}>
                            <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
                            <View style={styles.line} />
                            <View style={[styles.dot, { backgroundColor: '#FF3B30' }]} />
                        </View>

                        <View style={styles.addressTextWrapper}>
                            <View style={styles.addressItem}>
                                <Text style={styles.addressLabel}>Asal (Penjual)</Text>
                                {sellerAddress ? (
                                    <Text style={styles.addressContent}>{sellerAddress.name}, {sellerAddress.district}</Text>
                                ) : <ActivityIndicator size="small" />}
                            </View>

                            <View style={[styles.addressItem, { marginBottom: 0 }]}>
                                <Text style={styles.addressLabel}>Tujuan (Kamu)</Text>
                                {buyerAddress ? (
                                    <Text style={styles.addressContent}>{buyerAddress.name}, {buyerAddress.district}, {buyerAddress.regency}</Text>
                                ) : <ActivityIndicator size="small" />}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quantity & Courier Selection */}
                <View style={styles.rowBetween}>
                    <View style={[styles.sectionCard, { flex: 1, marginRight: 8, marginBottom: 0 }]}>
                        <Text style={styles.sectionTitleSmall}>Jumlah</Text>
                        <View style={styles.stepper}>
                            <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)} style={styles.stepBtn}>
                                <Ionicons name="remove" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepBtn}>
                                <Ionicons name="add" size={18} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.sectionCard, { flex: 1.5, marginLeft: 8, marginBottom: 0 }]}>
                        <Text style={styles.sectionTitleSmall}>Kurir</Text>
                        <View style={styles.pickerWrapper}>
                            {loadingShipping ? <ActivityIndicator size="small" /> : (
                                <Picker selectedValue={selectedCourier} onValueChange={setSelectedCourier} mode="dropdown">
                                    <Picker.Item label="Pilih..." value={null} />
                                    {shippingOptions.map((item: any, idx: number) => (
                                        <Picker.Item key={idx} label={item.courier_name} value={item} />
                                    ))}
                                </Picker>
                            )}
                        </View>
                    </View>
                </View>

                {/* Payment Summary */}
                {selectedCourier && (
                    <View style={styles.summaryCard}>
                        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Ringkasan Bayar</Text>
                        <Row label="Total Produk" value={productTotal} />
                        <Row label="Ongkos Kirim" value={shippingCost} />
                        <View style={styles.divider} />
                        <Row label="Total Belanja" value={totalPay} bold />
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.mainBtn, (!selectedCourier || loading) && styles.disabledBtn]}
                    disabled={!selectedCourier || loading}
                    onPress={() =>
                        placeOrder({
                            id_product: product.id_product,
                            quantity,
                            shipping_price: shippingCost,
                            onSuccess: onBack
                        })
                    }
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.mainBtnText}>Bayar Sekarang</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Ganti Produk</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const Row = ({ label, value, bold }: any) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={[styles.rowLabel, bold && styles.boldText]}>{label}</Text>
        <Text style={[styles.rowValue, bold && styles.boldText]}>Rp {Number(value).toLocaleString()}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scroll: { padding: 16 },
    sectionCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 },
    productRow: { flexDirection: 'row', alignItems: 'center' },
    thumb: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#f0f0f0' },
    productDetail: { marginLeft: 16, flex: 1 },
    productName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
    productPrice: { fontSize: 14, color: '#007AFF', marginTop: 4, fontWeight: '600' },
    sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 16 },
    sectionTitleSmall: { fontSize: 13, fontWeight: 'bold', color: '#777', marginBottom: 8 },

    // Address Timeline
    addressWrapper: { flexDirection: 'row' },
    timeline: { alignItems: 'center', width: 20, marginRight: 12 },
    dot: { width: 8, height: 8, borderRadius: 4 },
    line: { width: 1, flex: 1, backgroundColor: '#E0E0E0', marginVertical: 4 },
    addressTextWrapper: { flex: 1 },
    addressItem: { marginBottom: 20 },
    addressLabel: { fontSize: 11, fontWeight: 'bold', color: '#AAA', textTransform: 'uppercase' },
    addressContent: { fontSize: 14, color: '#333', marginTop: 2 },

    // Controls
    rowBetween: { flexDirection: 'row', marginBottom: 16 },
    stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F7FA', borderRadius: 10, padding: 5 },
    stepBtn: { backgroundColor: '#fff', padding: 6, borderRadius: 8, elevation: 1 },
    qtyText: { fontSize: 16, fontWeight: 'bold' },
    pickerWrapper: { backgroundColor: '#F5F7FA', borderRadius: 10, justifyContent: 'center' },

    // Summary
    summaryCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: '#E5F1FF' },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
    rowLabel: { color: '#666', fontSize: 14 },
    rowValue: { color: '#1A1A1A', fontSize: 14 },
    boldText: { fontWeight: 'bold', color: '#1A1A1A', fontSize: 16 },

    mainBtn: { backgroundColor: '#007AFF', height: 55, borderRadius: 16, justifyContent: 'center', alignItems: 'center', elevation: 4 },
    disabledBtn: { backgroundColor: '#A0CFFF' },
    mainBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    backBtn: { marginTop: 15, alignItems: 'center', padding: 10 },
    backBtnText: { color: '#888', textDecorationLine: 'underline' }
});
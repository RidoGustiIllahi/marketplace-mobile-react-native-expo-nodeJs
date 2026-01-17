import {
    View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
    ScrollView, ActivityIndicator, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services/api';
import { getShippingCost } from '../../services/shippingService';
import { getVillageByCode } from '../../services/regionService';
import BuyerHeader from '../../components/BuyerHeader';
import BuyerBottomNav from '../../components/BuyerBottomNav';

const IMAGE_URL = 'http://10.22.209.58:3001/';

export default function BuyerProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Alamat & Shipping State
    const [sellerAddress, setSellerAddress] = useState<any>(null);
    const [buyerAddress, setBuyerAddress] = useState<any>(null);
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedCourier, setSelectedCourier] = useState<any>(null);
    const [loadingShipping, setLoadingShipping] = useState(false);

    const loadProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    // Load Addresses when product is selected
    useEffect(() => {
        if (!selectedProduct) return;
        const loadAddress = async () => {
            try {
                const buyerId = await AsyncStorage.getItem('id_user');
                const [buyerRes, sellerRes] = await Promise.all([
                    api.get(`/users/${buyerId}`),
                    api.get(`/users/${selectedProduct.id_user}`)
                ]);

                const [bVillage, sVillage] = await Promise.all([
                    getVillageByCode(buyerRes.data.address),
                    getVillageByCode(sellerRes.data.address)
                ]);

                setBuyerAddress(bVillage);
                setSellerAddress(sVillage);
            } catch (error) {
                console.error('Load address error:', error);
            }
        };
        loadAddress();
    }, [selectedProduct]);

    // Load Shipping Cost
    const totalWeight = selectedProduct ? Number(selectedProduct.weight) * quantity : 0;
    const productTotalPrice = selectedProduct ? Number(selectedProduct.price) * quantity : 0;

    useEffect(() => {
        if (!sellerAddress || !buyerAddress || !selectedProduct) return;
        const loadShipping = async () => {
            setLoadingShipping(true);
            try {
                const res = await getShippingCost(sellerAddress.code, buyerAddress.code, totalWeight);
                setShippingOptions(res.data.data.couriers);
                setSelectedCourier(null);
            } catch (err) {
                console.log('Shipping error', err);
            } finally {
                setLoadingShipping(false);
            }
        };
        loadShipping();
    }, [sellerAddress, buyerAddress, totalWeight]);

    const resetSelection = () => {
        setSelectedProduct(null);
        setSellerAddress(null);
        setBuyerAddress(null);
        setShippingOptions([]);
        setSelectedCourier(null);
        setQuantity(1);
    };

    /* ===================== RENDER LIST PRODUK ====================== */
    const renderProductItem = ({ item }: { item: any }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: IMAGE_URL + item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productDesc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>Rp {Number(item.price).toLocaleString()}</Text>
                    <TouchableOpacity style={styles.smallOrderBtn} onPress={() => setSelectedProduct(item)}>
                        <Text style={styles.smallOrderText}>Pesan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    if (selectedProduct) {
        return (
            <SafeAreaView style={styles.container}>
                <BuyerHeader title="Detail Pesanan" />
                <ScrollView contentContainerStyle={styles.checkoutScroll}>
                    <View style={styles.checkoutCard}>
                        <View style={styles.checkoutHeader}>
                            <Image source={{ uri: IMAGE_URL + selectedProduct.image }} style={styles.thumbImage} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.checkoutName}>{selectedProduct.name}</Text>
                                <Text style={styles.checkoutPrice}>Rp {Number(selectedProduct.price).toLocaleString()}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Section: Alamat */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                <Ionicons name="map-outline" size={16} color="#555" /> Informasi Lokasi
                            </Text>

                            <View style={styles.addressCard}>
                                {/* ALAMAT PENJUAL (ASAL) */}
                                <View style={styles.addressRow}>
                                    <View style={styles.dotLineContainer}>
                                        <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
                                        <View style={styles.line} />
                                    </View>
                                    <View style={styles.addressContent}>
                                        <Text style={styles.addressLabel}>Dikirim dari (Toko):</Text>
                                        {sellerAddress ? (
                                            <Text style={styles.addressTextSmall}>
                                                {sellerAddress.name}, {sellerAddress.district}
                                            </Text>
                                        ) : <ActivityIndicator size="small" style={{ alignSelf: 'flex-start' }} />}
                                    </View>
                                </View>

                                {/* ALAMAT PEMBELI (TUJUAN) */}
                                <View style={[styles.addressRow, { marginTop: -5 }]}>
                                    <View style={styles.dotLineContainer}>
                                        <View style={[styles.dot, { backgroundColor: '#FF3B30' }]} />
                                    </View>
                                    <View style={styles.addressContent}>
                                        <Text style={styles.addressLabel}>Tujuan Pengiriman:</Text>
                                        {buyerAddress ? (
                                            <Text style={styles.addressTextSmall}>
                                                {buyerAddress.name}, {buyerAddress.district}, {buyerAddress.regency}
                                            </Text>
                                        ) : <ActivityIndicator size="small" style={{ alignSelf: 'flex-start' }} />}
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Quantity Stepper */}
                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionTitle}>Jumlah</Text>
                            <View style={styles.stepper}>
                                <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)} style={styles.stepBtn}>
                                    <Ionicons name="remove" size={20} color="#333" />
                                </TouchableOpacity>
                                <Text style={styles.stepValue}>{quantity}</Text>
                                <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.stepBtn}>
                                    <Ionicons name="add" size={20} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Shipping Picker */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Opsi Pengiriman</Text>
                            <View style={styles.pickerContainer}>
                                {loadingShipping ? (
                                    <ActivityIndicator style={{ padding: 10 }} />
                                ) : (
                                    <Picker
                                        selectedValue={selectedCourier}
                                        onValueChange={(v) => setSelectedCourier(v)}
                                    >
                                        <Picker.Item label="Pilih Kurir..." value={null} />
                                        {shippingOptions.map((item, idx) => (
                                            <Picker.Item key={idx} label={`${item.courier_name} (Rp ${item.price})`} value={item} />
                                        ))}
                                    </Picker>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Ringkasan Pembayaran */}
                    {selectedCourier && (
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}><Text>Harga Produk</Text><Text>Rp {productTotalPrice.toLocaleString()}</Text></View>
                            <View style={styles.summaryRow}><Text>Ongkos Kirim</Text><Text>Rp {Number(selectedCourier.price).toLocaleString()}</Text></View>
                            <View style={[styles.summaryRow, { marginTop: 10 }]}><Text style={styles.boldText}>Total Bayar</Text><Text style={styles.totalPriceText}>Rp {(productTotalPrice + Number(selectedCourier.price)).toLocaleString()}</Text></View>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.confirmBtn, !selectedCourier && styles.disabledBtn]}
                        disabled={!selectedCourier}
                        onPress={() => alert('Pesanan diproses!')}
                    >
                        <Text style={styles.confirmBtnText}>Konfirmasi Pesanan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backLink} onPress={resetSelection}>
                        <Text style={styles.backLinkText}>Kembali Pilih Produk</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <BuyerHeader title="Katalog Produk" />
            {loading ? <ActivityIndicator size="large" style={{ flex: 1 }} /> : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id_product.toString()}
                    renderItem={renderProductItem}
                    contentContainerStyle={styles.listPadding}
                />
            )}
            <BuyerBottomNav />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    listPadding: { padding: 16, paddingBottom: 80 },

    // Product List Styles
    productCard: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 16, overflow: 'hidden', flexDirection: 'row', elevation: 2 },
    productImage: { width: 110, height: 110 },
    productInfo: { flex: 1, padding: 12, justifyContent: 'space-between' },
    productName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    productDesc: { fontSize: 12, color: '#666', marginVertical: 4 },
    productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    productPrice: { fontSize: 15, fontWeight: 'bold', color: '#007AFF' },
    smallOrderBtn: { backgroundColor: '#007AFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    smallOrderText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

    // Checkout Styles
    checkoutScroll: { padding: 16, paddingBottom: 100 },
    checkoutCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 3 },
    checkoutHeader: { flexDirection: 'row', alignItems: 'center' },
    thumbImage: { width: 60, height: 60, borderRadius: 10 },
    checkoutName: { fontSize: 18, fontWeight: 'bold' },
    checkoutPrice: { fontSize: 16, color: '#007AFF', fontWeight: 'bold' },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
    section: { marginBottom: 20 },
    sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 8 },
    addressInfoBox: { backgroundColor: '#F0F4F8', padding: 12, borderRadius: 10 },

    // Stepper
    stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: 10, padding: 4 },
    stepBtn: { width: 32, height: 32, backgroundColor: '#fff', borderRadius: 8, justifyContent: 'center', alignItems: 'center', elevation: 1 },
    stepValue: { marginHorizontal: 15, fontWeight: 'bold', fontSize: 16 },

    // Form Elements
    pickerContainer: { backgroundColor: '#F5F5F5', borderRadius: 12, borderWidth: 1, borderColor: '#DDD', overflow: 'hidden' },
    summaryCard: { backgroundColor: '#E1F5FE', borderRadius: 15, padding: 15, marginTop: 15 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    boldText: { fontWeight: 'bold', fontSize: 14 },
    totalPriceText: { fontSize: 18, fontWeight: 'bold', color: '#E64A19' },

    confirmBtn: { backgroundColor: '#007AFF', borderRadius: 15, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    disabledBtn: { backgroundColor: '#A0CFFF' },
    confirmBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    backLink: { marginTop: 15, alignItems: 'center' },
    backLinkText: { color: '#666', textDecorationLine: 'underline' },

    addressCard: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#EDF0F3',
    },
    addressRow: {
        flexDirection: 'row',
    },
    dotLineContainer: {
        alignItems: 'center',
        width: 20,
        marginRight: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: 4,
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#DDD',
        marginVertical: 4,
    },
    addressContent: {
        flex: 1,
        paddingBottom: 15,
    },
    addressLabel: {
        fontSize: 11,
        color: '#888',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    addressTextSmall: {
        fontSize: 13,
        color: '#333',
        lineHeight: 18,
    },
});
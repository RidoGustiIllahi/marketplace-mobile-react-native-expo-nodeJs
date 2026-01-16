import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import SellerHeader from '../../components/SellerHeader';
import { getProducts, deleteProduct } from '../../services/productService';
import ProductForm from './ProductForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    
    const loadProducts = async () => {
        const id_user = await AsyncStorage.getItem('id_user');
        const res = await getProducts(Number(id_user));
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const onDelete = (id: number) => {
        Alert.alert('Hapus', 'Yakin hapus produk?', [
            { text: 'Batal' },
            {
                text: 'Hapus',
                onPress: async () => {
                    await deleteProduct(id);
                    loadProducts();
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <SellerHeader title="Produk Saya" />

            {showForm ? (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedProduct(null);
                        loadProducts();
                    }}
                />
            ) : (
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => setShowForm(true)}
                    >
                        <Text style={styles.addText}>+ Tambah Produk</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id_product.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text>Rp {item.price}</Text>
                                <Text>Stok: {item.stock_quantity}</Text>

                                <View style={styles.actions}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedProduct(item);
                                            setShowForm(true);
                                        }}
                                    >
                                        <Text style={styles.edit}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => onDelete(item.id_product)}
                                    >
                                        <Text style={styles.delete}>Hapus</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { padding: 20 },
    addBtn: {
        backgroundColor: '#1e90ff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 6,
    },
    addText: { color: '#fff', textAlign: 'center' },
    card: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        marginBottom: 10,
    },
    name: { fontWeight: 'bold', fontSize: 16 },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    edit: { color: 'orange' },
    delete: { color: 'red' },
    form: { padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

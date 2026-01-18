import { View, Text, FlatList, SafeAreaView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SellerHeader from '../../components/seller/SellerHeader';
import ProductForm from './ProductForm';
import ProductCard from '../../components/seller/ProductCard';
import { useSellerProducts } from '../../hooks/seller/useSellerProducts';
import { useState } from 'react';

export default function Products() {
    const { products, deleteProduct, reload } = useSellerProducts();
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const onDelete = (id: number) => {
        Alert.alert('Hapus Produk', 'Yakin ingin menghapus?', [
            { text: 'Batal' },
            {
                text: 'Hapus',
                style: 'destructive',
                onPress: () => deleteProduct(id),
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <SellerHeader title="Katalog Produk" />

            {showForm ? (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedProduct(null);
                        reload();
                    }}
                />
            ) : (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={products}
                        contentContainerStyle={styles.listContent}
                        keyExtractor={(item) => item.id_product.toString()}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onEdit={() => {
                                    setSelectedProduct(item);
                                    setShowForm(true);
                                }}
                                onDelete={() => onDelete(item.id_product)}
                            />
                        )}
                        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada produk.</Text>}
                    />

                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => setShowForm(true)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    listContent: {
        padding: 16,
        paddingBottom: 120, // Agar tidak tertutup FAB/Nav
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 100, // Sesuaikan agar di atas BottomNav
        backgroundColor: '#192f6a',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 50,
        fontSize: 16,
    }
});
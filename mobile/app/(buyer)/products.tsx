import { View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import BuyerHeader from '../../components/buyer/BuyerHeader';
import BuyerBottomNav from '../../components/buyer/BuyerBottomNav';
import CheckoutScreen from '../../components/buyer/CheckoutScreen';

import { useProducts } from '../../hooks/buyer/useProducts';
import { useAddresses } from '../../hooks/buyer/useAddresses';
import { useShipping } from '../../hooks/buyer/useShipping';

import ProductCard from '../../components/buyer/ProductCard';
import React, { useState } from 'react';

export default function BuyerProducts() {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    const { products, loading } = useProducts();
    const { buyerAddress, sellerAddress } = useAddresses(selectedProduct);

    const totalWeight = selectedProduct ? selectedProduct.weight * quantity : 0;

    const {
        shippingOptions,
        selectedCourier,
        setSelectedCourier,
        loadingShipping
    } = useShipping(sellerAddress, buyerAddress, totalWeight);

    if (!selectedProduct) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <BuyerHeader title="Katalog Produk" />
                {loading ? (
                    <ActivityIndicator style={{ flex: 1 }} />
                ) : (
                    <FlatList
                        data={products}
                        keyExtractor={(i) => i.id_product.toString()}
                        renderItem={({ item }) => (
                            <ProductCard item={item} onSelect={setSelectedProduct} />
                        )}
                    />
                )}
                <BuyerBottomNav />
            </SafeAreaView>
        );
    }

    return (
        <CheckoutScreen
            product={selectedProduct}
            quantity={quantity}
            setQuantity={setQuantity}
            buyerAddress={buyerAddress}
            sellerAddress={sellerAddress}
            shippingOptions={shippingOptions}
            selectedCourier={selectedCourier}
            setSelectedCourier={setSelectedCourier}
            loadingShipping={loadingShipping}
            onBack={() => setSelectedProduct(null)}
        />
    );
}

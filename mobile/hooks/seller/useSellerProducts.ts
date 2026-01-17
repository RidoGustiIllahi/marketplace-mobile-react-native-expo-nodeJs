import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getProductsByUser,
    deleteProductById,
} from '../../services/productService';

export function useSellerProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const id_user = await AsyncStorage.getItem('id_user');
            if (!id_user) return;

            const res = await getProductsByUser(Number(id_user));
            setProducts(res.data);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        await deleteProductById(id);
        loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return {
        products,
        loading,
        reload: loadProducts,
        deleteProduct,
    };
}

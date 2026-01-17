import { useEffect, useState } from 'react';
import { api } from '../../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return { products, loading };
};

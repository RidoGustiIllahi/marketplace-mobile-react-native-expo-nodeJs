import { useEffect, useState } from 'react';
import { getShippingCost } from '../../services/shippingService';

export const useShipping = (
    sellerAddress: any,
    buyerAddress: any,
    totalWeight: number
) => {
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedCourier, setSelectedCourier] = useState<any>(null);
    const [loadingShipping, setLoadingShipping] = useState(false);

    useEffect(() => {
        if (!sellerAddress || !buyerAddress || totalWeight <= 0) return;

        const loadShipping = async () => {
            setLoadingShipping(true);
            try {
                const res = await getShippingCost(
                    sellerAddress.code,
                    buyerAddress.code,
                    totalWeight
                );
                setShippingOptions(res.data.data.couriers);
                setSelectedCourier(null);
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingShipping(false);
            }
        };

        loadShipping();
    }, [sellerAddress, buyerAddress, totalWeight]);

    return {
        shippingOptions,
        selectedCourier,
        setSelectedCourier,
        loadingShipping
    };
};

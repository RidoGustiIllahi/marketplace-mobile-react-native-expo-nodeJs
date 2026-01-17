import { useState } from "react";
import { Alert } from "react-native";
import { createOrder } from "../../services/orderService";
import { getUserFromStorage } from "../../services/authHelper";

export const useOrder = () => {
    const [loading, setLoading] = useState(false);

    const placeOrder = async ({
        id_product,
        quantity,
        shipping_price,
        onSuccess
    }: {
        id_product: number;
        quantity: number;
        shipping_price: number;
        onSuccess?: () => void;
    }) => {
        try {
            setLoading(true);

            const user = await getUserFromStorage();

            if (!user.id_user) {
                Alert.alert("Error", "User belum login");
                return;
            }

            await createOrder({
                id_user: user.id_user,
                id_product,
                quantity,
                shipping_price
            });

            Alert.alert("Berhasil", "Pesanan berhasil dibuat");
            onSuccess?.();
        } catch (err: any) {
            Alert.alert(
                "Gagal",
                err.response?.data?.message || "Terjadi kesalahan"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        placeOrder,
        loading
    };
};

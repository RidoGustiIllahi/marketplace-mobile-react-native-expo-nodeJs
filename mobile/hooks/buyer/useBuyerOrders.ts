import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrdersByUser, updateOrderStatus } from "../../services/orderService";

export const useBuyerOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const id_user = await AsyncStorage.getItem("id_user");
            if (!id_user) return;

            const data = await getOrdersByUser(Number(id_user));
            setOrders(data);
        } catch (err: any) {
            Alert.alert("Error", "Gagal memuat pesanan");
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (
        id_order: number,
        status: "cancelled" | "completed"
    ) => {
        try {
            await updateOrderStatus(id_order, status);
            Alert.alert("Berhasil", "Status pesanan diperbarui");
            fetchOrders();
        } catch (err: any) {
            Alert.alert(
                "Gagal",
                err.response?.data?.message || "Gagal update status"
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        refresh: fetchOrders,
        changeStatus
    };
};

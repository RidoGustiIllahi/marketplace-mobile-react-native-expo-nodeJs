import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrdersBySeller, updateOrderStatus } from "../../services/orderService";

type OrderStatus = "all" | "ordered" | "shipped" | "completed" | "cancelled";

export const useSellerOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<OrderStatus>("all");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const id_user = await AsyncStorage.getItem("id_user");
            if (!id_user) return;

            const data = await getOrdersBySeller(Number(id_user));
            setOrders(data);
            applyFilter(data, statusFilter);
        } catch (err) {
            Alert.alert("Error", "Gagal memuat pesanan");
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = (data: any[], filter: OrderStatus) => {
        if (filter === "all") {
            setFilteredOrders(data);
        } else {
            setFilteredOrders(
                data.filter(order => order.status === filter)
            );
        }
    };

    const changeFilter = (filter: OrderStatus) => {
        setStatusFilter(filter);
        applyFilter(orders, filter);
    };

    const shipOrder = async (id_order: number) => {
        try {
            await updateOrderStatus(id_order, "shipped");
            Alert.alert("Berhasil", "Pesanan dikirim");
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
        orders: filteredOrders,
        loading,
        refresh: fetchOrders,
        shipOrder,
        statusFilter,
        changeFilter
    };
};

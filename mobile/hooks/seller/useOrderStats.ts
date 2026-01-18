import { useMemo } from "react";

export const useOrderStats = (orders: any[]) => {
    const stats = useMemo(() => {
        const result = {
            total: orders.length,
            ordered: 0,
            shipped: 0,
            completed: 0,
            cancelled: 0
        };

        orders.forEach(order => {
            if (order.status === "ordered") result.ordered++;
            if (order.status === "shipped") result.shipped++;
            if (order.status === "completed") result.completed++;
            if (order.status === "cancelled") result.cancelled++;
        });

        return result;
    }, [orders]);

    return stats;
};

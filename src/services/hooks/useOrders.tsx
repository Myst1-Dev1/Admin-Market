import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../api";


export interface Order {
    id: number;
    name: string;
    value: number;
    status: string;
    createdAt: string;
}

type OrderInput = Omit<Order, 'id' | 'createdAt'>;

interface OrderProviderProps {
    children: ReactNode;
}

interface OrderContextData {
    orders: Order[];
    createOrder: (order: OrderInput) => Promise<void>;
}

export const OrderContext = createContext<OrderContextData> (
    {} as OrderContextData
);

export function OrdersProvider({children}: OrderProviderProps) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('orders')
        .then(response => setOrders(response.data.orders))
    }, []);

    async function createOrder(orderInput: OrderInput) {
        const response = await api.post('/orders', {
            ...orderInput,
            createdAt: new Date(),
        })

        const {order} = response.data;

        setOrders([
            ...orders,
            order
        ])
    }

    return  <OrderContext.Provider value = {{orders, createOrder}}>
            {children}
            </OrderContext.Provider>
}

export function useOrders() {
    const context = useContext(OrderContext);

    return context;
}
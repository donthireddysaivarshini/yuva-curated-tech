import { useEffect, useState } from "react";
import { orderService } from "@/services/api";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    orderService.getUserOrders().then(setOrders);
  }, []);
  
  return (
    <div className="space-y-4">
      {orders.map((o: any) => (
        <div key={o.id} className="p-4 border rounded-lg">
          <p className="font-bold">Order #{o.id}</p>
          <p>Total: ₹{o.total_amount} | Status: {o.order_status}</p>
        </div>
      ))}
    </div>
  );
}
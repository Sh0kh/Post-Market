import React, { useState } from "react";
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";

export default function OrderEdit({ order, onEdit, onCancel }) {
  const [customer, setCustomer] = useState(order.customer);
  const [phone, setPhone] = useState(order.phone);
  const [product, setProduct] = useState(order.product);
  const [months, setMonths] = useState(order.months);
  const [monthly, setMonthly] = useState(order.monthly);
  const [total, setTotal] = useState(order.total);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({
      ...order,
      customer,
      phone,
      product,
      months: Number(months),
      monthly: Number(monthly),
      total: Number(total),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200">
        <CardBody>
          <Typography variant="h5" className="text-gray-900 font-bold mb-4">
            Buyurtmani tahrirlash
          </Typography>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Ismi"
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              required
            />
            <Input
              label="Telefon"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <Input
              label="Mahsulot"
              value={product}
              onChange={e => setProduct(e.target.value)}
              required
            />
            <Input
              label="Bo'lib to'lash (oy)"
              type="number"
              value={months}
              onChange={e => setMonths(e.target.value)}
              required
            />
            <Input
              label="Oylik to'lov"
              type="number"
              value={monthly}
              onChange={e => setMonthly(e.target.value)}
              required
            />
            <Input
              label="Umumiy narx"
              type="number"
              value={total}
              onChange={e => setTotal(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="text" color="gray" onClick={onCancel}>Bekor qilish</Button>
              <Button type="submit" color="green">Saqlash</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
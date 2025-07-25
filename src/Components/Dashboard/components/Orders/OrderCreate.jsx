

import React, { useState } from "react";
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";

export default function OrderCreate({ onCreate, onCancel }) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("+998");
  const [product, setProduct] = useState("");
  const [months, setMonths] = useState("");
  const [monthly, setMonthly] = useState("");
  const [total, setTotal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || !phone || !product || !months || !monthly || !total) return;
    onCreate({
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
            Yangi Buyurtma
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
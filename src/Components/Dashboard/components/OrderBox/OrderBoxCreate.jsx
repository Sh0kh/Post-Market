import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader, DialogFooter, Button, Input } from "@material-tailwind/react";

export default function OrderBoxCreate({ onCreate, onCancel }) {
  const [owner, setOwner] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [product, setProduct] = useState("");
  const [image, setImage] = useState("");
  const [months, setMonths] = useState("");
  const [monthly, setMonthly] = useState("");
  const [total, setTotal] = useState("");

  // Umumiy to'lovni avtomatik hisoblash
  const handleMonthlyChange = (val) => {
    setMonthly(val);
    if (months && val) setTotal(Number(months) * Number(val));
  };
  const handleMonthsChange = (val) => {
    setMonths(val);
    if (monthly && val) setTotal(Number(monthly) * Number(val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!owner || !orderNumber || !product || !image || !months || !monthly || !total) return;
    onCreate({
      owner,
      orderNumber,
      product,
      image,
      months: Number(months),
      monthly: Number(monthly),
      total: Number(total),
    });
  };

  return (
    <Dialog open={true} handler={onCancel} size="sm">
      <DialogHeader>Yangi buyurtma qo'shish</DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogBody className="flex flex-col gap-4">
          <Input
            label="Buyurtmachi ismi"
            value={owner}
            onChange={e => setOwner(e.target.value)}
            required
          />
          <Input
            label="Buyurtma raqami"
            value={orderNumber}
            onChange={e => setOrderNumber(e.target.value)}
            required
          />
          <Input
            label="Mahsulot nomi"
            value={product}
            onChange={e => setProduct(e.target.value)}
            required
          />
          <Input
            label="Mahsulot rasmi (URL)"
            value={image}
            onChange={e => setImage(e.target.value)}
            required
          />
          <Input
            label="Bo'lib to'lash (oy)"
            type="number"
            min={1}
            value={months}
            onChange={e => handleMonthsChange(e.target.value)}
            required
          />
          <Input
            label="Oylik to'lov (USD)"
            type="number"
            min={1}
            value={monthly}
            onChange={e => handleMonthlyChange(e.target.value)}
            required
          />
          <Input
            label="Umumiy to'lov (USD)"
            type="number"
            min={1}
            value={total}
            onChange={e => setTotal(e.target.value)}
            required
          />
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={onCancel} className="mr-2">
            Bekor qilish
          </Button>
          <Button color="green" type="submit">
            Qo'shish
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
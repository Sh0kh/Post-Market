import React from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

export default function OrderDelete({ order, onDelete, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200">
        <CardBody>
          <Typography variant="h6" className="text-gray-900 font-bold mb-4">
            Buyurtmani o'chirish
          </Typography>
          <Typography className="mb-4 text-gray-800">
            <span className="font-semibold">{order.customer}</span> ({order.product}) buyurtmasini o‘chirishni tasdiqlaysizmi?
          </Typography>
          <div className="flex justify-end gap-2">
            <Button variant="text" color="gray" onClick={onCancel}>
              Bekor qilish
            </Button>
            <Button color="red" onClick={() => onDelete(order.id)}>
              O'chirish
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
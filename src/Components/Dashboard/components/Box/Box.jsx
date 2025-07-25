import React, { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardBody,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const initialProducts = [
  {
    id: 1,
    name: "Сахар",
    purchasePrice: 4000,
    sellingPrice: 4500,
    quantity: "10 кг",
    date: "2025-07-20",
  },
  {
    id: 2,
    name: "Хлеб",
    purchasePrice: 2500,
    sellingPrice: 3000,
    quantity: "20 шт",
    date: "2025-07-21",
  },
  {
    id: 3,
    name: "Картошка",
    purchasePrice: 7000,
    sellingPrice: 8000,
    quantity: "50 кг",
    date: "2025-07-22",
  },
  {
    id: 4,
    name: "Колбаса",
    purchasePrice: 12000,
    sellingPrice: 15000,
    quantity: "15 кг",
    date: "2025-07-23",
  },
];

export default function Box() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-[90px] mb-[20px] ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Typography variant="h3" className="text-gray-900 font-bold">
          Mahsulotlar Jadvali
        </Typography>
        <Button
          color="green"
          className="flex items-center gap-2"
          size="sm"
          onClick={() => alert("Yangi mahsulot qo'sish formasi")}
        >
          <PlusIcon className="w-5 h-5" />
          Yangi Mahsulot
        </Button>
      </div>

      {/* Search */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Qidirish (nomi bo'yicha)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardBody className="overflow-x-auto px-0">
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <th className="p-4">№</th>
                <th className="p-4">Nomi</th>
                <th className="p-4">Narxi (sotib olish)</th>
                <th className="p-4">Narxi (sotish)</th>
                <th className="p-4">Sana</th>
                <th className="p-4">Miqdori</th>
                <th className="p-4">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">{product.purchasePrice.toLocaleString()} so'm</td>
                    <td className="p-4">{product.sellingPrice.toLocaleString()} so'm</td>
                    <td className="p-4">{product.date}</td>
                    <td className="p-4">{product.quantity}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <IconButton
                          variant="text"
                          color="blue"
                          onClick={() => alert(`Tahrirlash: ${product.name}`)}
                        >
                          <PencilIcon className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                          variant="text"
                          color="red"
                          onClick={() =>
                            setProducts((prev) =>
                              prev.filter((p) => p.id !== product.id)
                            )
                          }
                        >
                          <TrashIcon className="w-5 h-5" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-6 text-center text-gray-500 italic"
                  >
                    Mahsulot topilmadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

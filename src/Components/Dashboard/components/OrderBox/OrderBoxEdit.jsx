import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";

export default function OrderBoxEdit({ product, onEdit, onCancel }) {
  const [owner, setOwner] = useState(product.owner || "");
  const [orderNumber, setOrderNumber] = useState(product.orderNumber || "");
  const [productName, setProductName] = useState(product.product || product.name || "");
  const [image, setImage] = useState(product.image || "");
  const [months, setMonths] = useState(product.months || "");
  const [monthly, setMonthly] = useState(product.monthly || "");
  const [total, setTotal] = useState(product.total || (product.months && product.monthly ? product.months * product.monthly : ""));
  const [preview, setPreview] = useState(product.image || "");
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);

  // Modal tashqarisiga bosilganda yoki ESC bosilganda silliq yopiladi
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setClosing(true);
      }
    };
    const handleEsc = (event) => {
      if (event.key === "Escape") setClosing(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Animatsiya tugaganda haqiqiy yopish
  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onCancel();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [closing, onCancel]);

  // Umumiy to'lovni avtomatik hisoblash
  const handleMonthlyChange = (val) => {
    setMonthly(val);
    if (months && val) setTotal(Number(months) * Number(val));
  };
  const handleMonthsChange = (val) => {
    setMonths(val);
    if (monthly && val) setTotal(Number(monthly) * Number(val));
  };

  // Rasm file tanlash
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!owner || !orderNumber || !productName || !image || !months || !monthly || !total) return;
    onEdit({
      ...product,
      owner,
      orderNumber,
      product: productName,
      image,
      months: Number(months),
      monthly: Number(monthly),
      total: Number(total),
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 ${
        closing ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md ${closing ? "animate-modal-out" : "animate-modal-in"}`}
      >
        <Card className="bg-white rounded-2xl shadow-2xl border border-gray-200">
          <CardBody>
            <Typography variant="h5" className="text-gray-900 font-bold mb-4">
              Buyurtmani tahrirlash
            </Typography>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                value={productName}
                onChange={e => setProductName(e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mahsulot rasmi</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
                />
                {preview && (
                  <img src={preview} alt="Mahsulot rasmi" className="mt-2 w-24 h-24 object-contain rounded-lg border" />
                )}
              </div>
              <Input
                label="Bo'lib to'lash (oy)"
                type="number"
                value={months}
                onChange={e => handleMonthsChange(e.target.value)}
                required
              />
              <Input
                label="Oylik to'lov (USD)"
                type="number"
                value={monthly}
                onChange={e => handleMonthlyChange(e.target.value)}
                required
              />
              <Input
                label="Umumiy to'lov (USD)"
                type="number"
                value={total}
                onChange={e => setTotal(e.target.value)}
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="text"
                  color="gray"
                  type="button"
                  onClick={() => setClosing(true)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" color="green">
                  Saqlash
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      {/* Animatsiya uchun style */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeInBg 0.3s ease;
        }
        .animate-fade-out {
          animation: fadeOutBg 0.25s ease forwards;
        }
        @keyframes fadeInBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOutBg {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-modal-in {
          animation: modalIn 0.3s cubic-bezier(.4,0,.2,1) forwards;
        }
        .animate-modal-out {
          animation: modalOut 0.25s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        @keyframes modalOut {
          from { opacity: 1; transform: scale(1);}
          to { opacity: 0; transform: scale(0.95);}
        }
        `}
      </style>
    </div>
  );
}
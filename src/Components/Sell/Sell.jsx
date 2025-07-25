import React, { useState } from "react";
import {
    Card, CardBody, Typography, Input, Button, IconButton,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

const mahsulotlarData = [
    { id: 1, nom: "Olma", narx: 10000, tur: "kg" },
    { id: 2, nom: "Sut", narx: 12000, tur: "dona" },
    { id: 3, nom: "Kartoshka", narx: 8000, tur: "kg" },
    { id: 4, nom: "Non", narx: 6000, tur: "dona" },
    { id: 5, nom: "Banan", narx: 15000, tur: "kg" },
    { id: 6, nom: "Piyoz", narx: 7000, tur: "kg" },
    { id: 7, nom: "Go‘sht", narx: 85000, tur: "kg" },
    { id: 8, nom: "Yog‘", narx: 25000, tur: "dona" },
    { id: 9, nom: "Guruch", narx: 13000, tur: "kg" },
    { id: 10, nom: "Tuxum", narx: 1500, tur: "dona" },
    { id: 11, nom: "Sabzi", narx: 6000, tur: "kg" },
    { id: 12, nom: "Tuz", narx: 4000, tur: "dona" },
];

export default function Sell() {
    const [savat, setSavat] = useState([]);
    const [search, setSearch] = useState("");

    const filtered = mahsulotlarData.filter(el =>
        el.nom.toLowerCase().includes(search.toLowerCase())
    );

    const qoshinga = (mahsulot) => {
        if (!savat.find((el) => el.id === mahsulot.id)) {
            setSavat([...savat, { ...mahsulot, miqdor: 1 }]);
        }
    };

    const ozgartirMiqdor = (id, value) => {
        // Преобразуем в число и проверяем, что оно не меньше 1
        const newValue = Math.max(1, parseInt(value) || 1);
        setSavat(savat.map(el => el.id === id ? { ...el, miqdor: newValue } : el));
    };

    const ochirish = (id) => {
        setSavat(savat.filter(el => el.id !== id));
    };

    const jami = savat.reduce((sum, el) => sum + el.narx * el.miqdor, 0);

    return (
        <div className="flex h-screen pt-[100px] gap-2">
            <div className="w-2/3 flex flex-col">
                {/* Qidiruv */}
                <div className="mb-2">
                    <Input
                        label="Mahsulotni qidiring..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-sm"
                    />
                </div>

                {/* Cardlar */}
                <div className="grid grid-cols-3 gap-2 overflow-y-auto py-[20px]">
                    {filtered.map((el) => (
                        <Card
                            key={el.id}
                            className="cursor-pointer hover:shadow-md transition border h-[80px]"
                            onClick={() => qoshinga(el)}
                        >
                            <CardBody className="p-2 flex flex-col justify-center">
                                <Typography className="font-semibold text-sm">{el.nom}</Typography>
                                <Typography className="text-xs text-gray-600">{el.narx.toLocaleString()} so‘m</Typography>
                                <Typography className="text-[11px] text-blue-500">Tur: {el.tur}</Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Savat */}
            <div className="w-1/3 bg-white rounded-xl shadow p-3 flex flex-col justify-between">
                <div className="overflow-y-auto max-h-[75vh]">
                    <Typography variant="h6" className="mb-2">Savat</Typography>
                    {savat.length === 0 ? (
                        <Typography className="text-sm text-gray-500">Savat bo'sh</Typography>
                    ) : (
                        savat.map((el) => (
                            <div key={el.id} className="flex items-center justify-between mb-2 border-b pb-1">
                                <div className="flex-1">
                                    <Typography className="text-sm font-medium">{el.nom}</Typography>
                                    <Typography className="text-xs text-gray-500">
                                        {el.narx.toLocaleString()} / {el.tur}
                                    </Typography>
                                </div>
                                <div className="w-[]">
                                    <Input
                                        type="number"
                                        size="sm"
                                        min="1"
                                        className="text-center"
                                        value={el.miqdor}
                                        onChange={(e) => ozgartirMiqdor(el.id, e.target.value)}
                                        onBlur={(e) => {
                                            if (!e.target.value || parseInt(e.target.value) < 1) {
                                                ozgartirMiqdor(el.id, 1);
                                            }
                                        }}
                                        containerProps={{ className: "min-w-0" }}
                                    />
                                </div>
                                <IconButton
                                    size="sm"
                                    variant="text"
                                    color="red"
                                    onClick={() => ochirish(el.id)}
                                    className="ml-1"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </IconButton>
                            </div>
                        ))
                    )}
                </div>

                {/* Jami */}
                {savat.length > 0 && (
                    <div className="pt-3 border-t mt-2">
                        <Typography className="text-base font-semibold">
                            Jami: {jami.toLocaleString()} so‘m
                        </Typography>
                        <Button color="green" size="sm" className="w-full mt-2">Sotish</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
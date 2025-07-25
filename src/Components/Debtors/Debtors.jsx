import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";

// 🔹 Yangi qarzdorlar ro'yxati
const debtorsData = [
    {
        id: 1,
        name: "Azamat Aliyev",
        phone: "+998901234567",
        product: "Coca-Cola 2L",
        amountUZS: 20000,
        date: "2025-07-01",
        month: "07",
    },
    {
        id: 2,
        name: "Madina Karimova",
        phone: "+998933456789",
        product: "Pepsi 1.5L",
        amountUZS: 17000,
        date: "2025-07-03",
        month: "07",
    },
    {
        id: 3,
        name: "Shavkat Tursunov",
        phone: "+998935554433",
        product: "Fanta 1L",
        amountUZS: 12000,
        date: "2025-06-20",
        month: "06",
    },
    {
        id: 4,
        name: "Dilnoza Usmonova",
        phone: "+998939998877",
        product: "Coca-Cola 2L",
        amountUZS: 20000,
        date: "2025-06-18",
        month: "06",
    },
    {
        id: 5,
        name: "Rustam Omonov",
        phone: "+998902224455",
        product: "Sprite 2L",
        amountUZS: 18500,
        date: "2025-07-04",
        month: "07",
    },
    {
        id: 6,
        name: "Olim Akbarov",
        phone: "+998903334455",
        product: "Cola Zero 1.5L",
        amountUZS: 19000,
        date: "2025-07-05",
        month: "07",
    },
    {
        id: 7,
        name: "Nodira Hamidova",
        phone: "+998934449988",
        product: "Pepsi 2L",
        amountUZS: 21000,
        date: "2025-06-15",
        month: "06",
    },
];

const monthOptions = [
    { label: "Yanvar", value: "01" },
    { label: "Fevral", value: "02" },
    { label: "Mart", value: "03" },
    { label: "Aprel", value: "04" },
    { label: "May", value: "05" },
    { label: "Iyun", value: "06" },
    { label: "Iyul", value: "07" },
    { label: "Avgust", value: "08" },
    { label: "Sentyabr", value: "09" },
    { label: "Oktyabr", value: "10" },
    { label: "Noyabr", value: "11" },
    { label: "Dekabr", value: "12" },
];

export default function Debtors() {
    const [search, setSearch] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("07");

    const filteredDebtors = useMemo(() => {
        return debtorsData.filter(
            (debtor) =>
                debtor.month === selectedMonth &&
                (debtor.name.toLowerCase().includes(search.toLowerCase()) ||
                    debtor.phone.includes(search))
        );
    }, [selectedMonth, search]);

    const totalAmount = filteredDebtors.reduce(
        (sum, d) => sum + d.amountUZS,
        0
    );

    return (
        <div className="mt-[90px] px-4 pb-10">
            <Typography variant="h3" className="mb-6 font-bold text-gray-800">
                Qarzdor mijozlar
            </Typography>

            <Card className="bg-gradient-to-r from-red-100 to-red-50 border border-red-300 mb-8 shadow-lg">
                <CardBody>
                    <Typography variant="h6" className="text-red-900 font-semibold">
                        Umumiy qarz – {monthOptions.find((m) => m.value === selectedMonth)?.label}:
                    </Typography>
                    <Typography variant="h3" className="text-red-700 font-bold mt-2">
                        {totalAmount.toLocaleString()} so'm
                    </Typography>
                </CardBody>
            </Card>

            {/* Filterlar */}
            <Card className="mb-8 shadow-md">
                <CardBody className="flex flex-col md:flex-row gap-4">
                    <Select
                        label="Oy bo'yicha tanlang"
                        value={selectedMonth}
                        onChange={(val) => setSelectedMonth(val)}
                    >
                        {monthOptions.map((m) => (
                            <Option key={m.value} value={m.value}>
                                {m.label}
                            </Option>
                        ))}
                    </Select>
                    <Input
                        label="Qidiruv (Ism yoki Telefon)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        crossOrigin={undefined}
                    />
                </CardBody>
            </Card>

            {/* Jadval */}
            <Card className="mb-8 shadow-md">
                <CardBody className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="overflow-x-auto rounded-xl w-full ">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium">#</th>
                                    <th className="px-4 py-3 text-left font-medium">F.I.O</th>
                                    <th className="px-4 py-3 text-left font-medium">Telefon</th>
                                    <th className="px-4 py-3 text-left font-medium">Tovar</th>
                                    <th className="px-4 py-3 text-left font-medium">Sana</th>
                                    <th className="px-4 py-3 text-left font-medium">Qarz (so'm)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDebtors.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6 text-gray-500">
                                            Ma'lumot topilmadi
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDebtors.map((debtor, index) => (
                                        <tr
                                            key={debtor.id}
                                            className="hover:bg-gray-100 border-t border-gray-100 transition"
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{debtor.name}</td>
                                            <td className="px-4 py-3">{debtor.phone}</td>
                                            <td className="px-4 py-3">{debtor.product}</td>
                                            <td className="px-4 py-3">
                                                {new Date(debtor.date).toLocaleDateString("uz-UZ")}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-red-600">
                                                {debtor.amountUZS.toLocaleString()} so'm
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

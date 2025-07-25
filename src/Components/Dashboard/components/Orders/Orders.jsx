import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("uz-UZ");
}

const generateClients = () => {
  const clients = [];
  for (let i = 1; i <= 30; i++) {
    clients.push({
      id: i,
      fullName: `Client ${i}`,
      phone: `+998 90 000 ${String(i).padStart(2, "0")}`,
      birthDate: `199${i % 10}-0${(i % 9) + 1}-15`,
      registerDate: new Date(2024, 4, i).toISOString().slice(0, 10),
    });
  }
  return clients;
};

export default function ClientOrders() {
  const [clients] = useState(generateClients());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 20;

  const filteredClients = clients.filter(
    (client) =>
      client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const lastIndex = currentPage * clientsPerPage;
  const firstIndex = lastIndex - clientsPerPage;
  const currentClients = filteredClients.slice(firstIndex, lastIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mt-[90px] pb-[20px]">
      <Card className="bg-white rounded-2xl shadow-xl">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="text-gray-900 font-bold">
              Mijozlar ro'yxati
            </Typography>
            <Button
              color="green"
              className="flex items-center gap-2"
              size="sm"
              onClick={() => alert("Add modal here")}
            >
              <PlusIcon className="w-5 h-5" />
              Yangi mijoz
            </Button>
          </div>

          {/* Поиск */}
          <div className="mb-4">
            <Input
              label="Qidirish (Ism yoki telefon)"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Сброс на первую страницу при поиске
              }}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">F.I.O</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Telefon</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Tug'ilgan sana</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Ro'yxatga olingan</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-700">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {currentClients.map((client, idx) => (
                  <tr key={client.id} className="hover:bg-gray-100 transition">
                    <td className="px-4 py-2 text-gray-900">{firstIndex + idx + 1}</td>
                    <td className="px-4 py-2 text-gray-900">
                      <NavLink to={`/client/profil`} className={`text-blue-500`}>
                        {client.fullName}
                      </NavLink>
                    </td>
                    <td className="px-4 py-2 text-gray-900">{client.phone}</td>
                    <td className="px-4 py-2 text-gray-900">{formatDate(client.birthDate)}</td>
                    <td className="px-4 py-2 text-gray-900">{formatDate(client.registerDate)}</td>
                    <td className="px-4 py-2 flex gap-1">
                      <IconButton variant="text" color="blue" size="sm">
                        <PencilIcon className="w-5 h-5" />
                      </IconButton>
                      <IconButton variant="text" color="red" size="sm">
                        <TrashIcon className="w-5 h-5" />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <Typography variant="small" className="text-gray-600">
              Sahifa {currentPage} / {totalPages || 1}
            </Typography>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outlined"
                disabled={currentPage === 1}
                onClick={handlePrev}
                className="flex items-center gap-1"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Oldingi
              </Button>
              <Button
                size="sm"
                variant="outlined"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={handleNext}
                className="flex items-center gap-1"
              >
                Keyingi
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

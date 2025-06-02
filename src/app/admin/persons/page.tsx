"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

const people = [
  {
    id: 1,
    firstName: "Алцай",
    lastName: "Антонио",
    gender: "Эр",
    birthDate: "1970-06-15",
    generation: "3-р үе",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    firstName: "Маркус",
    lastName: "Финн",
    gender: "Эр",
    birthDate: "1985-09-10",
    generation: "2-р үе",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  },
  {
    id: 3,
    firstName: "Жие",
    lastName: "Ян",
    gender: "Эм",
    birthDate: "1992-12-05",
    generation: "1-р үе",
    image: "https://randomuser.me/api/portraits/women/15.jpg"
  },
  {
    id: 4,
    firstName: "Насимию",
    lastName: "Данай",
    gender: "Эм",
    birthDate: "1980-03-22",
    generation: "2-р үе",
    image: "https://randomuser.me/api/portraits/women/50.jpg"
  },
];

export default function AdminPersonsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Users size={24} /> Хүмүүсийн жагсаалт
        </h2>
        <Link href="/admin/persons/add">
          <Button className="bg-pink-700 hover:bg-pink-900 px-16 py-6 text-white text-36">
            + Нэмэх
          </Button>
        </Link>
      </div>

      <Input
        placeholder="Хүмүүсийг нэрээр нь хайх"
        className="max-w-md border-gray-300 py-8"
      />

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-8 text-left">#</th>
              <th className="p-8 text-left">Овог</th>
              <th className="p-8 text-left">Нэр</th>
              <th className="p-8 text-left">Хүйс</th>
              <th className="p-8 text-left">Төрсөн өдөр</th>
              <th className="p-8 text-left">Үе</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, i) => (
              <tr
                key={p.id}
                onClick={() => router.push(`/admin/persons/${p.id}`)}
                className="border-t border-gray-300 hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-8">{i + 1}</td>
                <td className="p-8">{p.lastName}</td>
                <td className="p-8 flex items-center gap-2">
                  <img src={p.image} alt={p.firstName} className="w-8 h-8 rounded-full" />
                  {p.firstName}
                </td>
                <td className="p-8">{p.gender}</td>
                <td className="p-8">{p.birthDate}</td>
                <td className="p-8">{p.generation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

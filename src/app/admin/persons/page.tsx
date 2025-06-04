"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthDate?: string;
  generation?: number;
};

export default function AdminPersonsPage() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetch("/api/persons")
      .then((res) => res.json())
      .then((data) => setPeople(data))
      .catch(() => setPeople([]));
  }, []);

  const deletePerson = async (id: string) => {
  if (!confirm("Та энэ хүний мэдээллийг устгах уу?")) return;

  try {
    // Хүний медиа болон аудиог урьдчилан татаж авах
    const resPerson = await fetch(`/api/persons/${id}`);
    const person = await resPerson.json();

      const resMedia = await fetch(`/api/uploaded?personId=${id}`);
  const mediaData = await resMedia.json();

  const mediaUrls = mediaData.urls;
  const audioUrl = mediaData.audioUrl;

    // DELETE хүсэлт явуулах
    const res = await fetch(`/api/persons/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mediaUrls, audioUrl }),
    });

    if (res.ok) {
      toast.success("Амжилттай устгалаа");
      setPeople((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error("Устгах үед алдаа гарлаа");
    }
  } catch (err) {
    toast.error("Устгах үед алдаа гарлаа");
    console.error("Delete error:", err);
  }
};

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
              <th className="p-8 text-left">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, i) => (
              <tr
                key={p.id}
                className="border-t border-gray-300 hover:bg-gray-100"
              >
                <td className="p-8">{i + 1}</td>
                <td className="p-8">{p.lastName}</td>
                <td className="p-8">{p.firstName}</td>
                <td className="p-8">{p.gender}</td>
                <td className="p-8">{p.birthDate?.substring(0, 10)}</td>
                <td className="p-8">{p.generation ? `${p.generation}-р үе` : ""}</td>
                <td className="p-8 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/persons/${p.id}`)}
                  >
                    <Pencil size={16} className="mr-1" /> Засах
                  </Button>
                  <Button
                  className="bg-red-600"
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePerson(p.id)}
                  >
                    <Trash2 size={16} className="mr-1 " /> Устгах
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// src/app/admin/persons/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function EditPersonPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    orderInFamily: "",
    familyPosition: "",
    birthDate: "",
    deathDate: "",
    audioUrl: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/persons/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setForm({
          lastName: data.lastName || "",
          firstName: data.firstName || "",
          gender: data.gender || "",
          orderInFamily: data.orderInFamily?.toString() || "",
          familyPosition: data.generation?.toString() || "",
          birthDate: data.birthDate ? data.birthDate.substring(0, 10) : "",
          deathDate: data.deathDate ? data.deathDate.substring(0, 10) : "",
          audioUrl: data.audioUrl || "",
          description: data.description || "",
        });
      })
      .catch((err) => console.error("Error loading person:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/persons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(`/admin/media/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-pink-700">
          Мэдээлэл засах
        </h2>
        <Link href={`/admin/media/${id}`}>
          <Button className="bg-pink-700 hover:bg-pink-900 px-10 py-6 text-white text-lg">
            Зураг, бичлэг бусад файлууд
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow border border-gray-200">
        <div>
          <Label htmlFor="id" className="text-lg py-2 block">ID</Label>
          <Input
            name="id"
            value={id as string}
            disabled
            className="py-8 border-gray-300 bg-gray-100 text-gray-600"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-lg py-2 block">Овог</Label>
          <Input name="lastName" value={form.lastName} onChange={handleChange} className="py-8 border-gray-300" />
        </div>
        <div>
          <Label htmlFor="firstName" className="text-lg py-2 block">Нэр</Label>
          <Input name="firstName" value={form.firstName} onChange={handleChange} className="py-8 border-gray-300" />
        </div>

        <div>
          <Label htmlFor="gender" className="text-lg py-2 block">Хүйс</Label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded py-5 px-4 text-sm"
          >
            <option value="">Хүйсээ сонгоно уу.</option>
            <option value="Эрэгтэй">Эрэгтэй</option>
            <option value="Эмэгтэй">Эмэгтэй</option>
          </select>
        </div>
        <div>
          <Label htmlFor="orderInFamily" className="text-lg py-2 block">Айлын хэддэх хүүхэд вэ?</Label>
          <Input name="orderInFamily" value={form.orderInFamily} onChange={handleChange} className="py-8 border-gray-300" />
        </div>

        <div>
          <Label htmlFor="familyPosition" className="text-lg py-2 block">Хэддэх үе вэ?</Label>
          <Input name="familyPosition" value={form.familyPosition} onChange={handleChange} className="py-8 border-gray-300" />
        </div>
        <div>
          <Label htmlFor="birthDate" className="text-lg py-2 block">Төрсөн өдөр</Label>
          <Input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className="py-8 border-gray-300" />
        </div>

        <div>
          <Label htmlFor="deathDate" className="text-lg py-2 block">Death date</Label>
          <Input type="date" name="deathDate" value={form.deathDate} onChange={handleChange} className="py-8 border-gray-300" />
        </div>
   

        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-lg py-2 block">
            Намтар гавьяа шагнал зэрэг мэдээллүүдээ бичиж оруулна уу.
          </Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Element Placeholder"
            rows={5}
            className="border-gray-300"
          />
        </div>
        <Button type="submit" className="md:col-span-2 bg-pink-700 hover:bg-pink-900 px-10 py-8 text-white text-lg">
          Хадгалах
        </Button>
      </form>
    </div>
  );
}

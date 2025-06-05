// src/app/admin/persons/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import toast from "react-hot-toast"; 


export default function EditPersonPage() {
  const router = useRouter();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false); // 👈 нэмсэн хэсэг
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
    parentOrder:"",
    parentId: "",
  });

  const [availableParents, setAvailableParents] = useState<any[]>([]);

useEffect(() => {
  console.log("gen: ", form.familyPosition)
  if (form.familyPosition) {
    const prevGen = Number(form.familyPosition) - 1;
    fetch(`/api/persons?generation=${prevGen}`)
      .then((res) => res.json())
      .then((data) => setAvailableParents(data));


  } else {
    setAvailableParents([]);
  }
  console.log("available datas: ", availableParents)
  console.log("form.parentId : ",form.parentId )
}, [form.familyPosition]);


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
          parentOrder: data.parentOrder?.toString() || "",
          parentId: data.parentRelations?.[0]?.parentId || "",
        });

        fetch(`/api/person-relations/by-child/${id}`)
        .then((res) => res.json())
        .then((relation) => {
          if (relation?.parentId) {
            setForm((prev) => ({ ...prev, parentId: relation.parentId }));
          }
        });
      })
      .catch((err) => console.error("Error loading person:", err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true); // 👈 хадгалахад орж байна

    const res = await fetch(`/api/persons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

     if (form.parentId) {
    await fetch("/api/person-relations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentId: form.parentId, childId: id }),
    });
  }
 
    setIsSaving(false); // 👈 хадгалах дууссан
     if (res.ok) {
    toast.success("Амжилттай хадгалагдлаа ✅");
  } else {
    toast.error("Хадгалах үед алдаа гарлаа ❌");
  }
  };

  // parentId өөрчлөгдөхөд parentOrder-г автоматаар тохируулах
useEffect(() => {
  if (form.parentId && availableParents.length > 0) {
    const selectedParent = availableParents.find((p) => p.id === form.parentId);
    if (selectedParent?.orderInFamily) {
      setForm((prev) => ({
        ...prev,
        parentOrder: selectedParent.orderInFamily.toString(),
      }));
    }
  }
}, [form.parentId, availableParents]);

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

        <div >
          <Label htmlFor="parentId" className="text-lg py-2 block">Аав/Ээж сонгох</Label>
          <select
            name="parentId"
            value={form.parentId || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded py-5 px-4 text-sm"
          >
            <option value="">Сонгоно уу...</option>
            {availableParents
              .filter((p) => p.id !== id) // өөрийгөө сонгохоос сэргийл
              .map((person) => (
                <option key={person.id} value={person.id}>
                  {person.lastName} {person.firstName}
                </option>
              ))}
          </select>
        </div>
        
 <div>
          <Label htmlFor="parentOrder" className="text-lg py-2 block">
            Таны аав/ээж хэд дэх хүүхэд вэ?
          </Label>
          <Input
            name="parentOrder"
            value={form.parentOrder}
            readOnly
            className="py-8 border-gray-300 bg-gray-100"
          />
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
        <Button
          type="submit"
          className="md:col-span-2 bg-pink-700 hover:bg-pink-900 px-10 py-8 text-white text-lg"
          disabled={isSaving}
        >
          {isSaving ? "Хадгалж байна..." : "Хадгалах"}
        </Button>

      </form>
    </div>
  );
}

// app/admin/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Ургийн ном - Админ хяналтын самбар</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Хүмүүс</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Ургийн модны хүмүүсийн мэдээллийг харах, нэмэх, засах, устгах боломж.
            </p>
            <Link href="/admin/persons">
              <Button variant="default">Харах</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Зураг/Видео</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Хүмүүст холбогдсон зураг, бичлэгийг нэмж удирдах.
            </p>
            <Link href="/admin/media">
              <Button variant="default">Харах</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Нэмэлт хандалт</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Системд нэвтэрсэн хүмүүс, өөрчлөлтийн түүх (audit log) гэх мэт нэмэлт хяналт.
            </p>
            <Button disabled>Тун удахгүй</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

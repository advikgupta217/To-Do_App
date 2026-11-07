import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const { id } = await params;
  const body = await request.json();

  const data: { title?: string; completed?: boolean } = {};
  if (typeof body.completed === "boolean") data.completed = body.completed;
  if (typeof body.title === "string" && body.title.trim()) {
    data.title = body.title.trim();
  }

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data,
    });
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id } = await params;

  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
}
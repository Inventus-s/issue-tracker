import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { newIssueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session  = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401})
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json("Provide title and description", { status: 400 });
  }

  const validation = newIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(newIssue, { status: 201 });
}

import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const markdownFilePath = path.join(process.cwd(), "content", "politicas.md");

  try {
    const data = await fs.promises.readFile(markdownFilePath, "utf8");
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

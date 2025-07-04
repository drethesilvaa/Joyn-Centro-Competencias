import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { CentrosDeCompetenciaData } from "@/types/mentores";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "content", "mentores.json");

    if (!fs.existsSync(filePath)) {
      console.error("File does not exist:", filePath);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: CentrosDeCompetenciaData = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading homepage data:", error);
    return NextResponse.json(
      { error: "Failed to load homepage data" },
      { status: 500 }
    );
  }
}

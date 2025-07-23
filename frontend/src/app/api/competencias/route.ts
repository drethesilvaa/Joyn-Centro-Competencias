import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { CompetenciasData } from '@/types/competencias';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "content", "centros.json");

    if (!fs.existsSync(filePath)) {
      console.error("File does not exist:", filePath);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: CompetenciasData = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading homepage data:", error);
    return NextResponse.json(
      { error: "Failed to load homepage data" },
      { status: 500 }
    );
  }
}
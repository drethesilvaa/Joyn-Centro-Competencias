import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article } from "@/types/articles";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Invalid article slug" },
        { status: 400 }
      );
    }

    if (slug.includes("..") || slug.includes("/")) {
      return NextResponse.json(
        { error: "Invalid slug format" },
        { status: 400 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "content",
      "artigos",
      `${slug}.md`
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter } = matter(fileContent);

    // Calculate read time
    const content = frontmatter.content || "";
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 250);

    const article: Article = {
      title: frontmatter.title || slug,
      subTitle: frontmatter.subTitle || "",
      author: frontmatter.author || "",
      authorRole: frontmatter.authorRole || "",
      authorPic: frontmatter.authorPic || "",
      articleImage: frontmatter.articleImage || "",
      slug,
      readTime,
      content,
    };

    return NextResponse.json(article);
  } catch (error) {
    console.error(`Error fetching article ${params.slug}:`, error);
    return NextResponse.json(
      { error: "Failed to load article" },
      { status: 500 }
    );
  }
}

// src/app/api/articles/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticlesListResponse, ArticleListItem } from "@/types/articles";

export async function GET(request: NextRequest) {
  try {
    const artigosPath = path.join(process.cwd(), "content", "artigos");

    if (!fs.existsSync(artigosPath)) {
      return NextResponse.json(
        { error: "Articles directory not found" },
        { status: 404 }
      );
    }

    const files = fs
      .readdirSync(artigosPath)
      .filter((file) => file.endsWith(".md"));

    const articles: ArticleListItem[] = [];

    for (const file of files) {
      try {
        const filePath = path.join(artigosPath, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data: frontmatter } = matter(fileContent);

        const slug = file.replace(/\.md$/, "");

        // Create excerpt from content (first 200 characters, cleaned)
        const content = frontmatter.content || "";
        const excerpt =
          content
            .replace(/#{1,6}\s+/g, "")
            .replace(/\*\*(.+?)\*\*/g, "$1")
            .replace(/\*(.+?)\*/g, "$1")
            .replace(/\[(.+?)\]\(.+?\)/g, "$1")
            .replace(/<br\s*\/?>/g, " ")
            .slice(0, 200)
            .trim() + (content.length > 200 ? "..." : "");

        // Calculate read time
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 250);

        const article: ArticleListItem = {
          title: frontmatter.title || slug,
          subTitle: frontmatter.subTitle || "",
          author: frontmatter.author || "",
          authorRole: frontmatter.authorRole || "",
          authorPic: frontmatter.authorPic || "",
          articleImage: frontmatter.articleImage || "",
          slug,
          readTime,
          excerpt,
        };

        articles.push(article);
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    }

    // Sort alphabetically by title
    articles.sort((a, b) => a.title.localeCompare(b.title));

    const response: ArticlesListResponse = {
      articles,
      total: articles.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to load articles" },
      { status: 500 }
    );
  }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Article } from "@prisma/client";
import axios from "axios";
import cheerio from "cheerio";

const parse = async (url: string): Promise<Article> => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const article = {
    id: parseInt($("article").attr("data-article-id")!),
    url,
    published_at: new Date($("article time").attr("datetime")!),

    title: $("meta[property='og:title']").attr("content")!,
    description: $("meta[property='og:description']").attr("content")!,
    keywords: $("meta[name='keywords']")
      .attr("content")!
      .split(", ")
      .filter(
        (k) =>
          k !== "software" &&
          k !== "coding" &&
          k !== "development" &&
          k !== "engineering" &&
          k !== "inclusive" &&
          k !== "community"
      ),
    image: $("meta[property='og:image']").attr("content")!,

    author_username: $("article").attr("data-author-username")!,
    author_name: $("article").attr("data-author-name")!,
    author_avatar: $("article .radius-full.align-middle").attr("src")!
  };

  return article;
};

export default parse;

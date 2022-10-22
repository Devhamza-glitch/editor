// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  console.log("slug",req.body)
  const files = fs.readdirSync(path.join(req?.body));
  console.log("=======files=",files);
  const contentFile = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("folder", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    res.send(markdownWithMeta);
  });
};

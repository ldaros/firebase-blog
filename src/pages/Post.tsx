import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { getPost } from "@/lib/posts";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { formatDate } from "@/lib/utils";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// Configure Marked with highlight.js
const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id as string).then((post) => setPost(post));
  }, [id]);

  if (!post)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-4">{formatDate(post.date)}</p>
      <div
        className="prose prose-invert space-y-6"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </Layout>
  );
};

export { PostPage };

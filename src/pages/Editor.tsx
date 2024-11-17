import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostData, addPost, getPost, updatePost } from "@/lib/posts";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { v4 as uuidv4 } from "uuid";

const PostEditor = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    if (!post) {
      getPost(id as string).then((post) => {
        setPost(post);
        setTitle(post.title);
        setContent(post.content);
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!post) {
      addPost({
        id: uuidv4(),
        title: title,
        content: content,
        date: new Date().toISOString(),
      });

      return;
    }

    updatePost(id as string, {
      id: id as string,
      title: title,
      content: content,
      date: new Date().toISOString(),
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{post ? "Edit Post" : "Create New Post"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea rows={30} id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <Button type="submit">{post ? "Update Post" : "Create Post"}</Button>
      </form>
    </Layout>
  );
};

export { PostEditor };

import { Layout } from "@/components/Layout";
import { Loading } from "@/components/Loading";
import { Post } from "@/components/Post";
import { listPosts } from "@/lib/posts";
import { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const posts = await listPosts();
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (posts.length === 0)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} title={post.title} date={post.date} />
      ))}
    </Layout>
  );
};

export { Home };

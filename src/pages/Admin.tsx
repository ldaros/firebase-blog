import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { deletePost, listPosts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Loading } from "@/components/Loading";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await listPosts();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  if (posts.length === 0)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{formatDate(post.date)}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/editor/${post.id}`)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="outline"
        className="mt-4"
        size="sm"
        onClick={() => navigate("/admin/editor")}
      >
        New Post
      </Button>
    </Layout>
  );
};

export { Admin };

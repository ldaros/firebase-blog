import { firestore } from "./firebase";
import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, updateDoc } from "firebase/firestore";

export type PostData = {
  id: string;
  title: string;
  content: string;
  date: string;
};

async function addPost(post: PostData): Promise<void> {
  const postRef = doc(firestore, "posts", post.id);

  await setDoc(postRef, {
    id: post.id,
    title: post.title,
    content: post.content,
    date: post.date,
  });
}

async function getPost(id: string): Promise<PostData | null> {
  const postRef = doc(firestore, "posts", id);
  const postDoc = await getDoc(postRef);

  if (!postDoc.exists()) {
    return null;
  }

  return postDoc.data() as PostData;
}

async function listPosts(): Promise<PostData[]> {
  const postsRef = collection(firestore, "posts");
  const querySnapshot = await getDocs(postsRef);

  const posts: PostData[] = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data() as PostData);
  });

  return posts;
}

async function deletePost(id: string): Promise<void> {
  const postRef = doc(firestore, "posts", id);
  await deleteDoc(postRef);
}

async function updatePost(id: string, post: PostData): Promise<void> {
  const postRef = doc(firestore, "posts", id);
  await updateDoc(postRef, post);
}

export { addPost, getPost, listPosts, deletePost, updatePost };

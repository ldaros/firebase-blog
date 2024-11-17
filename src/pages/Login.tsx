import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { auth, githubProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addUserToFirestore } from "@/lib/user";

const Login = () => {
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await addUserToFirestore(result.user);
      navigate("/");
    } catch (error) {
      console.error("GitHub Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => handleGitHubLogin()}>
            <Github className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
};

export { Login };

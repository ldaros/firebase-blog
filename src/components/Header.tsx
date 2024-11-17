import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Github, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth } from "@/lib/firebase";
import { useTheme } from "@/contexts/theme-provider";

const UserDropdown = ({ user }) => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return parts.map((part) => part[0]).join("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, userData } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 max-w-3xl py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Blog</h1>

          <div className="flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-2">
                <li>
                  <Button variant="ghost" asChild>
                    <Link to="/">Home</Link>
                  </Button>
                </li>

                {userData?.role === "admin" && (
                  <li>
                    <Button variant="ghost" asChild>
                      <Link to="/admin">Admin</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {!user ? (
              <Button onClick={handleLogin} variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                Log in with GitHub
              </Button>
            ) : (
              <UserDropdown user={user} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { PostPage } from "./pages/Post";
import { PostEditor } from "./pages/Editor";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/:id" element={<PostPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editor/:id?"
              element={
                <ProtectedRoute requiredRole="admin">
                  <PostEditor />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

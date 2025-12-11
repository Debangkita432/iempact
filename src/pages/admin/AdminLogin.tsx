import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL_BACKENDURL}/admin/signin`,
        { email, password }
      );

      if (response.data.success) {
        localStorage.setItem("admin_token", response.data.token);
        toast.success("Admin login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Admin Login Error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | IMPACT 2026</title>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-card/30 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h1 className="font-bebas text-3xl">Admin Portal</h1>
              <p className="font-poppins text-foreground/60 text-sm">
                Restricted Access Only
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 pl-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@iempact.com"
                  required
                  className="bg-input border-border/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 pl-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-input border-border/50"
                />
              </div>
              <Button
                type="submit"
                variant="hero"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminLogin;

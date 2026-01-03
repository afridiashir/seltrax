import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth.store";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useStoresStore } from "@/stores/store.store";
import { AuthHeader } from "./AuthHeader";

const Login = () => {
  const login = useAuthStore((s: any) => s.login);
  const setStores = useStoresStore((s) => s.setStores);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // 🔐 API call will go here later
      // const res = await authService.login(form)
      const register = await axios.post(
        "http://localhost:5001/auth/login",
        form
      );

      const token = register.data.token;
      const { name, email } = register.data;

      const storesRes = await axios.get(
        "http://localhost:5001/stores",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const stores = storesRes.data.stores || [];

      // ✅ Save all stores globally
      setStores(stores);

      if (stores.length > 0) {
        login({
          token,
          name,
          email,
          currentStoreId: stores[0].id,
        });

        navigate("/home");
      } else {
        login({
          token,
          name,
          email,
          currentStoreId: null,
        });

        toast.error("No stores found");
        navigate("/create-store");
      }

    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="h-screen flex items-center bg-background justify-center">
      <AuthHeader />
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="font-semibold">
            <h1>Sign in to Seltrax</h1>
          </CardTitle>

          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Get Started
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* SOCIAL LOGIN */}
          <div className="flex gap-4">
            <Button
              disabled
              variant={'outline'}
              title="Coming Soon!"
              className="w-full bg-background p-2 rounded-md hover:muted flex items-center gap-3 justify-center"
            >
              <img
                src="/Google__G__logo.svg.png"
                className="w-5 h-5"
              />
              Google
            </Button>
          </div>

          <p className="text-center py-4 text-muted-foreground">
            or using email and password
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="me@mywebsite.com"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Field className="mt-4">
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="py-5"
                />
              </FieldContent>
            </Field>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in
                </>
              ) : (
                <>
                  Sign In <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster position="top-right" />
    </div>
  );
};

export default Login;

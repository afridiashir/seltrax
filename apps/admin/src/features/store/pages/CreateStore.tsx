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
import { useAuthStore } from "@/stores/auth.store";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const CreateStore = () => {
    const login = useAuthStore((s: any) => s.login);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

        if (!form.name || !form.email || !form.password) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const register = await axios.post("http://localhost:5001/auth/register", form).then((res) => {
                toast.success(res.data.message);
            });

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center bg-gray-100 justify-center">
            <Card className="w-[400px] py-6">
                <CardHeader>
                    <CardTitle className="font-semibold">
                        <h1>Get Started with Seltrax</h1>
                    </CardTitle>

                    <CardDescription>
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500">
                            Sign In
                        </Link>
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* SOCIAL LOGIN */}
                    <div className="flex gap-4 mt-2">
                        <button
                            disabled
                            title="Coming Soon!"
                            className="w-full bg-gray-100 p-2 rounded-md hover:bg-gray-200 flex items-center gap-3 justify-center"
                        >
                            <img
                                src="/Google__G__logo.svg.png"
                                className="w-5 h-5"
                            />
                            Google
                        </button>
                    </div>

                    <p className="text-center py-4 text-gray-500">
                        or using email and password
                    </p>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <FieldLabel>Full Name</FieldLabel>
                            <FieldContent>
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ash Brian"
                                    className="py-5"
                                />
                            </FieldContent>
                        </Field>

                        <Field className="mt-4">
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
                                    placeholder="********"
                                    className="py-5"
                                />
                            </FieldContent>
                        </Field>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-6 bg-blue-500"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account
                                </>
                            ) : (
                                <>
                                    Sign Up <ArrowRight />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-3 text-gray-500 text-[11px]">
                        By signing up, you agree to the Terms & Conditions and Privacy Policy.
                    </p>
                </CardContent>
            </Card>

            <Toaster position="top-right" />
        </div>
    );
};

export default CreateStore;

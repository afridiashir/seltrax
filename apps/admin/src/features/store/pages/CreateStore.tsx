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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetchWithoutStore } from "@/lib/fetcher";
import { useApi, useApiWithoutStore } from "@/hooks/use-api";
import { useStoresStore } from "@/stores/store.store";

const CreateStore = () => {
    const setCurrentStore = useAuthStore((s: any) => s.setCurrentStore);
    const addStore = useStoresStore((s: any) => s.addStore);
    const api = useApiWithoutStore();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        category: "",
        currency: "",
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

        if (!form.name || !form.category || !form.currency) {
            alert("All fields are required");
            return;
        }

        try {
            setLoading(true);

            await api.post("/stores/create", form).then((res) => {
                toast.success(res.data.message);
                setCurrentStore(res.data.store.id);
                addStore(res.data.store);

                setTimeout(() => {
                    navigate("/home", { replace: true });
                }, 2000);
            });

        } catch (error) {
            console.error(error);
            toast.error("Adding Store failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center bg-gray-100 justify-center">
            <Card className="w-[400px] py-6">
                <CardHeader>
                    <CardTitle className="font-semibold">
                        <h1>Start selling with Seltrax</h1>
                    </CardTitle>

                    <CardDescription>
                        Create your store and start...
                    </CardDescription>
                </CardHeader>

                <CardContent>

                    {/* FORM */}
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <FieldLabel>Store Name</FieldLabel>
                            <FieldContent>
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Ash Store"
                                    className="py-5"
                                />
                            </FieldContent>
                        </Field>

                        <Field className="mt-4">
                            <FieldLabel>Store Category</FieldLabel>
                            <FieldContent>
                                <Select
                                    value={form.category}
                                    onValueChange={(value) =>
                                        setForm({ ...form, category: value })
                                    }
                                >
                                    <SelectTrigger className="py-5 w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="fashion">Fashion</SelectItem>
                                        <SelectItem value="electronics">Electronics</SelectItem>
                                        <SelectItem value="grocery">Grocery</SelectItem>
                                        <SelectItem value="beauty">Beauty</SelectItem>
                                        <SelectItem value="digital">Digital Products</SelectItem>
                                        <SelectItem value="services">Services</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FieldContent>
                        </Field>


                        <Field className="mt-4">
                            <FieldLabel>Store Currency</FieldLabel>
                            <FieldContent>
                                <Select
                                    value={form.currency}
                                    onValueChange={(value) =>
                                        setForm({ ...form, currency: value })
                                    }
                                >
                                    <SelectTrigger className="py-5 w-full">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Rs">Rs - Pakistani Rupee</SelectItem>
                                        <SelectItem value="$">$ - US Dollar</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    Creating store
                                </>
                            ) : (
                                <>
                                    Create Store <ArrowRight />
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

export default CreateStore;

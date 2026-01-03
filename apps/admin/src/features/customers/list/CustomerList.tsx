'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown, Search, User } from "lucide-react";
import { DataTable } from "./datatable";
import { columns } from "./columns";
import { CustomerSchemaType } from "@repo/zod-schemas";
import { useApiWithStore } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageTitle } from "@/hooks/usePageTitle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


/* ---------------- Debounce Hook ---------------- */
function useDebounce<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const sortOptions = [
  {
    "key": "createdAt",
    "label": "Customer Created"
  },
  {
    "key": "firstName",
    "label": "Name"
  },
  {
    "key": "email",
    "label": "Email"
  },
  {
    "key": "phone",
    "label": "Phone"
  },
  // {
  //   "key": "firstOrderDate",
  //   "label": "First Order Date"
  // },
  // {
  //   "key": "lastOrderDate",
  //   "label": "Last Order Date"
  // }
];

const LIMIT = 25;

const CustomerList = () => {
  const api = useApiWithStore();
  usePageTitle("Customers");

  const [rowSelection, setRowSelection] = useState({});

  const [data, setData] = useState<CustomerSchemaType[]>([]);
  const [loading, setLoading] = useState(true);


  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [totalCustomers, setTotalCustomers] = useState(999);

  const debouncedSearch = useDebounce(search);

  /* ---------------- Fetch Customers ---------------- */
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/customers", {
          params: {
            page,
            limit: LIMIT,
            search: debouncedSearch || undefined,
            sortBy,
            sortOrder,
          },
        });

        setData(res.data.customers);
        setTotal(res.data.pagination.total);
        setTotalCustomers(res.data.overAllCustomers);
      } catch (err) {
        console.error("Failed to fetch customers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [api, page, debouncedSearch, useDebounce(sortBy, 2000), useDebounce(sortOrder, 2000)]);

  const totalPages = Math.ceil(total / LIMIT);

  const totalCustomersPercentage = Math.floor(total * 100 / totalCustomers).toFixed(2);

  if (totalCustomers === 0) {
    return (
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6" />
            <h2 className="font-medium">Customers</h2>
          </div>
        </div>
        <Card className="mt-4">
          <CardContent>
            <div className="flex flex-col md:flex-row px-4 md:px-32 py-4 md:py-32  items-center">
              <div className="flex flex-col">
                <h3 className="text-xl md:text-3xl">Everything Customers Related in One Place</h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2">Manage customer details, see customer order history, and group customers into segments.</p>
                <div className="flex gap-4 mt-4">
                  <Link to={'/customers/new'}><Button >Add Customer</Button></Link>
                  <Button variant="secondary">Import</Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-8 md:mt-0">
                <img src="/customers.png" className="mix-blend-multiply" alt="" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6" />
          <h2 className="font-medium">Customers</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size={'sm'}>Export</Button>
          <Button variant="secondary" size={'sm'}>Import</Button>
          <Link to={'/customers/new'}><Button variant={"default"} size={'sm'}>Add Customer</Button></Link>
        </div>
      </div>

      {/* Info */}
      <Card className="mt-4 p-4 gap-0 text-sm text-foreground">
        <CardHeader className="m-0 p-0 gap-0 flex items-center gap-4">
          <p className="flex items-center gap-2">{loading ? <Skeleton className="w-8 h-4" /> : total} Customers</p>
          <p>|</p>
          <p className="flex items-center gap-2">{loading ? <Skeleton className="w-8 h-4" /> : totalCustomersPercentage}% of your customer base</p>
        </CardHeader>
      </Card>

      {/* Table */}
      <Card className="mt-4 p-0 gap-0">
        <CardHeader className="m-0 p-0 gap-0 flex flex-row items-center justify-between p-3 text-sm">
          <div className="w-full flex items-center gap-2 rounded-md px-2">
            <Search className="w-4 h-4 text-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page on search
              }}
              placeholder="Search customer by email, phone or name..."
              className="w-full text-foreground outline-none"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7">
                <ArrowUpDown className="w-4 h-4 foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-sm">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <RadioGroup defaultValue={sortBy} className="flex flex-col gap-0" onValueChange={(value) => setSortBy(value)}>
                {sortOptions.map((option) => (
                  <div className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 cursor-pointer">
                    <RadioGroupItem value={option.key} id={option.key} />
                    <Label htmlFor={option.key} className="cursor-pointer text-sm text-gray-600">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              <DropdownMenuSeparator />
              <Button variant="outline" className={`w-full  bg-white border-none shadow-none hover:bg-white hover:text-gray-600 flex items-center justify-start ${sortOrder === 'asc' ? 'bg-gray-200 hover:bg-gray-200 hover:text-gray-600' : ''}`} onClick={() => setSortOrder('asc')}>
                <ArrowUp className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Lowest to Highest</span>
              </Button>
              <Button variant="outline" className={`w-full bg-white border-none shadow-none hover:bg-white hover:text-gray-600 flex items-center justify-start ${sortOrder === 'desc' ? 'bg-gray-200 hover:bg-gray-200 hover:text-gray-600' : ''}`} onClick={() => setSortOrder('desc')}>
                <ArrowDown className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Highest to Lowest</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

        </CardHeader>

        <CardContent className="p-0 border-b border-t">

          {loading ? (
            <div className="w-full flex flex-col gap-2 px-4 py-2">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
          ) : (
            <DataTable columns={columns} data={data} setData={setData} />
          )}
        </CardContent>

        <CardFooter className="text-sm p-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowRight className="w-4 h-4 text-foreground" />
          </Button>

          <p className="text-foreground">
            Page {page} of {totalPages || 1}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerList;

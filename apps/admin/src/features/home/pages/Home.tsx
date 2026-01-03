import { useAuthStore } from "@/stores/auth.store";
import { ChartAreaInteractive } from "../components/salesChart";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { timeAgo } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "../components/DateRangePicker";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="px-48 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">
          Welcome, {user?.name}!
        </h1>
        <DateRangePicker />
      </div>

      <div className="w-full">
        <Card className="mt-4 gap-0 p-0">
          <CardContent className="p-0 flex gap-2">
            <div className="border-r w-1/3 p-2">

              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-sm ">Total Sales</p>
                <p className="text-2xl font-medium">Rs 120,890.00</p>
              </div>
            </div>
            <div className="border-r w-1/3 p-2">
              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-sm">Total Orders</p>
                <p className="text-2xl font-medium">167</p>
              </div>
            </div>
            <div className="border-r w-1/3 p-2">
              <div className="flex flex-col gap-2 p-3  bg-primary text-white hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-sm">Total Visitors</p>
                <p className="text-2xl font-medium">3879</p>
              </div>
            </div>
            <div className="border-r w-1/3 p-2">
              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-sm">Conversion Rate</p>
                <p className="text-2xl font-medium">4.30%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <ChartAreaInteractive />
      <div className="w-full mt-8">
        <p className="text-md text-muted-foreground mb-4">Things to do right now</p>
        <Card className="gap-0 p-0">
          <CardContent className="flex gap-2 p-0">
            <div className="w-1/3 border-r p-2">
              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-xl ">55</p>
                <p className="text-md font-medium">New Orders Pending</p>
              </div>
            </div>
            <div className="w-1/3 border-r p-2">
              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-xl ">1</p>
                <p className="text-md font-medium">Order worth Rs 4,010.00 to ship today</p>
              </div>
            </div>
            <div className="w-1/3 border-r p-2">
              <div className="flex flex-col gap-2 p-3 hover:bg-muted cursor-pointer rounded-md" >
                <p className="font-medium text-xl ">0</p>
                <p className="text-md font-medium">Abandoned Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>Store Link</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <div className="border p-4 rounded-md bg-muted/20 flex items-center">
              <a href="https://seltrax.com" className="flex-1 text-md font-medium underline underline-offset-3">https://seltrax.com</a>
              <Button variant="outline">Copy</Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-xs">Share it on social media</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

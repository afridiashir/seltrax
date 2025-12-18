import { useAuthStore } from "@/stores/auth.store";

const Dashboard = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout); // ✅ select the function

  return (
    <div>
      <h1 className="text-xl font-medium">
        Welcome, {user?.name}!
      </h1>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

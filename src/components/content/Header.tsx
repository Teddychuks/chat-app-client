import { Button } from "@/components/ui/button";
import { useLogout } from "../auth/useAuth";
import { logout as logoutApi } from "@/services/apiAuth";

export const Header = () => {
  const { isPending, logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logoutApi();
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-slate-800 text-white">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Chat Interface</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          className="text-white hover:text-red-400"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
};

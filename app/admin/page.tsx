import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminShell from "./adminShell";

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminShell />;
};

export default AdminPage;

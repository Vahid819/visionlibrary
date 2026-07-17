import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsClient from "@/components/SettingsClient";
import EditContext from "@/context/EditContext";

export default async function DashboardSettingsLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-6">
      <EditContext>
        <SettingsClient session={session} />
        {children}
      </EditContext>
    </div>
  );
}

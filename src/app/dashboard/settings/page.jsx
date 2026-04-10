import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsClient from "../../../components/SettingsClient";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authorized</div>;
  }

  return <SettingsClient session={session} />;
}
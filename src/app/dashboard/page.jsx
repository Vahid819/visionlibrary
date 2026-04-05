import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";
import Deskarengment from "@/components/Deskarengment";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  // console.log("Session in dashboard:", session);

  if (!session) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <LogoutButton />
      <Deskarengment />
    </div>
  );
}
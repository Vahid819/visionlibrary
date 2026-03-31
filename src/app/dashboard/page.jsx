import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      Welcome {session.user.email}
      <LogoutButton />
    </div>
  );
}
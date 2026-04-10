import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/app/dashboard/settings/page";

async function server() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>Not authorized</div>;
    }
  return <Page session={session} />;
}

export default server
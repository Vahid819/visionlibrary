import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MessageClientWrapper from "./MessageClientWrapper";

async function getStudents() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  await connectDB();

  // Fetch active students belonging to this user
  const students = await StudentModel.find({ 
    createdBy: session.user.id,
    isActive: true 
  }).lean();

  // Format the data for your DataTable
  return students.map((student) => ({
    id: student._id.toString(),
    name: `${student.firstName} ${student.lastName}`,
    phone: student.phone,
    email: student.email,
    plan: student.plan,
  }));
}

export default async function DemoPage() {
  const data = await getStudents();

  return (
    <div className="container flex flex-wrap mx-auto py-10">
      <div className="mb-4 w-full">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Select a student from the list to send them a WhatsApp message.
        </p>
      </div>
      
      {/* Pass the data to our Client Wrapper */}
      <MessageClientWrapper data={data} />
    </div>
  );
}
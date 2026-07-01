import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MessageClientWrapper from "./MessageClientWrapper";

async function getStudents() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    await connectDB();

    const students = await StudentModel.find({
      createdBy: session.user.id,
      isActive: true,
    })
      .select(
        "_id firstName lastName phone email plan paymentStatus seat"
      )
      .lean();

    return students.map((student) => ({
      id: student._id.toString(),
      name: `${student.firstName} ${student.lastName}`,
      phone: student.phone,
      email: student.email,
      plan: student.plan,
      seat: student.seat,
      paymentStatus: student.paymentStatus,
    }));
  } catch (error) {
    console.error("Failed to load students:", error);
    return [];
  }
}

export default async function MessagePage() {
  const students = await getStudents();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Messages
        </h1>

        <p className="text-muted-foreground mt-1">
          Select a student to send a WhatsApp message.
        </p>
      </div>

      <MessageClientWrapper data={students} />
    </div>
  );
}
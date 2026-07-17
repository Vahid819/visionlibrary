import SeatPageContent from "@/components/dashboard/seats/SeatPageContent";

export default async function StudentSeatPage({ params }) {
  const { studentId } = await params;
  return (
    <SeatPageContent studentId={studentId} />
  );
}
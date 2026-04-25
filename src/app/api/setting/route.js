export async function POST(req) {
  const session = await getServerSession(authOptions);
  await connectDB();

  try {
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { rows, cols } = body;

    // ✅ generate seats (FIXED)
    const seats = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => ({
        seatNumber: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
        isAvailable: true,
      }))
    ).flat();

    const updatedSeatting = await Seat.findOneAndUpdate(
      { id: session.user.id },
      {
        row: rows,
        column: cols,
        seat: seats,
        seatUpdatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Seatting saved/updated successfully",
        data: updatedSeatting,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating seatting:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to update seatting",
      }),
      { status: 500 }
    );
  }
}
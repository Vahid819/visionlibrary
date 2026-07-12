import dbconnect from "@/lib/db";
import PaymentPlan from "@/models/Paymentplan";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  await dbconnect();

  try {
    const body = await req.json();

    const existingPlan = await PaymentPlan.findOne({
      userId: session.user.id,
    });

    if (existingPlan) {
      const duplicatePlans = [];

      for (const newPlan of body.plans) {
        const exists = existingPlan.plans.some(
          (plan) =>
            plan.planName.toLowerCase().trim() ===
            newPlan.planName.toLowerCase().trim(),
        );

        if (exists) {
          duplicatePlans.push(newPlan.planName);
        } else {
          existingPlan.plans.push(newPlan);
        }
      }

      // If all submitted plans are duplicates
      if (duplicatePlans.length === body.plans.length) {
        return NextResponse.json(
          {
            success: false,
            message: `Plan already exists: ${duplicatePlans.join(", ")}`,
          },
          { status: 409 },
        );
      }

      await existingPlan.save();

      return NextResponse.json({
        success: true,
        message:
          duplicatePlans.length > 0
            ? `Plans saved. Skipped duplicate plan(s): ${duplicatePlans.join(", ")}`
            : "Plans updated successfully.",
        data: existingPlan,
      });
    }

    // First plan for this user
    const newPaymentPlan = await PaymentPlan.create({
      userId: session.user.id,
      plans: body.plans,
    });

    return NextResponse.json({
      success: true,
      message: "Payment plan created successfully",
      data: newPaymentPlan,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

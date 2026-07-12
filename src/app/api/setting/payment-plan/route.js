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

export async function GET() {
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
    const paymentPlan = await PaymentPlan.findOne({
      userId: session.user.id,
    }).lean();

    if (!paymentPlan) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "No payment plans found.",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: paymentPlan.plans,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET Payment Plans Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch payment plans.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbconnect();

  try {
    const body = await req.json();

    const paymentPlan = await PaymentPlan.findOne({
      userId: session.user.id,
    });

    if (!paymentPlan) {
      return NextResponse.json(
        { message: "Payment plan not found" },
        { status: 404 }
      );
    }

    const plan = paymentPlan.plans.id(body.planId);

    if (!plan) {
      return NextResponse.json(
        { message: "Plan not found" },
        { status: 404 }
      );
    }

    plan.planName = body.planName;
    plan.planAmount = body.planAmount;
    plan.totalPlan = body.totalPlan;

    await paymentPlan.save();

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
      data: paymentPlan,
    });

  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  await dbconnect();

  try {
    const { searchParams } = new URL(req.url);

    const planId = searchParams.get("id");

    if (!planId) {
      return NextResponse.json(
        {
          success: false,
          message: "Plan ID is required",
        },
        { status: 400 }
      );
    }

    const paymentPlan = await PaymentPlan.findOne({
      userId: session.user.id,
    });

    if (!paymentPlan) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment plans not found",
        },
        { status: 404 }
      );
    }

    const planExists = paymentPlan.plans.some(
      (plan) => plan._id.toString() === planId
    );

    if (!planExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Plan not found",
        },
        { status: 404 }
      );
    }

    paymentPlan.plans = paymentPlan.plans.filter(
      (plan) => plan._id.toString() !== planId
    );

    await paymentPlan.save();

    return NextResponse.json({
      success: true,
      message: "Plan deleted successfully",
      data: paymentPlan.plans,
    });
  } catch (error) {
    console.error("Delete Plan Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
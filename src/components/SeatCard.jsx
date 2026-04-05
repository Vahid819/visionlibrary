"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SeatCard({ seat }) {
  const isEmpty = !seat.student;
  const isPaid = seat.paymentStatus === "paid";
  const isOverdue = seat.isOverdue;

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg
      ${
        isEmpty
          ? "bg-muted"
          : isOverdue
          ? "border-red-500"
          : isPaid
          ? "border-green-500"
          : "border-yellow-500"
      }`}
    >
      <CardContent className="p-4 flex flex-col gap-2 text-center">
        <p className="font-bold text-lg text-foreground">
          Seat {seat.id}
        </p>

        {isEmpty ? (
          <p className="text-sm text-muted-foreground">Available</p>
        ) : (
          <>
            <p className="text-sm font-medium text-foreground">
              {seat.student}
            </p>

            <Badge
              variant="outline"
              className={`text-xs ${
                isPaid
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : isOverdue
                  ? "border-red-500 text-red-600 dark:text-red-400"
                  : "border-yellow-500 text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {isOverdue ? "Overdue" : isPaid ? "Paid" : "Due"}
            </Badge>
          </>
        )}
      </CardContent>
    </Card>
  );
}
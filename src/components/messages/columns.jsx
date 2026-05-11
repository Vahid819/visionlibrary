"use client";

import { Button } from "@/components/ui/button";

export const columns = (setSelectedStudent) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  // 👇 Add this email column definition back in
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setSelectedStudent(student)}
        >
          Select for Message
        </Button>
      );
    },
  },
];
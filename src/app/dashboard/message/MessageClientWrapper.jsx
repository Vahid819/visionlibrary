"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/messages/data-table";
import { columns } from "@/components/messages/columns";
import Message from "@/components/messages/messages";

export default function MessageClientWrapper({ data }) {
  const [selectedStudent, setSelectedStudent] = useState();

  const tableColumns = useMemo(
    () => columns(setSelectedStudent),
    []
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <DataTable
          columns={tableColumns}
          data={data}
        />
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <Message
          selectedStudent={selectedStudent}
        />
      </div>

    </div>
  );
}
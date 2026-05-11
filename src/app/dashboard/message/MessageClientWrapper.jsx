"use client";

import { useState } from "react";
import { DataTable } from "@/components/messages/data-table";
import { columns } from "@/components/messages/columns";
import Message from "@/components/messages/messages";

export default function MessageClientWrapper({ data }) {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="rounded-md border w-full px-2 py-4 h-auto">
        <DataTable 
           columns={columns(setSelectedStudent)} 
           data={data} 
        />
      </div>
      
      <div>
        <Message selectedStudent={selectedStudent} />
      </div>
    </div>
  );
}
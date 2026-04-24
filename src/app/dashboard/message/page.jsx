import { columns } from "@/components/messages/columns";
import { DataTable } from "@/components/messages/data-table";
import Message from "@/components/messages/messages";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 300,
      status: "pending",
      email: "vahid@example.com",
    },
    {
      id: "728ed52f",
      amount: 500,
      status: "pending",
      email: "john@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container flex flex-wrap mx-auto py-10">
      <div className="mb-4 w-full">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          A list of all the messages in your account.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="rounded-md border w-full px-2 py-4 h-auto">
          <DataTable columns={columns} data={data} />
        </div>
        <div>
          <Message />
        </div>
      </div>
    </div>
  );
}

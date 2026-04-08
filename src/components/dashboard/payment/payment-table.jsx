    "use client";

    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table";

    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { StatusBadge } from "./status-badge";
    import { Search } from "lucide-react";

    const payments = [
    {
        id: "1",
        name: "Rahul",
        amount: "₹200",
        status: "paid",
        date: "Today",
    },
    {
        id: "2",
        name: "Sneha",
        amount: "₹150",
        status: "pending",
        date: "Today",
    },
    {
        id: "3",
        name: "Amit",
        amount: "₹300",
        status: "failed",
        date: "Yesterday",
    },
    ];

    export function PaymentTable() {
    return (
        <Card className="bg-background/60 backdrop-blur border border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History</CardTitle>

            {/* 🔍 Search */}
            <div className="relative w-64">
            <Search className="absolute left-2 top-1.5 size-4 text-muted-foreground" />
            <Input
                placeholder="Search payments..."
                className="pl-8 bg-background/60 border-border/50 focus-visible:ring-1"
            />
            </div>
        </CardHeader>

        <CardContent>
            <Table>
            <TableHeader>
                <TableRow className="hover:bg-muted/40 transition-colors">
                <TableHead className="text-muted-foreground text-xs">
                    Name
                </TableHead>
                <TableHead className="text-muted-foreground text-xs">
                    Amount
                </TableHead>
                <TableHead className="text-muted-foreground text-xs">
                    Status
                </TableHead>
                <TableHead className="text-muted-foreground text-xs">
                    Date
                </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {payments.map((p) => (
                <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <TableCell>
                    <StatusBadge status={p.status} />
                    </TableCell>
                    <TableCell>{p.date}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    );
    }

"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function UsersPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.users));
  }, []);

 return (
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold text-teal-800">
        Users
      </h1>

      <Button
        variant="outline"
        className="border-teal-600 text-teal-700 hover:bg-teal-50"
        onClick={() => window.location.reload()}
      >
        <RefreshCcw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>

    {/* Table */}
    <div className="rounded-2xl border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-[#FDF6EE]">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Loans</TableHead>
            <TableHead className="text-right">
              Pre-approved Limit
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u: any, i) => (
            <TableRow
              key={i}
              className="hover:bg-teal-50 transition"
            >
              {/* Name */}
              <TableCell>
                <p className="font-semibold text-gray-800">
                  {u.name}
                </p>
                <p className="text-xs text-gray-500">
                  {u.email}
                </p>
              </TableCell>

              {/* City */}
              <TableCell>{u.city}</TableCell>

              {/* DOB */}
              <TableCell>
                {new Date(u.dob).toLocaleDateString()}
              </TableCell>

              {/* Contact */}
              <TableCell>
                <p className="text-sm">{u.phone}</p>
              </TableCell>

              {/* Loans */}
              <TableCell>
                {u.current_loans?.length > 0 ? (
                  <details className="group cursor-pointer">
                    <summary className="flex items-center gap-1 text-sm text-teal-700">
                      {u.current_loans.length} loan(s)
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>

                    <div className="mt-2 space-y-2">
                      {u.current_loans.map(
                        (loan: any, idx: number) => (
                          <div
                            key={idx}
                            className="rounded-lg bg-[#FDF6EE] p-2 text-xs"
                          >
                            <p className="font-medium">
                              {loan.type}
                            </p>
                            <p>
                              EMI: ₹
                              {loan.emi.toLocaleString()}
                            </p>
                            <p>
                              Outstanding: ₹
                              {loan.outstanding.toLocaleString()}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </details>
                ) : (
                  <span className="text-sm text-gray-500">
                    No loans
                  </span>
                )}
              </TableCell>

              {/* Limit */}
              <TableCell className="text-right font-bold text-teal-700">
                ₹{u.pre_approved_limit.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
}


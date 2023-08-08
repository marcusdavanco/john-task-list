import { ManageTaskForm } from "@/components/ManageTaskForm";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { ArrowUpDown } from "lucide-react";

export default function Tasks() {
  return (
    <main className="flex min-h-screen flex-col items-center px-[18px] py-7 overflow-hidden" >
      <ManageTaskForm />
    </main>
  )
}
"use client";

import { PaymentHeader } from "@/components/dashboard/payment/payment-header";
import { PaymentStats } from "@/components/dashboard/payment/payment-stats";
import { PaymentTable } from "@/components/dashboard/payment/payment-table";
import { PaymentFilters } from "@/components/dashboard/payment/payment-filters";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PaymentPage() {

  const [userdata, setUserdata] = useState([])
  
  const getUserdata = async ()=>{
    try {
      const userdata = await axios.get("/api/students/")
      setUserdata(userdata.data)
    } catch (error) {
      console.error("problem in url",error);
      
    }
  }

  useEffect(() => {
    getUserdata();
  
  }, [])
  

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PaymentHeader />

      {/* Filters */}
      <PaymentFilters />

      {/* Stats */}
      <PaymentStats userdata={userdata}/>

      {/* Table */}
      <PaymentTable userdata={userdata}/>
    </div>
  );
}
'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PaymentSettings from "@/components/dashboard/setting/PaymentSettings";
import axios from "axios";
import SettingsClient from '@/components/SettingsClient'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import z from 'zod'
import { controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/button'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


function PaymentSettings() {
  const form = userForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      upiId: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/setting/userpaymentacount", {
        upiId: data.upiId,
      });
      toast.success("Payment settings updated successfully");
    } catch (error) {
      toast.error("Error updating payment settings");
    }
  }

  return (
    <div>
      <SettingsClient />
      <Separator className="my-4" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field>
          <FieldLabel htmlFor="upiId">UPI ID</FieldLabel>
          <FieldDescription>Enter your UPI ID for payment settings.</FieldDescription>
          <FieldError>{form.formState.errors.upiId?.message}</FieldError>
        </Field>
      </form>
    </div>
  )
}

export default PaymentSettings
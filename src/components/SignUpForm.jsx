"use client";
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import signUpSchema from '@/zodSchemas/signUP'
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';

function SignUpForm() {
    const form = useForm({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
          fristname: "",
          lastname: "",
          email: "",
          
      }
  })


  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fristname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">Create Account</Button>
      </form>
    </Form>
    </div>
  )
}

export default SignUpForm
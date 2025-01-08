'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import loginSchema from '@/zodSchemas/signIn'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'


function SigninForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  function onSubmit(value) {
    console.log(value)
  }
  return (
    <div>SigninForm</div>
  )
}

export default SigninForm
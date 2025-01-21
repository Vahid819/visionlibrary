import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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

function SignUp() {
    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         username: "",
    //     },
    // })
    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     console.log(values)
    // }
    return (
        <div>
            {/* <Form {...form}>

            </Form> */}
        </div>
    )
}

export default SignUp
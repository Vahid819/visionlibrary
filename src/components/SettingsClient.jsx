"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function SettingsClient() {
  return (
    <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="mt-4 w-[98%] border flex rounded-lg"> 
          <Link href="/dashboard/settings">
          <Button variant="outline" className="rounded-l-lg m-2 p-3 hover:scale-105 cursor-pointer ">
            Profile
          </Button>
          </Link>
          <Link href="/dashboard/settings/payment">
          <Button variant="outline" className="rounded-r-lg m-2 p-3 hover:scale-105 cursor-pointer ">
            Account
          </Button>
          </Link>
          <Link href="/dashboard/settings/seats">
          <Button variant="outline" className="rounded-r-lg m-2 p-3 hover:scale-105 cursor-pointer ">
            Seats
          </Button>
          </Link>
          <Link href="/dashboard/settings/security">
          <Button variant="outline" className="rounded-r-lg m-2 p-3 hover:scale-105 cursor-pointer ">
            Security
          </Button>
          </Link>
        </div>
    </div>
  )
}

export default SettingsClient
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function page() {
  return (
    <div>
      Landing page
      <Link href="/auth/login">
        <Button variant="outline">Go to Login</Button>
      </Link>
      hello world
    </div>
  )
}

export default page
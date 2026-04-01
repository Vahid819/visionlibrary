import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      Landing page
      <Link href="/auth/login">login</Link>
    </div>
  )
}

export default page
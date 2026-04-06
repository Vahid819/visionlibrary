import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <div>
      Landing page
      <Link href="/auth/login">login</Link>
      hello world
    </div>
  )
}

export default page
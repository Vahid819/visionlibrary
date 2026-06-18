'use client'
import React, { createContext, useState } from 'react'

export const EditdataContext = createContext()

function EditContext(props) {
    const [edit, setEdit] = useState(false)
  return (
    <div>
        <EditdataContext.Provider value={[edit, setEdit]}>
            {props.children}
        </EditdataContext.Provider>
    </div>
  )
}

export default EditContext
import { Typography } from '@mui/material'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { appHeaderChildrenAtom } from '../AppHeader'

export const Header = () => {
  const setAppHeaderChildren = useUpdateAtom(appHeaderChildrenAtom)

  useEffect(() => {
    setAppHeaderChildren(<Typography variant="h6" children="Settings" />)
  }, [])

  return null
}

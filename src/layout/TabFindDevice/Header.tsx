import { Box, IconButton, Typography } from '@mui/material'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useEffect } from 'react'
import IconSort from '~icons/fluent/arrow-sort-down-lines-24-regular'
import IconSync from '~icons/fluent/arrow-sync-24-regular'
import { appHeaderChildrenAtom } from '../AppHeader'
import { FindDeviceSort, findDeviceSortAtom } from './DeviceList'
import { SelectRadio } from '/src/components/SelectRadio'

export const Header = () => {
  const [sort, setSort] = useAtom(findDeviceSortAtom)
  const setAppHeaderChildren = useUpdateAtom(appHeaderChildrenAtom)

  useEffect(() => {
    setAppHeaderChildren(
      <>
        <Typography variant="h6">Find Device</Typography>
        <Box flex={1} />
        <SelectRadio
          title="Sort by"
          options={[
            { value: FindDeviceSort.ASCENDING, label: 'Ascending' },
            { value: FindDeviceSort.DESCENDING, label: 'Descending' },
            { value: FindDeviceSort.OLDEST, label: 'Oldest' },
            { value: FindDeviceSort.NEWEST, label: 'Newest' },
          ]}
          value={sort}
          onChange={setSort}
          trigger={openDialog => (
            <IconButton onClick={openDialog} children={<IconSort />} />
          )}
        />
        <IconButton children={<IconSync />} />
      </>
    )
  }, [])

  return null
}

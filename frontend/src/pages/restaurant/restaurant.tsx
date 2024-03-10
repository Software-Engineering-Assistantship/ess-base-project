import { useQuery } from '@tanstack/react-query'
import { MenuItem } from '../../components/menu-item'
import { Box, Tabs, Tab, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MenuItemDrawer } from '../../components/menu-item-drawer'
import { getAllCategories } from '../../api/getAllCategories'

export function Restaurant() {
  const location = useLocation()

  const isAdmin = location.pathname.includes('admin')
  const [value, setValue] = useState(0)
  const [openMenuDrawer, setOpeMenuDrawer] = useState(false)

  const { data: result } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getAllCategories({
        restaurantId: '10bda948-685d-45aa-b312-e1e972794813',
      }),
  })

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  function handleCloseMenuDrawer() {
    setOpeMenuDrawer(false)
  }

  function handleOpenMenuDrawer() {
    setOpeMenuDrawer(true)
  }

  return (
    <>
      {result && (
        <>
          <MenuItemDrawer
            open={openMenuDrawer}
            handleClose={handleCloseMenuDrawer}
            categoriesOptions={result}
          />
          <Box
            sx={{
              display: 'flex',
              marginBottom: '1rem',
            }}
          >
            {isAdmin && (
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                onClick={handleOpenMenuDrawer}
              >
                Create new item
              </Button>
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
              >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
                <Tab label="Item Four" />
              </Tabs>
            </Box>
          </Box>
          {result[0].menuItems.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                adminMode={isAdmin}
                categories={result}
              />
            )
          })}
        </>
      )}
    </>
  )
}

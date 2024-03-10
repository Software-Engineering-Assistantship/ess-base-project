import { useQuery, useMutation } from '@tanstack/react-query'
import { Box, Tabs, Tab, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MenuItemDrawer } from '../../components/menu-item-drawer'
import { MenuItemBody, createMenuItem, getAllCategories } from '../../api/menu'
import { MenuItem } from '../../components/menu-item'

export function Restaurant() {
  const location = useLocation()

  const isAdmin = location.pathname.includes('admin')
  const [value, setValue] = useState(0)
  const [openMenuDrawer, setOpeMenuDrawer] = useState(false)

  const { data: result, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      getAllCategories({
        restaurantId: '10bda948-685d-45aa-b312-e1e972794813',
      }),
  })

  const { mutateAsync: createMenuItemFn, isPending: isCreating } = useMutation({
    mutationFn: createMenuItem,
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

  async function handleCreateMenuItem(menuItem: MenuItemBody) {
    await createMenuItemFn(menuItem)
  }

  return (
    <>
      {result && (
        <>
          <MenuItemDrawer
            open={openMenuDrawer}
            handleClose={handleCloseMenuDrawer}
            categoriesOptions={result}
            refetch={refetch}
            handleMenuItemAction={handleCreateMenuItem}
            isLoading={isCreating}
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
                refetch={refetch}
              />
            )
          })}
        </>
      )}
    </>
  )
}

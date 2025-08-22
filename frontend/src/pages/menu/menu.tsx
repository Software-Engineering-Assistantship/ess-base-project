import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
  getRestaurant,
  Restaurant,
  Category,
  saveCategory,
} from '../../api/restaurant'
import { Button, Dialog, TextField } from '@mui/material'
import { CategoryComponent } from '../../components/category'
import { MenuItemDrawer } from '../../components/menu-item-drawer'
import { useMutation } from '@tanstack/react-query'
import { MenuItemBody, createMenuItem } from '../../api/menu'

export function Menu() {
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')

  const { id } = useParams()

  const [restaurant, setRestaurant] = useState({} as Restaurant)
  const [reloadPage, setReloadPage] = useState(false)

  const [isOpen, setOpen] = useState(false)

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')
  const [openMenuDrawer, setOpeMenuDrawer] = useState(false)

  const handleSave = async () => {
    if (id) {
      const categoryData = {
        name: newCategoryName,
        description: newCategoryDescription,
        restaurantId: id,
      }

      const category = await saveCategory(categoryData)

      if (!category) {
        alert('Nome já utilizado')
      } else {
        setOpen(false)
        setNewCategoryName('')
        setNewCategoryDescription('')
        setReloadPage(!reloadPage)
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      if (id) {
        const restaurant = await getRestaurant(id)
        setRestaurant(restaurant)
      }
    })()
  }, [id, reloadPage])

  const { mutateAsync: createMenuItemFn, isPending: isCreating } = useMutation({
    mutationFn: createMenuItem,
  })

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
      {restaurant && (
        <>
          <div style={{ marginBottom: 20 }}>
            <div>
              <h1>{restaurant.name}</h1>
              <h2>{restaurant.type}</h2>
            </div>

            {isAdmin && (
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  Criar categoria
                </Button>

                <Button variant="contained" onClick={handleOpenMenuDrawer}>
                  Criar item
                </Button>
              </div>
            )}
          </div>

          {restaurant.categories?.map((category: Category) => (
            <CategoryComponent
              key={category.id}
              category={category}
              reloadPage={reloadPage}
              setReloadPage={setReloadPage}
              isAdmin={isAdmin}
            />
          ))}

          {restaurant?.categories && (
            <MenuItemDrawer
              open={openMenuDrawer}
              handleClose={handleCloseMenuDrawer}
              categoriesOptions={restaurant?.categories}
              refetch={() => setReloadPage(!reloadPage)}
              handleMenuItemAction={handleCreateMenuItem}
              isLoading={isCreating}
            />
          )}
        </>
      )}

      <Dialog open={isOpen} onClose={() => setOpen(false)}>
        <div style={{ padding: '20px' }}>
          <TextField
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            fullWidth
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button
              onClick={() => {
                setOpen(false)
              }}
              color="primary"
            >
              Cancelar
            </Button>

            <Button onClick={handleSave} color="primary" variant="contained">
              Salvar
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

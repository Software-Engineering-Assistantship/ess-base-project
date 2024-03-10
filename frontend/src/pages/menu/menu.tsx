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

export function Menu() {
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')

  const { id } = useParams()

  const [restaurant, setRestaurant] = useState({} as Restaurant)
  const [reloadPage, setReloadPage] = useState(false)

  const [isOpen, setOpen] = useState(false)

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')

  const handleSave = async () => {
    if (id) {
      const categoryData = {
        name: newCategoryName,
        description: newCategoryDescription,
        restaurantId: id,
      }

      await saveCategory(categoryData)
    }

    setOpen(false)
    setNewCategoryName('')
    setNewCategoryDescription('')
    setReloadPage(!reloadPage)
  }

  useEffect(() => {
    ;(async () => {
      if (id) {
        const restaurant = await getRestaurant(id)
        setRestaurant(restaurant)
      }
    })()
  }, [id, reloadPage])

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
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true)
                }}
              >
                Criar categoria
              </Button>
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

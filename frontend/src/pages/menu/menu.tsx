import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
  getRestaurant,
  Restaurant,
  Category,
  saveCategory,
  deleteCategory,
} from '../../api/restaurant'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete'

export function Menu() {
  const location = useLocation()
  const isAdmin = location.pathname.includes('admin')

  const { id } = useParams()

  const [restaurant, setRestaurant] = useState({} as Restaurant)
  const [reloadPage, setReloadPage] = useState(false)

  const [open, setOpen] = useState(false)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [deleteCategoryId, setDeleteCategoryId] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')

  const handleSave = async () => {
    if (id) {
      const newCategory = {
        name: newCategoryName,
        description: newCategoryDescription,
        restaurantId: id,
      }

      await saveCategory(newCategory)

      setOpen(false)
      setNewCategoryName('')
      setNewCategoryDescription('')
      setReloadPage(!reloadPage)
    }
  }

  const handleDelete = (categoryId: string) => {
    setDeleteCategoryId(categoryId)
    setConfirmDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    await deleteCategory(deleteCategoryId)
    setReloadPage(!reloadPage)
    setConfirmDeleteOpen(false)
    setDeleteCategoryId('')
  }

  useEffect(() => {
    ;(async () => {
      if (id) {
        const restaurant = await getRestaurant(id)
        console.log(restaurant)
        setRestaurant(restaurant)
      }
    })()
  }, [id, reloadPage])

  return (
    <>
      {restaurant && (
        <>
          <div>
            <h1>{restaurant.name}</h1>
            <h2>{restaurant.type}</h2>
          </div>

          {isAdmin && (
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Criar categoria
            </Button>
          )}

          {restaurant?.categories?.map((category: Category) => (
            <Paper
              key={category.id}
              elevation={3}
              style={{
                padding: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3>{category.name}</h3>
                <h4>Descrição: {category.description}</h4>
              </div>

              {isAdmin && (
                <DeleteIcon onClick={() => handleDelete(category.id)} />
              )}
            </Paper>
          ))}

          <Dialog open={open} onClose={() => setOpen(false)}>
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
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancelar
                </Button>

                <Button
                  onClick={handleSave}
                  color="primary"
                  variant="contained"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </Dialog>

          <Dialog
            open={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
          >
            <div style={{ padding: '20px' }}>
              <p>Você deseja deletar esta categoria?</p>

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button
                  onClick={() => setConfirmDeleteOpen(false)}
                  color="primary"
                >
                  Cancelar
                </Button>

                <Button
                  onClick={handleConfirmDelete}
                  color="primary"
                  variant="contained"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </>
  )
}

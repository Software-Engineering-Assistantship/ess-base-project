import { useState } from 'react'
import { TextField, Dialog, Button, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Category, deleteCategory, editCategory } from '../api/restaurant'

interface Props {
  category: Category
  reloadPage: boolean
  setReloadPage: (value: boolean) => void
  isAdmin: boolean
}

export const CategoryComponent = ({
  category,
  reloadPage,
  setReloadPage,
  isAdmin,
}: Props) => {
  const [isOpen, setOpen] = useState(false)

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)

  const [newCategoryName, setNewCategoryName] = useState(category.name)
  const [newCategoryDescription, setNewCategoryDescription] = useState(
    category.description,
  )

  const handleSave = async () => {
    const categoryData = {
      name: newCategoryName,
      description: newCategoryDescription,
      restaurantId: category.restaurantId,
    }

    await editCategory(category.id, categoryData)

    setOpen(false)
    setReloadPage(!reloadPage)
  }

  const handleConfirmDelete = async () => {
    await deleteCategory(category.id)
    setReloadPage(!reloadPage)
    setConfirmDeleteOpen(false)
  }

  return (
    <>
      <Divider />
      <div
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true)
              }}
            >
              Editar
            </Button>

            <DeleteIcon onClick={() => setConfirmDeleteOpen(true)} />
          </div>
        )}
      </div>
      <Divider />

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
              Editar
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
            <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
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
  )
}

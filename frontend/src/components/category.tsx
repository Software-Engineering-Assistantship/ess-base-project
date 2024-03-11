import { useState } from 'react'
import { TextField, Dialog, Button, Divider } from '@mui/material'
import { DeleteOutline, Edit } from '@mui/icons-material'
import { Category, deleteCategory, editCategory } from '../api/restaurant'
import { MenuItem } from './menu-item'

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
      <Divider style={{ backgroundColor: 'black' }} />

      <div
        style={{
          padding: '10px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h3>{category.name}</h3>
              <h4 style={{ fontWeight: 'normal' }}>{category.description}</h4>
            </div>

            {isAdmin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Edit
                  aria-label="edit"
                  onClick={() => {
                    setOpen(true)
                  }}
                />

                <DeleteOutline
                  aria-label="delete"
                  sx={{
                    color: 'red',
                  }}
                  onClick={() => setConfirmDeleteOpen(true)}
                />
              </div>
            )}
          </div>

          {category.menuItems.map((menuItem) => {
            return (
              <div key={menuItem.id}>
                <MenuItem
                  key={menuItem.id}
                  menuItem={menuItem}
                  adminMode={isAdmin}
                  categories={[category]}
                  refetch={() => setReloadPage(!reloadPage)}
                />
              </div>
            )
          })}
        </div>
      </div>
      <Divider style={{ backgroundColor: 'black' }} />

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

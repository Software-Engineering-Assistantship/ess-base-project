import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Button, Box, AppBar, Toolbar, TextField, IconButton, Select, MenuItem, Divider} from '@mui/material';
import { getCards, createCard, deleteCard, updateCard } from '../../api/payment';
import { CreditCard, ArrowBackIos, Close as CloseIcon, Edit, Delete } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog'
import { SelectChangeEvent } from '@mui/material';


// Função para obter os dados dos cartões de uma API

export const Payment: React.FC = () => {
  const [cardList, setCardList] = useState<any[]>([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [deleteCardId, setDeleteCardId] = useState('')
  const [updateCardId, setUpdateCardId] = useState('')
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
        const restaurant = await getCards()
        console.log(restaurant)
        setCardList(restaurant)
    })()
  }, [cardList, reloadPage])

  const handleGoBack = () => {
    window.location.href = '/user'
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCardType(event.target.value as string);
  };
  
  const handleSave = async () => {
    const newCard = {
        cardNumber: cardNumber,
        type: cardType,
        cvv: Number(cvv),
        expirationDate: expiryDate,
        cardHolderName: cardHolderName
    }

    await createCard(newCard)

    setOpenModal(false)
    setCardNumber('')
    setCardType('')
    setCvv('')
    setExpiryDate('')
    setCardHolderName('')
    setReloadPage(!reloadPage)
  }

  const handleDelete = (cardId: string) => {
    setDeleteCardId(cardId)
    setConfirmDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    await deleteCard(deleteCardId)
    setReloadPage(!reloadPage)
    setConfirmDeleteOpen(false)
    setDeleteCardId('')
  }

  const handleUpdate = (cardId: string) => {
    setUpdateCardId(cardId)
    setConfirmUpdateOpen(true)
  }

  const handleConfirmUpdate = async () => {
    const cardUpdates = {
        cardNumber: cardNumber
    }
    await updateCard(updateCardId, cardUpdates)
    setReloadPage(!reloadPage)
    setConfirmUpdateOpen(false)
    setCardNumber('')
    setUpdateCardId('')
  }

  return (
    <Container maxWidth="lg">
     <AppBar position="sticky" sx={{ boxShadow: 'none', backgroundColor: 'transparent', marginBottom: 5 }}>
        <Toolbar>
          <Button onClick={handleGoBack} startIcon={<ArrowBackIos sx={{ marginLeft: -2 }}/>} color="inherit" sx={{ color: '#000' }}>
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' }}>
            Meus Cartões
          </Typography>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} style={{ padding: 20 }}>
      <List>
        {cardList.map((card, index) => (
            <React.Fragment key={card.id}>
            <ListItem>
                <ListItemIcon>
                <CreditCard />
                </ListItemIcon>
                <ListItemText primary={`**** **** **** ${card.cardNumber.slice(-4)}`} secondary={card.type} />
                <IconButton
                  aria-label="Editar"
                  onClick={() => handleUpdate(card.id)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="Excluir"
                  onClick={() => handleDelete(card.id)}
                >
                  <Delete />
                </IconButton>
            </ListItem>
            {index !== cardList.length - 1 && (
                <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}/>
            )}
            </React.Fragment>
        ))}
      </List>
      </Paper>

      <Box position="fixed" bottom={30} width="calc(100% - 40px)" margin="0 auto">
        <Button variant="contained" color="primary" fullWidth onClick={handleOpenModal}>
          + Adicionar novo cartão
        </Button>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
      <Box width="70vw" height="80vh" padding={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h6">Adicionar Novo Cartão</Typography>
        <IconButton onClick={handleCloseModal}>
            <CloseIcon />
        </IconButton>
        </Box>
        <Select
            value={cardType}
            onChange={handleChange}
            fullWidth
            label="Tipo de Cartão"
          >
            <MenuItem value="Crédito">Crédito</MenuItem>
            <MenuItem value="Débito">Débito</MenuItem>
          </Select>
        <TextField label="Número do Cartão" fullWidth sx= {{marginTop: 2}} onChange={(e) => setCardNumber(e.target.value)}/>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2} marginBottom={2}>
        <TextField label="Data de Validade" fullWidth onChange={(e) => setExpiryDate(e.target.value)} />
        <Box width="20px" /> 
        <TextField label="CVV" fullWidth type="number" onChange={(e) => setCvv(e.target.value)}/>
        </Box>
        <TextField label="Nome do Titular" fullWidth sx={{ marginBottom: 2}} onChange={(e) => setCardHolderName(e.target.value)}/>
        <Box marginTop={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
            Salvar
        </Button>
        </Box>
      </Box>
      </Dialog>

      <Dialog
            open={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
          >
            <div style={{ padding: '20px' }}>
              <p>Você deseja deletar este cartão?</p>

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

          <Dialog
            open={confirmUpdateOpen}
            onClose={() => setConfirmUpdateOpen(false)}
          >
            <div style={{ padding: '20px' }}>
            <IconButton onClick={() => setConfirmUpdateOpen(false)} style={{ position: 'absolute', right: '10px', top: '10px' }}>
            <CloseIcon />
            </IconButton>
            <p>Alterar número do cartão:</p>
            <TextField
            label="Novo número do cartão"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ marginBottom: '20px' }}
            />
            <div style={{ textAlign: 'right' }}>
            <Button onClick={handleConfirmUpdate} color="primary" variant="contained" style={{ marginLeft: '10px' }}>
                Salvar
            </Button>
            </div>
        </div>
          </Dialog>

          
    </Container>
  );
};


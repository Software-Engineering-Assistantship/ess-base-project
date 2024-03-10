import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, List, ListItem, ListItemAvatar, ListItemText, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation } from 'react-router-dom';


export const User: React.FC = () => {

  const location = useLocation();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
              <PersonIcon sx={{ width: 60, height: 60 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
              João da Silva
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              joao@example.com
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Informações do Usuário
            </Typography>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Nome" secondary="João da Silva" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary="joao@example.com" />
              </ListItem>
              {/* Adicione mais informações do usuário conforme necessário */}
            </List>
          </Paper>
          <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Navegação
            </Typography>
            <Button
              variant="text"
              fullWidth
              style={{ marginBottom: 10, borderRadius: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
              Notificações
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => window.location.href = '/payment'}
              style={{ marginBottom: 10, borderRadius: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
              Pagamento
            </Button>
            <Button variant="text" fullWidth style={{ marginBottom: 10, borderRadius: 0 }}>
              Pedidos
            </Button>
        </Grid>

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

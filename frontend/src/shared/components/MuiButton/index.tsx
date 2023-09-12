import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ColorButtons() {


  return (
    <Stack direction="row" spacing={2}>
        <Button variant="contained" color="secondary" startIcon={<AddIcon />}>Adicionar {}</Button>
    </Stack>
  );
}
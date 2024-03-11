'use client'
export const CategoriesStyles = {
    container: {
        backgroundColor: '#FCF6F6',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column' as const, // Definindo como constante para evitar a incompatibilidade de tipo
    },

    header:{
      display: 'flex',
      flexDirection: 'column' as const,
    },

    title: {
      color: '#9B1127',
      fontSize: '32px',
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 'bold',
    },

    categoriesContainer: {
      width: '100%',
      display: 'flex',
      //alignItens: 'center',
      justifyContent: 'center',
      flexDirection: 'row' as const,
    },

    categoryBox: {
      margin: '10px',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
    },

    categoryName: {
      flexGrow: 1,
      color: '#000',
      fontSize: '20px',
      padding:'10px',
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 'medium',
      textAlign: 'center' as const,
    },

    editIcon: {
      width: '20px',
      height: '20px',
      marginLeft: '10px',
    },   
    






    buttonsContainer: {
      width: '100%',
      display: 'flex',
      alignItens: 'flex-end',
      justifyContent: 'right',
      flexDirection: 'row' as const,
    },
    







    confirmPopup: {
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
    textAlign: 'center' as const,
      justifyContent: 'center'
    },
    confirmPopupInner: {
        position: 'fixed' as const,
    top: '50%', /* Mantém o pop-up no meio verticalmente */
    left: '50%', /* Mantém o pop-up no meio horizontalmente */
    transform: 'translate(-50%, -50%)', /* Centraliza o pop-up na tela */
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
      textAlign: 'center' as const
    },
    confirmButton: {
      backgroundColor: 'black',
      color: 'white',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px'
    },

  };
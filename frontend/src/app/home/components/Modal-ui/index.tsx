import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Image from '../Image';
import {
    ModalContainer,
    ExcludeButton,
    Header,
    ButtonContainer,
    Pbuttons,
    Button
} from './styles';
import GlobalTheme from '../../global/styles/theme';
import { Title } from '../../global/styles/components';
import cancelIcon from '../../Assets/excluir.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: '100vh',
            overflowY: 'auto',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function ModalComponent({
    open,
    setOpen,
    children,
    title,
    textExit = 'Cancelar',
    textSubmit = 'Salvar',
    onClick,
    onCancel = () => 1,
    isBold = false,
    disabledSubmit = false,
}: {
    open: boolean;
    setOpen: Function;
    children?: React.ReactNode;
    title: string;
    textExit?: string;
    textSubmit?: string;
    onClick: Function;
    onCancel?: Function;
    isBold?: boolean;
    disabledSubmit?: boolean;
}) {
    const classes = useStyles();

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <ModalContainer>
                        <Header justify="space-between">
                            <Title>
                                {title}
                            </Title>
                            <ExcludeButton onClick={() => setOpen(false)} color={GlobalTheme.colors.white}>
                                <Image src={cancelIcon} alt="Botão de fechar" width="15px" />
                            </ExcludeButton>
                        </Header>
                        {children}
                        <ButtonContainer justify='flex-end' align='center'>
                            <Button onClick={() => {
                                setOpen(false)
                                onCancel()
                            }} color={GlobalTheme.colors.white}>
                                <Pbuttons>
                                    {textExit}
                                </Pbuttons>
                            </Button>
                            <Button onClick={() => onClick()} color='pink' disabled={disabledSubmit}>
                                <Pbuttons>
                                    {textSubmit}
                                </Pbuttons>
                            </Button>
                        </ButtonContainer>
                    </ModalContainer>
                </Fade>
            </Modal>
        </>
    );

}

export default ModalComponent;

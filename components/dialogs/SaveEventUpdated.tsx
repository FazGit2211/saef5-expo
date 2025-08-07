import { useContext, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { PropsDialogType } from "./DeleteEventDialog";
import EventContext from "../../contexts/EventContext";
import useAlert from "../../hooks/useAlert";
import { Dialog } from "react-native-paper";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 20,
    p: 2,
};
export default function SaveEventUpdate({ openDialog, code, closeDialog }: PropsDialogType) {
    //propiedades e métodos para enviar los datos hacia la api
    const url = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(url);
    //propiedades e métodos para utilizar el contexto evento
    const { event, stadium, players } = useContext(EventContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleSave = () => {
        if (code !== undefined) {
            const codigo = event.codigo;
            const date = event.date;
            putEvent(code.toString(), { codigo, date, stadium, players });
        };
    };

    useEffect(() => {
        if (loading) {
            handleShowAlert();
            handleSetTimeOut();
        };
    }, [loading, error]);

    return (
        <>
            {/*<Dialog open={openDialog} sx={style}>
                <DialogTitle>Confirmar?</DialogTitle>
                <DialogActions><Button variant="contained" onClick={handleSave}><Save /></Button></DialogActions>
                <Button variant="contained" onClick={closeDialog}><Cancel /></Button>
                {alert ? <Alert variant="filled" severity="success">Enviando{error.message}</Alert> : null}
            </Dialog>*/}
        </>
    )
}
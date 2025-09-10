import { useContext } from "react";
import useApi from "../../hooks/useApiEvent";
import { PropsDialogType } from "./DeleteEventDialog";
import EventContext from "../../contexts/EventContext";
import useAlert from "../../hooks/useAlert";
import { Button, Dialog, Text } from "react-native-paper";

export default function SaveEventUpdateDialog({ openDialog, idEvent, closeDialog }: PropsDialogType) {
    //propiedades e métodos para enviar los datos hacia la api
    const url = "http://localhost:5000/api/event";
    const { putEvent, loading, error } = useApi(url);
    //propiedades e métodos para utilizar el contexto evento
    const { event, stadium, players } = useContext(EventContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleSave = () => {
        if (idEvent !== undefined) {
            putEvent(event.idEvent, { codigo: event.codigo, date: event.date, stadium, players });
        };
    };
    return (
        <>
            <Dialog visible={openDialog}>
                <Dialog.Title>Confirmar?</Dialog.Title>
                <Dialog.Actions>
                    <Button mode="contained" onPress={handleSave}><Text>Guardar</Text></Button>
                </Dialog.Actions>
                <Button mode="contained" onPress={closeDialog}><Text>Cerrar</Text></Button>
                {loading ? <Text>Eliminando...</Text> : null}
                {!loading && error.errorValue ? <Text>{error.message}</Text> : null}
                {alert && !loading && error.errorValue ? <Text>Eliminado</Text> : null}
            </Dialog>
        </>
    )
}
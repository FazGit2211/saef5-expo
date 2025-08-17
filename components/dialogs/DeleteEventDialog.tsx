import { useContext } from "react";
import useAlert from "../../hooks/useAlert";
import EventContext from "../../contexts/EventContext";
import useApi from "../../hooks/useApiEvent";
import { Button, Dialog, Text } from "react-native-paper";

export interface PropsDialogType {
    openDialog: boolean,
    idEvent: number,
    closeDialog: () => void
};
export default function DeleteEventDialog({ openDialog, idEvent, closeDialog }: PropsDialogType) {
    //utilizar el hook personalizado para realizar las peticiones a la api
    const url = "http://localhost:5000/api/event";
    const { loading, error, deleteEvent } = useApi(url);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //utilizar el contexto del evento
    const { removeEvent } = useContext(EventContext);
    const handleDeleted = () => {
        if (idEvent !== undefined) {
            deleteEvent(idEvent);
        };
    };
    return (
        <>
            <Dialog visible={openDialog}>
                <Dialog.Title>
                    Eliminar?
                </Dialog.Title>
                <Dialog.Actions>
                    <Button mode="contained" onPress={handleDeleted} icon="delete-circle"><Text>Eliminar</Text></Button>
                    <Button mode="contained" onPress={closeDialog}><Text>Cancelar</Text></Button>
                    {loading ? <Text>Eliminando...</Text> : null}
                    {!loading && error.errorValue ? <Text>{error.message}</Text> : null}
                    {alert && !loading && error.errorValue ? <Text>Eliminado</Text> : null}
                </Dialog.Actions>
            </Dialog>
        </>
    );
}
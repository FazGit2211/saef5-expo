import { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";
import useAlert from "../../hooks/useAlert";
import { Button, Dialog, Text } from "react-native-paper";

interface PropsType {
    openDialog: boolean,
    indexDelete: number,
    closeDialog: () => void
};
export default function DeletePlayerDialog({ openDialog, indexDelete, closeDialog }: PropsType) {
    //propiedades e métodos del contexto
    const { removePlayers } = useContext(PlayerContext);
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();

    const handleDeleted = () => {
        removePlayers(indexDelete);
        handleShowAlert();
        handleSetTimeOut();
        closeDialog();
    }
    return (
        <>
            <Dialog visible={openDialog}>
                <Dialog.Title>
                    Eliminar ?
                </Dialog.Title>
                <Dialog.Actions>
                    <Button mode="contained" onPress={handleDeleted}>Eliminar</Button>
                    <Button mode="contained" onPress={closeDialog}>Cancelar</Button>
                    {alert ? <Text>Eliminado</Text> : null}
                </Dialog.Actions>
            </Dialog>
        </>
    );
}
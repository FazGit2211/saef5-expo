import { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";
import useAlert from "../../hooks/useAlert";
import { Button, Dialog, Text } from "react-native-paper";
import useApiPlayer from "../../hooks/useApiPlayer";

interface PropsType {
    openDialog: boolean,
    indexDelete: number,
    closeDialog: () => void
};
export default function DeletePlayerDialog({ openDialog, indexDelete, closeDialog }: PropsType) {
    //propiedades e métodos del contexto
    const { removePlayers } = useContext(PlayerContext);
    //utilizar los hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const uri = "";
    const {loadingPlayer, errorPlayer} = useApiPlayer(uri);
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
                    <Button mode="contained" onPress={handleDeleted} icon="delete-circle"><Text>Eliminar</Text></Button>
                    <Button mode="contained" onPress={closeDialog}><Text>Cancelar</Text></Button>
                    {loadingPlayer ? <Text>Eliminando...</Text> : null}
                    {!loadingPlayer && errorPlayer.errorPlayer ? <Text>{errorPlayer.message}</Text> : null}
                    {alert && !loadingPlayer && errorPlayer.errorPlayer ? <Text>Eliminado</Text> : null}
                </Dialog.Actions>
            </Dialog>
        </>
    );
}
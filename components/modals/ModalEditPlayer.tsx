import { Button, Modal, Portal, Text } from "react-native-paper";
import FormEdit from "../forms/FormEdit";
import useDialog from "../../hooks/useDialog";
import DeletePlayerDialog from "../dialogs/DeletePlayerDialog";
import { PlayerType } from "../../contexts/PlayerContext";

export interface PropsEditType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number
};

export default function ModalEditPlayer({ openModal, closeModal, dataEdit, indexPlayer }: PropsEditType) {
    //Utilizar propiedades e métodos del hook dialogos
    const { deletePlayer, openDeletePlayer, closeDeletePlayer } = useDialog();
    return (
        <>
            <Portal>
                <Modal visible={openModal}>
                    <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                    <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
                    <Button mode="contained" onPress={openDeletePlayer}><Text>Eliminar</Text></Button>
                    {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null}
                </Modal>
            </Portal>
        </>
    )
}
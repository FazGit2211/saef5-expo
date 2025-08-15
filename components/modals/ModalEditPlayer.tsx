import { Button, Modal, Portal } from "react-native-paper";
import FormEdit from "../forms/FormEdit";
import { PlayerType } from "../../contexts/EventContext";
import useDialog from "../../hooks/useDialog";
import DeletePlayerDialog from "../dialogs/DeletePlayerDialog";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number
};

export default function ModalEditPlayer({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) {
    //Utilizar propiedades e métodos del hook dialogos
    const { deletePlayer, openDeletePlayer, closeDeletePlayer } = useDialog();
    return (
        <>
            <Portal>
                <Modal visible={openModal}>
                    <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                    <Button mode="contained" onPress={closeModal}>Cerrar</Button>
                    <Button mode="contained" onPress={openDeletePlayer}>Eliminar</Button>
                    {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null}
                </Modal>
            </Portal>
        </>
    )
}
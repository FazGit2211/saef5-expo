import { Button, Modal, Portal } from "react-native-paper";
import FormEdit from "../forms/FormEdit";
import { PlayerType } from "../../contexts/EventContext";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number
};

export default function ModalEditPlayer({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) {
    return (
        <Portal>
            <Modal visible={openModal}>
                <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                <Button mode="contained" onPress={closeModal}>Cerrar</Button>
            </Modal>
        </Portal>
    )
}
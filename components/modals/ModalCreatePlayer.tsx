import { Button, Modal, Portal } from "react-native-paper";
import FormCreate from "../forms/FormCreate";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
};

export default function ModalCreatePlayer({ openModal, closeModal }: PropsType) {
    return (
        <Portal>
            <Modal visible={openModal}>
                <FormCreate />
                <Button mode="contained" onPress={closeModal}>Cerrar</Button>
            </Modal>
        </Portal>
    )
}
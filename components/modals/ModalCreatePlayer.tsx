import { Button, Modal, Portal, Text } from "react-native-paper";
import FormCreate from "../forms/FormCreate";

export interface PropsType {
    openModal: boolean,
    closeModal: () => void,
};

export default function ModalCreatePlayer({ openModal, closeModal }: PropsType) {
    return (
        <Portal>
            <Modal visible={openModal}>
                <FormCreate />
                <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
            </Modal>
        </Portal>
    )
}
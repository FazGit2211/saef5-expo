import { Button, Modal, Portal } from "react-native-paper";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalCreatePlayer({ openModal, closeModal }: PropsType) {
    return (
        <Portal>
            <Modal visible={openModal}>
                {/*<FormCreate />*/}
                <Button mode="contained" onPress={closeModal}>Cerrar</Button>
            </Modal>
        </Portal>
    )
}
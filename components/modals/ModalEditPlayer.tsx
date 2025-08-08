import { Button, Modal, Portal } from "react-native-paper";
import FormEdit from "../forms/FormEdit";
import { PlayerType } from "../../contexts/EventContext";
import { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";
import { GestureResponderEvent } from "react-native";

interface PropsType {
    openModal: boolean,
    closeModal: () => void,
    dataEdit: PlayerType,
    indexPlayer: number
};

export default function ModalEditPlayer({ openModal, closeModal, dataEdit, indexPlayer }: PropsType) {
    //Utilizar propiedades e métodos del contexto player
    const { removePlayers } = useContext(PlayerContext);
    //Método para eliminar al jugador por su index
    const handleDeletePlayer = (index: GestureResponderEvent) => {
        console.log(index);
    }
    return (
        <Portal>
            <Modal visible={openModal}>
                <FormEdit playerEdit={dataEdit} indexPlayerEdit={indexPlayer} />
                <Button mode="contained" onPress={closeModal}>Cerrar</Button>
                <Button mode="contained" onPress={handleDeletePlayer}>Eliminar</Button>
            </Modal>
        </Portal>
    )
}
import { Button, Text } from "react-native-paper";
import useModal from "../../../hooks/useModal";
import { useContext } from "react";
import PlayerContext from "../../../contexts/PlayerContext";
import ModalCreatePlayer from "../../../components/modals/ModalCreatePlayer";
import ListPlayer from "../../../components/lists/ListPlayer";

export default function PlayerNew() {
    //Utilizar propiedades e métodos de hook personalizado para los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    //Utilizar propiedades e métodos del contexto para los jugadores
    const { players } = useContext(PlayerContext);
    return (
        <>
            <Button mode="contained" onPress={openModalPlayer}>+</Button>
            {players.length === 0 ? <Text>No hay jugadores agregados </Text> : <ListPlayer />}
            {modalPlayer ? <ModalCreatePlayer openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
        </>
    );
}
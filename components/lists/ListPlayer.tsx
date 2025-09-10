import { useContext, useState } from "react";
import useDialog from "../../hooks/useDialog";
import useModal from "../../hooks/useModal";
import PlayerContext, { PlayerType } from "../../contexts/PlayerContext";
import { useRouter } from "expo-router";
import { Button, List, Text } from "react-native-paper";
import ModalEditPlayer from "../modals/ModalEditPlayer";

export default function ListPlayer() {
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    const { deletePlayer, closeDeletePlayer } = useDialog();
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ id: 0, name: "", email: "", state: "", admin: "" });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    const { players } = useContext(PlayerContext);
    const router = useRouter()

    const handleSelectEdit = (elem: PlayerType, index: number) => {
        openModalPlayer();
        setEditPlayer(elem);
        setIndexPlayer(index);
    };


    const handleConfirmBtn = () => {
        router.push("/event/event-new")
    };
    return (
        <>
            <List.Accordion title="Jugadores">
                {players.map((elem, index) => (<List.Item key={elem.name} title={elem.name} onPress={() => handleSelectEdit(elem, index)} left={props => <List.Icon icon="delete-circle" />} />))}
            </List.Accordion>
            <Button mode="contained" onPress={handleConfirmBtn}><Text>Confirmar jugadores</Text></Button>
            {modalPlayer ? <ModalEditPlayer openModal={modalPlayer} closeModal={closeModalPlayer} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
        </>
    )
}

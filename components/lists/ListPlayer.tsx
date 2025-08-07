import { useContext, useState } from "react";
import { PlayerType } from "../../contexts/EventContext";
import useDialog from "../../hooks/useDialog";
import useModal from "../../hooks/useModal";
import PlayerContext from "../../contexts/PlayerContext";
import { useRouter } from "expo-router";
import { List } from "react-native-paper";

export default function ListPlayer() {
    //propiedades e método para utilizar los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    //propiedades e método para utilizar los dialogos de confirmacion
    const { deletePlayer, openDeletePlayer, closeDeletePlayer } = useDialog();
    //variables de estados para poder editar e distinguir uno por uno
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    //propiedades e métodos para el contexto
    const { players } = useContext(PlayerContext);
    //Utilizar la función de expo router para cambiar de pantalla
    const router = useRouter()

    const handleSelectEdit = (elem: PlayerType, index: number) => {
        openModalPlayer();
        setEditPlayer(elem);
        setIndexPlayer(index);
    };

    const handleDeletedItem = (indexDeleted: number) => {
        openDeletePlayer();
        setIndexPlayer(indexDeleted);
    };


    const handleConfirmBtn = () => {
        router.push("/event/event-new")
    };
    return (
        <>
            {/*<List>
                {players.map((elem, index) => (<ListItem key={elem.name}><People /> {elem.name} <Button variant="contained" onClick={() => handleDeletedItem(index)}><Delete /></Button> <Button variant="contained" onClick={() => handleSelectEdit(elem, index)}><Edit /></Button> </ListItem>))}
                <Button variant="contained" onClick={handleConfirmBtn}>CONFIRMAR JUGADORES</Button>
            </List>*/}
            {/*modalPlayer ? <ModalEditPlayer openModal={modalPlayer} closeModal={closeModalPlayer} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null*/}
            {/*deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null*/}
        </>
    )
}

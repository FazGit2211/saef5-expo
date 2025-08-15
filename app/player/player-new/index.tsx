import { Button, Text } from "react-native-paper";
import useModal from "../../../hooks/useModal";
import { useContext } from "react";
import PlayerContext from "../../../contexts/PlayerContext";
import ModalCreatePlayer from "../../../components/modals/ModalCreatePlayer";
import ListPlayer from "../../../components/lists/ListPlayer";
import * as Contact from "expo-contacts";

export default function PlayerNew() {
    //Utilizar propiedades e métodos de hook personalizado para los modales
    const { modalPlayer, closeModalPlayer, openModalPlayer } = useModal();
    //Utilizar propiedades e métodos del contexto para los jugadores
    const { players, addPlayer } = useContext(PlayerContext);
    //Utilizar expo contacts para obtener a los contactos del celular
    const handleGetContacts = async () => {
        const { status } = await Contact.getPermissionsAsync();
        if (status === "granted") {
            const { data } = await Contact.getContactsAsync();
            if (data.length > 0) {
                addPlayer({ name: data[0].firstName, surname: data[0].lastName, phoneNumber: 0, email: "", state: "" })
            }
        }
    }
    return (
        <>
            <Button mode="contained" onPress={openModalPlayer}>Nuevo</Button>
            <Button mode="contained" onPress={handleGetContacts}>Agregar contactos desde el celular</Button>
            {players.length > 0 ? <ListPlayer /> : <Text>No hay jugadores agregados </Text>}
            {modalPlayer ? <ModalCreatePlayer openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
        </>
    );
}
import { useRouter } from "expo-router";
import { Button, Card } from "react-native-paper";
import useModal from "../../hooks/useModal";
import ModalDate from "../modals/ModalDate";

export default function CardNewEvent() {
    //Utilizar la función de expo router para cambiar de pantalla
    const router = useRouter();
    //Utilizar propiedades e métodos de hook personalizado de los modales
    const { modalDate, openModalDate, closeModalDate } = useModal();

    const handleBtnPlayerNew = () => {
        router.push("/player/player-new");
    }
    return (
        <>
            <Card>
                <Card.Actions>
                    <Button mode="contained" icon="account-plus" onPress={handleBtnPlayerNew}>Jugadores</Button>
                    <Button mode="contained" icon="calendar" onPress={openModalDate}>Fecha</Button>
                    <Button mode="contained" icon="soccer-field">Canchas</Button>
                </Card.Actions>
            </Card>
            {modalDate ? <ModalDate show={modalDate} hideModal={closeModalDate} /> : null}
        </>
    )
}
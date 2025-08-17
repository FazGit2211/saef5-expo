import { useRouter } from "expo-router";
import { Button, Card, Text } from "react-native-paper";
import useModal from "../../hooks/useModal";
import ModalDate from "../modals/ModalDate";
import ModalStadium from "../modals/ModalStadium";
import { View } from "react-native";

export default function CardNewEvent() {
    const router = useRouter();
    const { modalDate, openModalDate, closeModalDate, modalStadium, openModalStadium, closeModalStadium } = useModal();
    const handleBtnPlayerNew = () => {
        router.push("/player/player-new");
    }
    return (
        <View>
            <Card>
                <Card.Actions>
                    <Button mode="contained" icon="account-plus" onPress={handleBtnPlayerNew}><Text>Jugadores</Text></Button>
                    <Button mode="contained" icon="calendar" onPress={openModalDate}><Text>Fecha</Text></Button>
                    <Button mode="contained" icon="soccer-field" onPress={openModalStadium}><Text>Canchas</Text></Button>
                </Card.Actions>
            </Card>
            {modalDate ? <ModalDate openModal={modalDate} closeModal={closeModalDate} /> : null};
            {modalStadium ? <ModalStadium openModal={modalStadium} closeModal={closeModalStadium} /> : null};
        </View>
    )
}
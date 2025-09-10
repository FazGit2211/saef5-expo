import { useContext, useState } from "react";
import EventContext from "../../../contexts/EventContext";
import useDialog from "../../../hooks/useDialog";
import PlayerContext, { PlayerType } from "../../../contexts/PlayerContext";
import { Button, Card, List, Text } from "react-native-paper";
import useModal from "../../../hooks/useModal";
import CardStadium from "../../../components/cards/CardStadium";
import ListAccordion from "react-native-paper/lib/typescript/components/List/ListAccordion";
import CardInfoEvent from "../../../components/cards/CardInfoEvent";
import ModalEditPlayerEvent from "../../../components/modals/ModalEditPlayerEvent";
import DeletePlayerDialog from "../../../components/dialogs/DeletePlayerDialog";
import ModalAddPlayerEvent from "../../../components/modals/ModalAddPlayerEvent";
import SaveEventUpdateDialog from "../../../components/dialogs/SaveEventUpdatedDialog";

export default function EventUpdate() {
    const [editPlayer, setEditPlayer] = useState<PlayerType>({ id: 0, name: "", email: "", state: "", admin: "" });
    const [indexPlayer, setIndexPlayer] = useState<number>(0);
    const { modalPlayer, closeModalPlayer, openModalPlayer, modalPlayerEdit, closeModalPlayerEdit, openModalPlayerEdit } = useModal();
    const { deletePlayer, openDeletePlayer, closeDeletePlayer, saveEvent, closeSaveEvent } = useDialog();
    const { event, stadium, addPlayers } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    const handleSelectEdit = (elem: PlayerType, index: number) => {
        setEditPlayer(elem);
        setIndexPlayer(index);
        openModalPlayerEdit();
    };
    const handleDeletedItem = (indexDeleted: number, elem: PlayerType) => {
        setEditPlayer(elem);
        openDeletePlayer();
        setIndexPlayer(indexDeleted);
    };
    const handleAddPlayer = () => {
        openModalPlayer();
    };
    return (
        <>
            <Card>
                <Card.Content>
                    {event ? <CardInfoEvent /> : <Text>No hay datos</Text>}
                    {stadium ? <CardStadium /> : <Text>No hay datos</Text>}
                    {players && players.length > 0 ? <ListAccordion title="Jugadores">{players.map((elem, index) => (<List.Item key={elem.id} title={elem.name} />))}</ListAccordion> : <Text>No hay jugadores</Text>}
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={handleAddPlayer}><Text>Nuevo</Text></Button>
                </Card.Actions>
            </Card>
            {modalPlayerEdit ? <ModalEditPlayerEvent openModal={modalPlayerEdit} closeModal={closeModalPlayerEdit} dataEdit={editPlayer} indexPlayer={indexPlayer} /> : null}
            {deletePlayer ? <DeletePlayerDialog openDialog={deletePlayer} indexDelete={indexPlayer} closeDialog={closeDeletePlayer} /> : null}
            {modalPlayer ? <ModalAddPlayerEvent openModal={modalPlayer} closeModal={closeModalPlayer} /> : null}
            {saveEvent ? <SaveEventUpdateDialog openDialog={saveEvent} closeDialog={closeSaveEvent} idEvent={event.idEvent} /> : null}
        </>
    )
}
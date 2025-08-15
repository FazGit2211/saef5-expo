import { useContext, useState } from "react";
import { Button, Card, List, Text, TextInput } from "react-native-paper";
import EventContext from "../../contexts/EventContext";
import PlayerContext from "../../contexts/PlayerContext";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import useApi from "../../hooks/useApi";
import useAlert from "../../hooks/useAlert";

export default function CardInfoEvent() {
    //Utilizar propiedades y métodos del contexto
    const { event, stadium } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    //Estado para almacenar el codigo temporalmente
    const [codigo, setCodigo] = useState("");
    //Utilizar uri y el hook para enviar hacia una api
    const uri = "http://localhost:5000/api/event/";
    const { postEvent, loading, error } = useApi(uri);
    //Utilizar el hook para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Método para enviar y guardar el evento
    const handleSaveEvent = () => {
        if ((players.length > 0) && (event.date !== "") && (stadium.name) && (codigo !== "")) {
            postEvent({ codigo: codigo, date: event.date, stadium: stadium, players: players });
            handleShowAlert();
            handleSetTimeOut();
        };
    };
    return (
        <Card>
            {players.length > 0 ? <List.Accordion title="Jugadores">{players.map((elem) => (<List.Item key={elem.name} title={elem.name} />))}</List.Accordion> : <Text>No hay jugadores agregados </Text>}
            {event.date !== "" ? <Text>{event.date}</Text> : <Text>No hay fecha aún seleccionada</Text>}
            {stadium.name !== "" ? <Text>{stadium.name} {stadium.address}</Text> : <Text>No hay estadio aún seleccionado </Text>}
            <TextInput label="Codigo, alías para el evento" mode="outlined" onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setCodigo(e.nativeEvent.text)}></TextInput>
            <Button mode="contained" onPress={handleSaveEvent}>Confirmar e enviar evento</Button>
            {alert && loading ? <Text>Enviando ...</Text> : null}
            {!loading && error.errorValue ? <Text>Error {error.message}</Text> : null}
            {alert && !loading && !error.errorValue ? <Text>Enviado correctamente</Text> : null}
        </Card>
    )
}
import { useContext, useEffect } from "react";
import useApi from "../../hooks/useApi";
import EventContext from "../../contexts/EventContext";
import PlayerContext from "../../contexts/PlayerContext";
import { useRouter } from "expo-router";
import useDialog from "../../hooks/useDialog";
import { Button, List, Text } from "react-native-paper";
import DeleteEventDialog from "../dialogs/DeleteEventDialog";

interface PropsType {
    codigoParams: string | string[] | undefined
}
export default function ListDataEvent({ codigoParams }: PropsType) {
    //url para poder realizar la petición hacia la api
    const url = "http://localhost:5000/api/event";
    //propiedades del hook personalizado con información del estado de la petición
    const { loading, error, getEventByCodigo, data } = useApi(url);
    //propiedades e método de los contextos
    const { addEvent, addStadium } = useContext(EventContext);
    const { players } = useContext(PlayerContext);
    //router para re direccionar a otra página
    const router = useRouter();
    //propiedades e métodos para los dialogos de confirmacion
    const { deleteEvent, openDeleteEvent, closeDeleteEvent } = useDialog();
    //invocación del método useEffect para buscar e obtener el evento
    /*useEffect(() => {
        if (codigoParams !== undefined) {
            getEventByCodigo(codigoParams.toString());
        };
    }, [url]);*/

    //método para cargar datos al contexto
    const addDataContextEvent = () => {
        data.forEach((elem) => {
            addEvent({ codigo: elem.codigo, date: elem.date });
            elem.Players.forEach((player) => (players.push(player)));
            addStadium({ name: elem.Stadium.name, address: elem.Stadium.address });
        });
    }
    //método para re direccionar
    const handleClickRedirect = async () => {
        if (data.length > 0) {
            addDataContextEvent();
            router.push('/event/event-update');
        };
    };

    //método para abrir el dialogo de eliminar evento
    const handleDeleteEvent = () => {
        openDeleteEvent();
    }
    return (
        <>
            {loading ? <Text>Cargando ...</Text> : null}
            {error.errorValue ? <Text>{error.message}</Text> : null}
            {data && data.length > 0 ? (<List.Accordion title="Evento">{data.map((elem) => (<List.Item key={elem.codigo} title={`Codigo:${elem.codigo} Fecha: ${elem.date} Estadio: ${elem.Stadium.name} Dirección: ${elem.Stadium.address}`}/>))}</List.Accordion>) : <Text>No hay datos</Text>}
            <Text>Participantes</Text>
            {data && data.length > 0 ? <List.Accordion title="Jugadores">{data.map((elem) => (elem.Players.map((player) => (<List.Item key={player.name} title={`${player.name} ${player.state}`}/>))))}</List.Accordion> : <Text>No hay jugadores</Text>}
            <Button mode="contained" onPress={handleDeleteEvent}>Eliminar</Button>
            {deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} code={codigoParams} closeDialog={closeDeleteEvent} /> : null}
            <Button mode="contained" onPress={handleClickRedirect}>Actualizar</Button>
        </>
    )
}
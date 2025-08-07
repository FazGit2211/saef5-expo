import { useContext, useEffect } from "react";
import useApi from "../../hooks/useApi";
import EventContext from "../../contexts/EventContext";
import PlayerContext from "../../contexts/PlayerContext";
import { useRouter } from "expo-router";
import useDialog from "../../hooks/useDialog";
import { Button, Text } from "react-native-paper";

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
    useEffect(() => {
        if (codigoParams !== undefined) {
            getEventByCodigo(codigoParams.toString());
        };
    }, [url]);

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
            {/*loading ? <Alert variant="filled" severity="info">Cargando ...</Alert> : null*/}
            {/*error.errorValue ? <Alert variant="filled" severity="warning">{error.message}</Alert> : null*/}
            {/*data && data.length > 0 ? (<List>{data.map((elem) => (<ListItem key={elem.codigo}><Typography>Codigo: {elem.codigo} , Fecha: {elem.date} , Estadio : {elem.Stadium.name}</Typography> <Typography>Dirección : {elem.Stadium.address} </Typography></ListItem>))}</List>) : <h3>No hay datos</h3>*/}
            <Text>Participantes</Text>
            {/*data && data.length > 0 ? <List>{data.map((elem) => (elem.Players.map((player, index) => (<ListItem key={player.name}><People />{player.name} {player.state}</ListItem>))))}</List> : <h3>No hay jugadores</h3>*/}
            <Button mode="contained" onPress={handleDeleteEvent}>Eliminar</Button>
            {/*deleteEvent ? <DeleteEventDialog openDialog={deleteEvent} code={codigoParams} closeDialog={closeDeleteEvent} /> : null*/}
            <Button mode="contained" onPress={handleClickRedirect}>Actualizar</Button>
        </>
    )
}
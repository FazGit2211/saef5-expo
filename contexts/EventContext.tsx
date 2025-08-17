import { createContext, ReactNode, useState } from "react"
import { PlayerType } from "./PlayerContext";

export interface StadiumType {
    idStadium: number
    name: string,
    address: string
};

export interface EventType {
    idEvent: number,
    codigo: string,
    date: string,
};

interface ContextType {
    event: EventType,
    stadium: StadiumType,
    players: PlayerType[],
    addEvent: (even: EventType) => void,
    addStadium: (stadium: StadiumType) => void,
    addPlayers: (player: PlayerType[]) => void,
    removeEvent: () => void
};

interface ProviderType {
    children: ReactNode
};

const defaultValues: ContextType = {
    event: { idEvent: 0, codigo: "", date: "" },
    stadium: { idStadium: 0, name: "", address: "" },
    players: [],
    addEvent: () => { },
    addStadium: () => { },
    addPlayers: () => { },
    removeEvent: () => { }
};

const EventContext = createContext(defaultValues);
const EventProvider = ({ children }: ProviderType) => {
    const [event, setEvent] = useState<EventType>({ idEvent: 0, codigo: "", date: "" });
    const [stadium, setStadium] = useState<StadiumType>({ idStadium: 0, name: "", address: "" });
    const [players, setPlayers] = useState<PlayerType[]>([]);

    const addEvent = (eventData: EventType) => {
        setEvent(eventData);
    };

    const addStadium = (stadiumData: StadiumType) => {
        setStadium(stadiumData);
    };

    const addPlayers = (playerData: PlayerType[]) => {
        setPlayers(playerData);
    };

    const removeEvent = () => {
        setEvent({ idEvent: 0, codigo: "", date: "" });
        setStadium({ idStadium: 0, name: "", address: "" });
        setPlayers([]);
    };

    const data = { event, stadium, players, addEvent, addStadium, addPlayers, removeEvent };
    return <EventContext.Provider value={data}>{children}</EventContext.Provider>
}

export { EventProvider }
export default EventContext;

import { useState } from "react";
import { PlayerType, StadiumType } from "../contexts/EventContext";

interface EventGetType {
    codigo: string,
    date: string,
    Stadium: StadiumType,
    Players: PlayerType[]
};
interface EventType {
    codigo: string,
    date: string,
    stadium: StadiumType,
    players: PlayerType[]
}

interface ErrorType {
    errorValue: boolean,
    message: string
};

const useDefaulValues: EventGetType[] = [{ codigo: "", date: "", Stadium: { name: "", address: "" }, Players: [{ name: "", surname: "", phoneNumber: 0, email: "", state: "" }] }];
const useApi = (url: string) => {

    const [data, setData] = useState(useDefaulValues);
    const [error, setError] = useState<ErrorType>({ errorValue: false, message: "" });
    const [loading, setLoading] = useState(false);

    const postEvent = async ({ codigo, date, stadium, players }: EventType) => {
        const dataValues = {
            codigo, date, stadium, players
        };

        const options: RequestInit = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataValues)
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                setLoading(true);
                setError({ errorValue: false, message: "Enviado correctamente." })
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        };
    };

    const getEventByCodigo = async (codigo: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${url}/?codigo=${codigo}`);
            if (response.ok) {
                const dataValues: EventGetType[] = await response.json();
                setData(dataValues);
                setError({ errorValue: false, message: "Ok." });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    const putEvent = async (codigoEvent: string, { codigo, date, stadium, players }: EventType) => {
        const dataValues = {
            codigo, date, stadium, players
        };

        const options: RequestInit = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dataValues)
        };

        try {
            const response = await fetch(`${url}/?codigo=${codigoEvent}`, options);
            if (response.ok) {
                setLoading(true);
                setError({ errorValue: false, message: "Actualizado correctamente." });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (codigo: string) => {
        const options: RequestInit = {
            method: "DELETE",
            headers: { "content-type": "application/json" },
        };

        try {
            setLoading(true);
            const request = await fetch(`${url}/?id=${codigo}`, options);
            if (!request.ok) {
                setError({ errorValue: false, message: "Eliminado correctamente" });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError({ errorValue: true, message: error.message });
            }
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, postEvent, getEventByCodigo, putEvent, deleteEvent }
}
export default useApi;
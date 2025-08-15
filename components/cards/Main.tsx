import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Main() {
    //Estado para almacenar el codigo para poder buscar el evento
    const [code, setCode] = useState("");
    //Utilizar la función de expo router para cambiar de pantalla
    const router = useRouter();

    const handleChangeCodigo = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCode(e.nativeEvent.text);
    }

    const handleEventNew = () => {
        router.push("/event/event-new");
    };

    const handleSearch = () => {
        if (code.trim() !== "") {
            router.push(`/event/event-find/[${code}]`);
        };
    }
    return (
        <>
            <Button mode="contained" icon="file-plus" onPress={handleEventNew}>Nuevo evento</Button>
            <TextInput label="Nombre,codigo o alias evento" mode="outlined" value={code} onChange={handleChangeCodigo}></TextInput>
            <Button mode="contained" icon="card-search" onPress={handleSearch}>Buscar</Button>
        </>
    )
}
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Main() {
    //Estado para almacenar el codigo para poder buscar el evento
    const [codigo, setCodigo] = useState("");
    //Utilizar la función de expo router para cambiar de pantalla
    const router = useRouter();

    const handleChangeCodigo = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCodigo(e.nativeEvent.text);
    }

    const handleEventNew = () => {
        router.push("/event/event-new");
    };

    const handleSearch = () => {
        console.log("Btn Search");
    }
    return (
        <>
            <Button mode="contained" icon="file-plus" onPress={handleEventNew}>Nuevo evento</Button>
            <TextInput label="Nombre,codigo o alias evento" mode="outlined" value={codigo} onChange={handleChangeCodigo}></TextInput>
            <Button mode="contained" icon="card-search" onPress={handleSearch}>Buscar</Button>
        </>
    )
}
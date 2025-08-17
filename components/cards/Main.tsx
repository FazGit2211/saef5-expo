import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Main() {
    const [code, setCode] = useState("");
    const router = useRouter();
    const handleChangeCodigo = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setCode(e.nativeEvent.text);
    };
    const handleEventNew = () => {
        router.push("/event/event-new");
    };
    const handleSearch = () => {
        if (code.trim() !== "") {
            router.push(`/event/event-find/[${code}]`);
        };
    };
    return (
        <View>
            <Button mode="contained" icon="file-plus" onPress={handleEventNew}><Text>Nuevo evento</Text></Button>
            <TextInput label="Nombre,codigo o alias evento" mode="outlined" value={code} onChange={handleChangeCodigo}></TextInput>
            <Button mode="contained" icon="card-search" onPress={handleSearch}><Text>Buscar</Text></Button>
        </View>
    )
}
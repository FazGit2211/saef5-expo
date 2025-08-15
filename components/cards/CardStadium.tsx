import { useContext, useState } from "react";
import EventContext, { StadiumType } from "../../contexts/EventContext";
import useAlert from "../../hooks/useAlert";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function CardStadium({ name, address }: StadiumType) {
    //utilizar el hook personalizado para los alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //estados para actualizar
    const [nameUpdate, setNameUpdate] = useState(name);
    const [addressUpdate, setAddressUpdate] = useState(address);
    //contexto para actualizar
    const { addStadium } = useContext(EventContext);

    const handleSaveUpdate = () => {
        handleShowAlert();
        addStadium({ name: nameUpdate, address: addressUpdate });
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <TextInput label="Nombre" mode="outlined" value={nameUpdate} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setNameUpdate(e.nativeEvent.text)} />
                <TextInput label="Dirección" mode="outlined" value={addressUpdate} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setAddressUpdate(e.nativeEvent.text)} />
                <Button mode="contained" onPress={handleSaveUpdate}>Guardar</Button>
                {alert ? <Text>Agregado Correctamente</Text> : null}
            </Card>
        </>
    );
}
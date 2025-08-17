import { useContext, useState } from "react";
import EventContext from "../../contexts/EventContext";
import useAlert from "../../hooks/useAlert";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function CardStadium() {
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const { stadium } = useContext(EventContext);
    const [nameUpdate, setNameUpdate] = useState(stadium.name);
    const [addressUpdate, setAddressUpdate] = useState(stadium.address);
    const { addStadium } = useContext(EventContext);

    const handleSaveUpdate = () => {
        handleShowAlert();
        addStadium({ idStadium: 0, name: nameUpdate, address: addressUpdate });
        handleSetTimeOut();
    }
    return (
        <>
            <Card>
                <TextInput label="Nombre" mode="outlined" value={nameUpdate} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setNameUpdate(e.nativeEvent.text)} />
                <TextInput label="Dirección" mode="outlined" value={addressUpdate} onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setAddressUpdate(e.nativeEvent.text)} />
                <Button mode="contained" onPress={handleSaveUpdate}><Text>Guardar</Text></Button>
                {alert ? <Text>Agregado Correctamente</Text> : null}
            </Card>
        </>
    );
}
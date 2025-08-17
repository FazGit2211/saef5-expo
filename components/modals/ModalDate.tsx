import { useContext, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Button, Modal, Portal, TextInput, Text } from "react-native-paper";
import EventContext from "../../contexts/EventContext";
import { PropsType } from "./ModalCreatePlayer";
import useAlert from "../../hooks/useAlert";

export default function ModalDate({ openModal, closeModal }: PropsType) {
    //Estado para almacenar fecha actual del evento
    const [date, setDate] = useState("");
    //Utilizar propiedades e métodos del contexto
    const { addEvent } = useContext(EventContext);
    //Llamr al hook alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const handleChangeDate = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDate(e.nativeEvent.text);
    };

    const handleSaveDate = () => {
        addEvent({ codigo: "", date: date });
        handleShowAlert();
        handleSetTimeOut();
        setDate("");
    };
    return (
        <Portal>
            <Modal visible={openModal}>
                <TextInput label="Fecha" mode="outlined" value={date} onChange={handleChangeDate}></TextInput>
                <Button mode="contained" onPress={handleSaveDate}><Text>Guardar</Text></Button>
                {alert ? <Text>Agregado Correctamente</Text> : null}
                <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
            </Modal>
        </Portal>
    )
}
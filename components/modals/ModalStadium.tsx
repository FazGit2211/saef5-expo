import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";
import EventContext, { StadiumType } from "../../contexts/EventContext";
import { useContext, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { PropsType } from "./ModalCreatePlayer";

export default function ModalStadium({ openModal, closeModal }: PropsType) {
    //Utilizar propiedades e métodos del contexto
    const { stadium, addStadium } = useContext(EventContext);
    //Inicializar form con valores en las props
    const [form, setForm] = useState<StadiumType>({ name: stadium.name, address: stadium.address });
    //Manejar el estado para los alert de mensajes
    const [sendForm, setSendForm] = useState(false);

    const handleChangeName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, name: e.nativeEvent.text
        })
    };

    const handleChangeAddress = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, address: e.nativeEvent.text
        })
    };

    const handleSaveBtn = () => {
        addStadium(form);
        setForm({ name: "", address: "" });
        setSendForm(true);
        setTimeout(() => {
            setSendForm(false);
        }, 3000);
    };

    return (
        <Portal>
            <Modal visible={openModal}>
                <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} />
                <TextInput label="Direccion" mode="outlined" value={form.address} onChange={handleChangeAddress} />
                <Button mode="contained" onPress={handleSaveBtn}><Text>Guardar</Text></Button>
                <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
                {sendForm ? <Text>Agregado Correctamente</Text> : null}
            </Modal>
        </Portal>
    )
}
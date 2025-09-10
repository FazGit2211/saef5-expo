import { Button, Checkbox, Modal, Portal, Text, TextInput } from "react-native-paper";
import { PropsType } from "./ModalCreatePlayer";
import useForm from "../../hooks/useForm";
import { useContext, useState } from "react";
import useApiPlayer from "../../hooks/useApiPlayer";
import EventContext from "../../contexts/EventContext";
import PlayerContext from "../../contexts/PlayerContext";

export default function ModalAddPlayerEvent({ openModal, closeModal }: PropsType) {
    //Utilizar las propiedades e métodos del contexto
    const { event } = useContext(EventContext);
    const { addPlayer } = useContext(PlayerContext);
    const initialForm = { id: 0, name: "", surname: "", phoneNumber: 0, email: "", state: "", admin: "" };
    const { form, errorInfo, setForm, handleChangeName, handleBlurName, handleChangeEmail } = useForm({ initialForm });
    const [checked, setChecked] = useState(true);
    const url = "https://saf5-api.onrender.com/api/player";
    const { loadingPlayer, errorPlayer, postPlayer } = useApiPlayer(url);
    const handleSubmit = () => {
        if (!errorInfo.errorInfo) {
            postPlayer(event.idEvent, { id: 0, name: form.name, email: form.email, state: "", admin: form.admin });
        };
        if (errorPlayer.errorPlayer == false) {
            addPlayer({ id: 0, name: form.name, email: form.email, state: "", admin: form.admin });
            setForm({ id: 0, name: "", email: "", state: "", admin: "" });
        };
    }
    return (
        <>
            <Portal>
                <Modal visible={openModal}>
                    <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorInfo}></TextInput>
                    <TextInput label="Email (opcional)" mode="outlined" value={form.email} onChange={handleChangeEmail}></TextInput>
                    <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)}></Checkbox>
                    <Button mode="contained" onPress={handleSubmit} icon="save">+</Button>
                    {loadingPlayer ? <Text>Agregando...</Text> : null}
                    {!loadingPlayer && errorPlayer.errorPlayer ? <Text>{errorPlayer.message}</Text> : null}
                    {!loadingPlayer && !errorPlayer.errorPlayer ? <Text>Agregado correctamente.</Text> : null}
                    <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
                </Modal>
            </Portal>
        </>
    );
}
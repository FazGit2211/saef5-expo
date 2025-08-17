import { useContext } from "react";
import useAlert from "../../hooks/useAlert";
import useApiPlayer from "../../hooks/useApiPlayer";
import { PropsEditType } from "./ModalEditPlayer";
import PlayerContext from "../../contexts/PlayerContext";
import useForm from "../../hooks/useForm";
import { Modal, Portal, TextInput, Text, Button } from "react-native-paper";

export default function ModalEditPlayerEvent({ openModal, closeModal, dataEdit, indexPlayer }: PropsEditType) {
    const initialForm = { id: 0, name: dataEdit.name, email: dataEdit.email, state: dataEdit.state, admin: dataEdit.admin }
    const { form, errorInfo, setForm, handleChangeName, handleChangeEmail, handleBlurName, handleChangeState } = useForm({ initialForm });
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const url = "http://localhost:5000/api/player";
    const { loadingPlayer, errorPlayer, putPlayer } = useApiPlayer(url);
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        if (dataEdit.id !== undefined) {
            putPlayer({ id: dataEdit.id, name: form.name, email: form.email, state: form.state, admin: form.admin });
        };
        if (!errorPlayer) {
            players.splice(indexPlayer, 1, form);
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", email: "", state: "", admin: "" });
        };
    }
    return (
        <Portal>
            <Modal visible={openModal}>
                <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} />
                <TextInput label="Email" mode="outlined" value={form.email} onChange={handleChangeEmail} />
                <TextInput label="Estado" mode="outlined" value={form.state} onChange={handleChangeState} />
                <Text>Administrador para el evento:</Text>
                <Button mode="contained" onPress={handleSubmit}><Text>Enviar</Text></Button>
                {loadingPlayer ? <Text>Actualizando ...</Text> : null}
                {(!loadingPlayer && errorPlayer) ? <Text>{errorPlayer.message}</Text> : null}
                {(alert && !loadingPlayer && !errorPlayer) ? <Text>Agregado Correctamente</Text> : null}
                <Button mode="contained" onPress={closeModal}><Text>Cerrar</Text></Button>
            </Modal>
        </Portal>
    )
}
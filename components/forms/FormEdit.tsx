import { useContext } from "react";
import useAlert from "../../hooks/useAlert";
import PlayerContext, { PlayerType } from "../../contexts/PlayerContext";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import useForm from "../../hooks/useForm";

interface PropsType {
    playerEdit: PlayerType,
    indexPlayerEdit: number
};

export default function FormEdit({ playerEdit, indexPlayerEdit }: PropsType) {
    //Inicializar form con los valores segun el jugador a editar
    const initialForm = { id: playerEdit.id, name: playerEdit.name, phoneNumber: playerEdit.phoneNumber, email: playerEdit.email, state: playerEdit.state, admin: playerEdit.admin }
    //propiedades e métodos para el hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleChangePhoneNumber, handleChangeEmail, handleBlurName, handleChangeState } = useForm({ initialForm });
    //llamar a los alert del hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        players.splice(indexPlayerEdit, 1, form);
        handleShowAlert();
        handleSetTimeOut();
        setForm({ id: 0, name: "", phoneNumber: 0, email: "", state: "", admin: "" });
    };
    return (
        <>
            <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={error.errorValue} />
            <HelperText type="error" visible={error.errorValue}>{error.name}</HelperText>
            <TextInput label="Telefono" mode="outlined" value={form.phoneNumber.toString()} onChange={handleChangePhoneNumber} error={error.errorValue} />
            <TextInput label="Email" mode="outlined" value={form.email} onChange={handleChangeEmail} error={error.errorValue} />
            <TextInput label="Estado" mode="outlined" value={form.state} onChange={handleChangeState} error={error.errorValue} />
            <Button mode="contained" onPress={handleSubmit}><Text>Enviar</Text></Button>
            {alert ? <Text>Agregado Correctamente</Text> : null}
        </>
    )
}
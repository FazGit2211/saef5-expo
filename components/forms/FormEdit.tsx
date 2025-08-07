import { useContext } from "react";
import { PlayerType } from "../../contexts/EventContext";
import useAlert from "../../hooks/useAlert";
import PlayerContext from "../../contexts/PlayerContext";
import { Button, TextInput } from "react-native-paper";
import useForm from "../../hooks/useForm";

interface PropsType {
    playerEdit: PlayerType,
    indexPlayerEdit: number
};

export default function FormEdit({ playerEdit, indexPlayerEdit }: PropsType) {
    //Inicializar form con los valores segun el jugador a editar
    const initialForm = { name: playerEdit.name, surname: playerEdit.surname, phoneNumber: playerEdit.phoneNumber, email: playerEdit.email, state: playerEdit.state }
    //propiedades e métodos para el hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail, handleBlurName, handleChangeState } = useForm({ initialForm });
    //llamar a los alert del hook personalizado
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    //Llamar al listado actual
    const { players } = useContext(PlayerContext);

    const handleSubmit = () => {
        players.splice(indexPlayerEdit, 1, form);
        handleShowAlert();
        handleSetTimeOut();
        setForm({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
    }

    return (
        <>
            <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={error.errorValue} /*helperText={error.name} */ />
            <TextInput label="Apellido" mode="outlined" value={form.surname} onChange={handleChangeSurname} error={error.errorValue} /*helperText={error.surname}*/ />
            <TextInput label="Telefono" mode="outlined" value={form.phoneNumber.toString()} onChange={handleChangePhoneNumber} error={error.errorValue} /*helperText={error.phoneNumber}*/ />
            <TextInput label="Email" mode="outlined" value={form.email} onChange={handleChangeEmail} error={error.errorValue} /*helperText={error.email} */ />
            <TextInput label="Estado" mode="outlined" value={form.state} onChange={handleChangeState} error={error.errorValue} /*helperText={error.state} */ />
            <Button mode="contained" onPress={handleSubmit}>ENVIAR</Button>
            {/*alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null*/}
        </>
    )
}
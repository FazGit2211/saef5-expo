import { Button, TextInput } from "react-native-paper";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import PlayerContext from "../../contexts/PlayerContext";

const initialForm = { name: "", surname: "", phoneNumber: 0, email: "", state: "" };

export default function FormCreate() {
    //Llamar al contexto
    const { addPlayer } = useContext(PlayerContext);
    //Llamar al hook personalizado del formulario
    const { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail } = useForm({ initialForm });
    //Llamr al hook alert
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const handleSubmit = () => {
        if (!error.errorValue) {
            addPlayer({ name: form.name, surname: form.surname, phoneNumber: form.phoneNumber, email: form.email, state: "" });
            handleShowAlert();
            handleSetTimeOut();
            setForm({ name: "", surname: "", phoneNumber: 0, email: "", state: "" });
        }

    };

    return (
        <>
            <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName}></TextInput>
            <TextInput label="Apellido (opcional)" mode="outlined" value={form.surname} onChange={handleChangeSurname}></TextInput>
            <TextInput label="Nº teléfono (opcional)" mode="outlined" value={form.phoneNumber.toString()} onChange={handleChangePhoneNumber}></TextInput>
            <TextInput label="Email (opcional)" mode="outlined" value={form.email} onChange={handleChangeEmail}></TextInput>
            <Button mode="contained" onPress={handleSubmit}>ENVIAR</Button>
            {/*alert ? <Alert variant="filled" severity="success">Agregado Correctamente</Alert> : null*/}
        </>
    );
}
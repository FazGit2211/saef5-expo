import { Button, Checkbox, HelperText, Text, TextInput } from "react-native-paper";
import useAlert from "../../hooks/useAlert";
import useForm from "../../hooks/useForm";
import { useContext, useState } from "react";
import PlayerContext from "../../contexts/PlayerContext";

const initialForm = { id: 0, name: "", surname: "", phoneNumber: 0, email: "", state: "", admin: "" };

export default function FormCreate() {
    const { addPlayer } = useContext(PlayerContext);
    const { form,errorInfo ,setForm, handleChangeName, handleBlurName, handleChangeEmail } = useForm({ initialForm });
    const { alert, handleShowAlert, handleSetTimeOut } = useAlert();
    const [checked, setChecked] = useState(true);
    const handleSubmit = () => {
        if (!errorInfo.errorInfo) {
            addPlayer({ id: 0, name: form.name, email: form.email, state: "", admin: "" });
            handleShowAlert();
            handleSetTimeOut();
            setForm({ id: 0, name: "", email: "", state: "", admin: "" });
        }
    };

    return (
        <>
            <TextInput label="Nombre" mode="outlined" value={form.name} onChange={handleChangeName} onBlur={handleBlurName} error={errorInfo.errorInfo}></TextInput>
            <HelperText type="error" visible={errorInfo.errorInfo}>{errorInfo.name}</HelperText>            
            <TextInput label="Email (opcional)" mode="outlined" value={form.email} onChange={handleChangeEmail}></TextInput>
            <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)}></Checkbox>
            <Button mode="contained" onPress={handleSubmit}><Text>Enviar</Text></Button>
            {alert ? <Text>Agregado Correctamente</Text> : null}
        </>
    );
}
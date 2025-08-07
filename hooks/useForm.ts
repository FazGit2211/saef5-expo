import { useState } from "react";
import { PlayerType } from "../contexts/EventContext";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface ErrorType {
    errorValue: boolean,
    name: string,
    surname: string,
    phoneNumber: string,
    email: string;
    state: string
}

interface FormType {
    initialForm: PlayerType
};
const useForm = ({ initialForm }: FormType) => {
    //Inicializar form con valores vacios
    const [form, setForm] = useState<PlayerType>(initialForm);
    //Estado para obtener los errores
    const [error, setError] = useState<ErrorType>({ errorValue: false, name: "", surname: "", phoneNumber: "", email: "", state: "" });
    //Expreciones regulares
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    //Funciones para detectar el ingreso de datos en los inputs
    const handleChangeName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, name: e.nativeEvent.text
        })
    };

    const handleBlurName = () => {
        if ((!form.name.trim()) || (!regexName.test(form.name.trim()))) {
            setError({
                ...error, errorValue: true, name: "El nombre no puede estar vacio"
            })
        } else {
            setError({ ...error, errorValue: false, name: "" })
        };
    };

    const handleChangeSurname = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, surname: e.nativeEvent.text
        })
    };

    const handleChangePhoneNumber = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, phoneNumber: parseInt(e.nativeEvent.text)
        })
    };

    const handleChangeEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, email: e.nativeEvent.text
        })
    };

    const handleChangeState = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({ ...form, state: e.nativeEvent.text })
    };

    return { form, error, setForm, handleChangeName, handleBlurName, handleChangeSurname, handleChangePhoneNumber, handleChangeEmail, handleChangeState }
}
export default useForm;
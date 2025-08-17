import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { PlayerType } from "../contexts/PlayerContext";

interface ErrorType {
    errorInfo: boolean,
    name: string,
}

interface FormType {
    initialForm: PlayerType
};
const useForm = ({ initialForm }: FormType) => {
    const [form, setForm] = useState<PlayerType>(initialForm);
    const [errorInfo, setErrorInfo] = useState<ErrorType>({ errorInfo: false, name: "" });
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    //Funciones para detectar el ingreso de datos en los inputs
    const handleChangeName = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, name: e.nativeEvent.text
        })
    };

    const handleBlurName = () => {
        if (!form.name || !regexName.test(form.name)) {
            setErrorInfo({
                ...errorInfo, errorInfo: true, name: "El nombre no puede estar vacio"
            });
        } else {
            setErrorInfo({ ...errorInfo, errorInfo: false, name: "" })
        };
    };

    const handleChangeEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({
            ...form, email: e.nativeEvent.text
        })
    };

    const handleChangeState = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setForm({ ...form, state: e.nativeEvent.text })
    };

    return { form, errorInfo, setForm, handleChangeName, handleBlurName, handleChangeEmail, handleChangeState }
}
export default useForm;
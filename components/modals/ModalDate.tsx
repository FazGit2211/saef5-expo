import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
interface PropsType {
    show: boolean,
    hideModal: () => void
}
export default function ModalDate({ show, hideModal }: PropsType) {
    //Estado para almacenar fecha actual del evento
    const [date, setDate] = useState("");
    const handleChangeDate = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDate(e.nativeEvent.text);
    }
    return (
        <Portal>
            <Modal visible={show}>
                <TextInput label="Fecha" mode="outlined" value={date} onChange={handleChangeDate}></TextInput>
                <Button mode="contained" icon="cross" onPress={hideModal}>Close</Button>
            </Modal>
        </Portal>
    )
}
import { useLocalSearchParams } from "expo-router"
import ListDataEvent from "../../../components/lists/ListEvent";

export default function EventFind() {
    //Utilizar el hook uselocal search para,s para obtener el codigo por parámetro
    const { codigo } = useLocalSearchParams();
    return (
        <>
            <ListDataEvent codigoParams={codigo} />
        </>
    )
}
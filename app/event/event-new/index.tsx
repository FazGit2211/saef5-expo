import { View } from "react-native";
import CardNewEvent from "../../../components/cards/CardEventNew";
import CardInfoEvent from "../../../components/cards/CardInfoEvent";
export default function EventNew() {
    return (
        <View>
            <CardNewEvent />
            <CardInfoEvent />
        </View>
    )
}
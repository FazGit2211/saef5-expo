import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { PlayerProvider } from "../contexts/PlayerContext";
import { EventProvider } from "../contexts/EventContext";
export default function Layout() {
    return (
        <PaperProvider>
            <EventProvider>
                <PlayerProvider>
                    <View className="flex bg-black">
                        <Slot />
                    </View>
                </PlayerProvider>
            </EventProvider>
        </PaperProvider>
    )
}
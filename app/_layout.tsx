import { Slot } from "expo-router";
import { View } from "react-native";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { PlayerProvider } from "../contexts/PlayerContext";
import { EventProvider } from "../contexts/EventContext";
import { StatusBar } from "expo-status-bar";
export default function Layout() {
    return (
        <EventProvider>
            <PlayerProvider>
                <PaperProvider>
                    <View className="flex bg-black">
                        <StatusBar style="auto"/>
                        <Slot />
                    </View>
                </PaperProvider>
            </PlayerProvider>
        </EventProvider>
    )
}
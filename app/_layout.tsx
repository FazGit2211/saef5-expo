import { Slot } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { PlayerProvider } from "../contexts/PlayerContext";
import { EventProvider } from "../contexts/EventContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../components/appBars/AppBar";
export default function Layout() {
    return (
        <EventProvider>
            <PlayerProvider>
                <PaperProvider>
                    <SafeAreaView className="flex min-h-screen bg-black">
                        <StatusBar style="auto"/>
                        <AppBar/>
                        <Slot />
                    </SafeAreaView>
                </PaperProvider>
            </PlayerProvider>
        </EventProvider>
    )
}
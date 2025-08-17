import { useRouter } from "expo-router";
import { Appbar } from "react-native-paper";

export default function AppBar() {
    const router = useRouter();
    const handlePressBtnHome = () => {
        router.push("/");
    }
    return (
        <Appbar.Header>
            <Appbar.Action icon="home" onPress={handlePressBtnHome}></Appbar.Action>
            <Appbar.Action icon="account"></Appbar.Action>
        </Appbar.Header>
    )
}
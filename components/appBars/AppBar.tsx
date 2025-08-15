import { Appbar } from "react-native-paper";

export default function AppBar() {
    const handlePressBtnHome = () => {
        console.log("Btn home");
    }
    return (
        <Appbar.Header>
            <Appbar.Action icon="home"></Appbar.Action>
            <Appbar.Action icon="account"></Appbar.Action>
        </Appbar.Header>
    )
}
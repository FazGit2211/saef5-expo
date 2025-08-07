import { Appbar } from "react-native-paper";

export default function AppBar() {
    const handlePressBtnHome = () => {
        console.log("Btn home");
    }
    return (
        <Appbar.Header>
            <Appbar.Action icon="account-user"></Appbar.Action>
        </Appbar.Header>
    )
}
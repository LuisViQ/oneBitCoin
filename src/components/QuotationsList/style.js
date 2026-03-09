import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    filters: {
        width: "100%",
        flexDirection: "row",
        paddingVertical: 15,
        justifyContent: "space-evenly"
    },
    buttonQuery: {
        width: 50,
        height: 30,
        backgroundColor: "#f50d41",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#f50d41"
    },
    buttonQueryActive: {
        backgroundColor: "#ffffff",
    },
    textButtonQuery: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    textButtonQueryActive: {
        color: "#f50d41",
    }
});

export default styles;

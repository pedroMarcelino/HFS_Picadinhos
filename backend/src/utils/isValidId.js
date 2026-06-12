import mongoose from "mongoose";

export function isValidId(id) {
    console.log("--validando ID : " + id + "...")
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("ID invalido");
        return false
    }
    console.log("ID valido");
    return true;
}
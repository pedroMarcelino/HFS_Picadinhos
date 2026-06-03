import mongoose from "mongoose";

export function isValidToken(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false
    }
    return true;
}
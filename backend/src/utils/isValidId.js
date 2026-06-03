import mongoose from "mongoose";

export function isValidId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false
    }
    return true;
}
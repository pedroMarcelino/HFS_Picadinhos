import { useState } from "react";
import api from "../../service/api.js";

export default function RegisterPage() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">Banner</div>

            <div className="w-full md:w-1/2">Formulário</div>
        </div>
    );
}

function Input({ label, error, className = "", ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    outline-none
                    transition-all
                    duration-200
                    ${
                        error
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                            : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    }
                    ${className}
                `}
            />

            {error && (
                <span className="mt-1 block text-sm text-red-500">{error}</span>
            )}
        </div>
    );
}

export default Input;

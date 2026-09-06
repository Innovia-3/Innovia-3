import { useState } from "react"

type InputProps = {
    label: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export default function Input({
    label,
    type = "text",
    value,
    placeholder,
    onChange
}: InputProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label>
                {label}
            </label>

            <input
                type={
                    type === "password" && showPassword
                    ? "text"
                    : type
                }
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
            />
            {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Dölj" : "Visa"}
                </button>
            )}
        </div>
    )
}
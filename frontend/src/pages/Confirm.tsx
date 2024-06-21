import { useSearchParams } from "react-router-dom";

export default function Confirm() {
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status") ? "Confirmado" : "Falhou";

    return (
        <div className="grid place-items-center h-full w-full">
            <h1>{status}</h1>
        </div>
    )
}
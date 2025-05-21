import React, {useState, type FormEvent} from "react";
import styles from "./CreateEventsPage.module.css"; // crieo o CSS como preferir
import NavBarComponent from "..//../components/NavBar/NavBarComponent";

export default function CreateEventsPage (){
    const [title, setTitle] = useState ("");
    const [description, setDescription] = useState ("");
    const [location, setLocation] = useState ("");
    const [prince, setPrince] = useState<number>(0);
    const [bannerFile, setBannerFile] = useState< File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<booLean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!bannerFile) {
            setError ("Você precisa escolher um arquivo de banner.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", Location);
        formData.append("price", String(prince));
        formData.append("banner", bannerFile);

        const token = localStorage.fetItem("token");
        if (!token) {
            setError("Usuário não autenticado.");
            return;
        }

        try {
            const res = await fetch(
                "https://senac-eventos-cultural-backend-production.up.railway.app/events",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || `Error ${res.status}`);
            }
            setSuccess(true);
            setTitle("");
            setDescription("");
            setPrince(0);
            setBannerFile(null);
            
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
        }
    };
    

    return {
        <>
        <NavBarComponent />
        <div>
            <h1> Criar Eventos </h1>
        </div>
        {error && <div>{erro}</div>}
        {seccess && (
            <div> Evento criado com secesso!</div>
        )}
        <form onSubmit= {handleSubmit}>
        
        </form>
        </div>
        </>

    };
}
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export function EditaServico() {

    const {register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    
    function onSubmit(data) {
        axios.put(`http://localhost:3001/servicos/${id}`, data)
        .then(response => {
            toast.success("Serviço editado.", { position: "bottom-right", duration: 2000 });
            navigate("/servicos");
        })
        .catch(error => {
            toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/servicos/${id}`)
        .then(response => {
        const { nome, preco } = response.data;
        reset({ nome, preco});
    })
    },[id, reset])

    return (
        <div className="container">
            <h1>Editar Serviço</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                    <Form.Label>Serviço</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O serviço é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."}})} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" step="0.01" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preço é obrigatório."})} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">Editar</Button>

            </Form>
        </div>
    )
}

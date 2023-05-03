import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaProduto() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

function onSubmit(data) {
    axios.put(`http://localhost:3001/produtos/${id}`, data)
    .then(response => {
        toast.success("Produto editado com sucesso", { position: "bottom-right", duration: 2000 })
        navigate("/produtos");
    })
    .catch(error => {
        toast.error("Aconteceu um erro", { position: "bottom-right", duration: 2000 });
        console.log(error);
    });
}

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/${id}`)
        .then(response => {
            const {nome, preco, descricao, desconto, dataDesconto, categoria} = response.data;
            reset({nome, preco, descricao, desconto, dataDesconto, categoria});
        })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Produto</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preço é obrigatório.", maxLength: { value: 10, message: "Limite de 10 caracteres."} })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição é obrigatória.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto</Form.Label>
                    <Form.Control type="number" className={errors.desconto && "is-invalid"} {...register("desconto", { required: "O desconto é obrigatório.", maxLength: { value: 10, message: "Limite de 10 caracteres."} })} />
                    {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data do desconto</Form.Label>
                    <Form.Control type="date" className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { required: "A data do desconto é obrigatória.", maxLength: { value: 10, message: "Limite de 10 caracteres."} })} />
                    {errors.dataDesconto && <Form.Text className="invalid-feedback">{errors.dataDesconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria do Produto:</Form.Label>
                    <Form.Control as="select" className={errors.categoria && "is-invalid"} {...register("categoria", { required: "A categoria do produto é obrigatória." })}>
                        <option value="">Selecione uma opção</option>
                        <option value="Higiene">Higiêne</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Conforto">Conforto</option>
                        <option value="Roupas">Roupas</option>
                    </Form.Control>
                    {errors.categoria && <Form.Text className="invalid-feedback">{errors.categoria.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Editar
                </Button>
            </Form>
        </div>
    )};
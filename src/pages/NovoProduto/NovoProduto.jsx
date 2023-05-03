import React from 'react';
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoProduto() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/produtos", data)
            .then(response => {
                toast.success("Produto adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/produtos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Produto</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Produto:</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome do produto é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço do Produto:</Form.Label>
                    <Form.Control type="number" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preço do produto é obrigatório.", min: { value: 0, message: "O preço deve ser maior ou igual a zero." } })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Desconto:</Form.Label>
                    <Form.Control type="number" className={errors.desconto && "is-invalid"} {...register("desconto", { required: "O desconto é obrigatório.", min: { value: 0, message: "O desconto deve ser maior ou igual a zero." }, max: { value: 100, message: "O desconto não pode ser maior que 100." } })} />
                    {errors.desconto && <Form.Text className="invalid-feedback">{errors.desconto.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data do Desconto:</Form.Label>
                    <Form.Control type="date" className={errors.dataDesconto && "is-invalid"} {...register("dataDesconto", { required: "A data de expiração do desconto é obrigatória." })} />
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

                <Form.Group className="mb-3">
                    <Form.Label>Descrição do Produto:</Form.Label>
                    <Form.Control as="textarea" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição do produto é obrigatória.", maxLength: { value: 500, message: "Limite de 500 caracteres." } })} />
                    {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}



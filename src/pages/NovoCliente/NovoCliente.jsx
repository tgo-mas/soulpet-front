import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export function NovoCliente() {

    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:3001/clientes", data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Cliente</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" {...register("nome")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" {...register("email")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="tel" {...register("telefone")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" {...register("endereco.cidade")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>UF</Form.Label>
                    <Form.Control type="text" {...register("endereco.uf")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" {...register("endereco.cep")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control type="text" {...register("endereco.rua")} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="text" {...register("endereco.numero")} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}
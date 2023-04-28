import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPet() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [clientes, setClientes] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/clientes`)
            .then(res => {
                const clientes = res.data.map(cliente => {
                    return { id: cliente.id, nome: cliente.nome }
                });
                setClientes(clientes);
            })
    }, [setClientes]);

    function onSubmit(data) {
        axios.post("http://localhost:3001/pets", data)
            .then(res => {
                toast.success("Pet criado com sucesso!");
                navigator("/pets");
            })
            .catch(err => {
                toast.error("Um erro aconteceu!");
            });
    }

    return (
        <div className="container">
            <h1 className="m-4">Cadastrar novo Pet</h1>
            <hr />
            <Form action="submit" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome do pet</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do pet"
                        className={errors.nome && "is-invalid"}
                        {...register("nome", { maxLength: 130, required: true })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="dono">
                    <Form.Label>Dono do pet</Form.Label>
                    <Form.Select
                        placeholder="Selecione o dono do pet"
                        className={errors.clienteId && "is-invalid"}
                        {...register("clienteId", { required: true })}>
                        {clientes.map(cli => <option value={cli.id} key={cli.id}>{cli.nome}</option>)}
                    </Form.Select>
                    {errors.clienteId && <Form.Text className="invalid-feedback">{errors.clienteId.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o tipo (espécie) do animal"
                        className={errors.tipo && "is-invalid"}
                        {...register("tipo", { maxLength: 100, required: true })} />
                    {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Porte</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o porte do animal"
                        className={errors.porte && "is-invalid"}
                        {...register("porte", { maxLength: 100, required: true })} />
                    {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        className={errors.dataNasc && "is-invalid"}
                        {...register("dataNasc")} />
                    {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
                </Form.Group>
                <Button type="submit" variant="primary">
                    Enviar
                </Button>
            </Form>
        </div>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


export function EditaPedido() {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3001/produtos").then((response) => {
            setProdutos(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/clientes").then((response) => {
            setClientes(response.data);
        });
    }, []);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
    const navigate = useNavigate();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pedidos",
    });

    function onSubmit(data) {
        const { pedidos } = data
        const pedidoData = pedidos.map(pedido => {
            const { quantidade, produto, cliente } = pedido;
            return { quantidade, produtoId: produto, clienteId: cliente }
        })

        axios.put(`http://localhost:3001/pedidos/${id}`, pedidoData)
            .then(response => {
                toast.success("Pedido adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pedidos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/pedidos/${id}`)
            .then(response => {
                const { codigo, quantidade, clienteId, produtoId } = response.data;
                reset({ codigo, quantidade, clienteId, produtoId });
            })
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Pedido</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <h4>Produto #{index + 1}</h4>
                        <Button variant="danger" onClick={() => remove(index)}>
                            Remover
                        </Button>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantidade</Form.Label>
                            <Form.Control type="number" className={errors?.pedidos?.[index]?.produto && "is-invalid"}
                                {...register(`pedidos.${index}.quantidade`, {
                                    required: {
                                        value: true,
                                        message: "Este campo é obrigatório.",
                                    },
                                    min: {
                                        value: 1,
                                        message: "A quantidade deve ser maior que zero.",
                                    },
                                })}
                            />
                            {errors.pedidos?.[index]?.quantidade?.type === "required" && (
                                <Form.Text className="invalid-feedback">
                                    {errors.pedidos[index].quantidade.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Produto</Form.Label>
                            <Form.Control as="select"
                                className={
                                    errors.pedidos?.[index]?.produto?.type === "required" &&
                                    "is-invalid"
                                }
                                {...register(`pedidos.${index}.produto`, {
                                    required: {
                                        value: true,
                                        message: "Este campo é obrigatório.",
                                    },
                                })}
                            >
                                <option value="">Selecione o produto</option>
                                {produtos.map((produto) => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.pedidos?.[index]?.produto?.type === "required" && (
                                <Form.Text className="invalid-feedback">
                                    {errors.pedidos[index].produto.message}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control as="select"
                                className={
                                    errors.pedidos?.[index]?.cliente?.type === "required" &&
                                    "is-invalid"
                                }
                                {...register(`pedidos.${index}.cliente`, {
                                    required: {
                                        value: true,
                                        message: "Este campo é obrigatório.",
                                    },
                                })}
                            >
                                <option value="">Selecione o cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </Form.Control>
                            {errors.pedidos?.[index]?.cliente?.type === "required" && (
                                <Form.Text className="invalid-feedback">
                                    {errors.pedidos[index].cliente.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </div>
                ))}
                <Button variant="primary" onClick={() => append({ quantidade: 0, produto: "", })}>
                    Adicionar um novo pedido
                </Button>
                <hr></hr>
                <Button variant="primary" type="submit">
                    Editar pedidos
                </Button>
            </Form>
        </div>
    );
}
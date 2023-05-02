import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function NovoPedido() {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
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

        axios.post("http://localhost:3001/pedidos", pedidoData)
            .then(response => {
                toast.success("Pedido adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pedidos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Novo Pedido</h1>
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
                            />
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
                            />
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
                    Cadastrar pedidos
                </Button>
            </Form>
        </div>
    );
}
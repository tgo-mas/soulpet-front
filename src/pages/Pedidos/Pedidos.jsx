import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";


export function Pedidos() {

    const [pedidos, setPedidos] = useState(null);
    const [clienteFiltro, setClienteFiltro] = useState("");
    const [produtoFiltro, setProdutoFiltro] = useState("");
    const [clienteNome, setClienteNome] = useState({});
    const [produtoNome, setProdutoNome] = useState({});

    useEffect(() => {
        initializeTable();
    }, []);

    const initializeTable = () => {
        axios
            .get("http://localhost:3001/pedidos")
            .then((response) => {
                setPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filtrarPedidos = (pedido) => {
        const cliente = clienteNome[pedido.clienteId] ? clienteNome[pedido.clienteId].toLowerCase() : '';
        const produto = produtoNome[pedido.produtoId] ? produtoNome[pedido.produtoId].toLowerCase() : '';
        return cliente.includes(clienteFiltro.toLowerCase()) &&
            produto.includes(produtoFiltro.toLowerCase());
    };

    const handleDeletarPedido = (id) => {
        const novosPedidos = pedidos.filter((pedido) => pedido.id !== id);
        setPedidos(novosPedidos);
    };

    useEffect(() => {
        if (pedidos && Object.keys(clienteNome).length !== pedidos.length && Object.keys(produtoNome).length !== pedidos.length) {
            const promises = [];
            pedidos.forEach((pedido) => {
                const nomeCliente = axios.get(`http://localhost:3001/clientes/${pedido.clienteId}`)
                    .then((response) => {
                        const cliente = response.data;
                        setClienteNome((nomeAnteriorCliente) => {
                            return { ...nomeAnteriorCliente, [pedido.clienteId]: cliente.nome };
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                const nomeProduto = axios.get(`http://localhost:3001/produtos/${pedido.produtoId}`)
                    .then((response) => {
                        const produto = response.data;
                        setProdutoNome((nomeAnteriorProduto) => {
                            return { ...nomeAnteriorProduto, [pedido.produtoId]: produto.nome };
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                promises.push(nomeCliente);
                promises.push(nomeProduto);
            });
            Promise.all(promises).then(() => {
                console.log("Todos os clientes e produtos foram carregados com sucesso.");
            });
        }
    }, [pedidos, clienteNome, produtoNome]);

    return (
        <div className="pedidos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Pedidos</h1>
                <Button as={Link} to="/pedidos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Novo Pedido
                </Button>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Filtrar por Cliente</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do cliente"
                        value={clienteFiltro}
                        onChange={(event) => setClienteFiltro(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Filtrar por Produto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Digite o nome do produto"
                        value={produtoFiltro}
                        onChange={(event) => setProdutoFiltro(event.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setClienteFiltro("");
                        setProdutoFiltro("");
                    }}
                >
                    Limpar filtros
                </Button>
            </Form>
            <hr />
            {
                pedidos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Quantidade</th>
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.filter(filtrarPedidos).map(pedido => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.quantidade}</td>
                                        <td>{clienteNome[pedido.clienteId]}</td>
                                        <td>{produtoNome[pedido.produtoId]}</td>
                                        <td className="d-flex gap-2">
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeletarPedido(pedido.id)}
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button
                                                variant="primary"
                                                as={Link}
                                                to={`/pedidos/editar/${pedido.id}`}
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button
                                                variant="info"
                                                as={Link}
                                                to={`/pedidos/detalhes/${pedido.id}`}
                                            >
                                                <i className="bi bi-info-circle-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
            }
        </div>
    );
}
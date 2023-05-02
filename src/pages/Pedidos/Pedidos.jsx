import { useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";


export function Pedidos() {

    const [pedidos, setPedidos] = useState([]);

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

    return (
        <div className="pedidos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Pedidos</h1>
                <Button as={Link} to="/pedidos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Novo Pedido
                </Button>
            </div>
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
                            {pedidos.map(pedido => {
                                return (
                                    <tr key={pedido.id}>
                                        <td>{pedido.quantidade}</td>
                                        <td>{pedido.clienteId}</td>
                                        <td>{pedido.produtoId}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
            }
        </div>
    );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export function Clientes() {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="clientes container">
            <h1>Clientes</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => {
                        return (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}
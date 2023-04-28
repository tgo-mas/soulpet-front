import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Pets() {

    const [pets, setPets] = useState([]);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/pets")
            .then(res => {
                setPets(res.data);
            })
            .catch(err => {
                toast.error("Um erro aconteceu.");
            });
        axios.get("http://localhost:3001/clientes")
            .then(res => {
                const nomes = res.data.map(cliente => {
                    return { nome: cliente.nome, id: cliente.id };
                });
                setClientes(nomes);
            })
    }, [])

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Pets</h1>
                <Button as={Link} to="/pets/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pet
                </Button>
            </div>
            <hr />
            {clientes ? 
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Dono(a)</th>
                        <th>Tipo</th>
                        <th>Porte</th>
                        <th>Data de Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map(pet => {
                        return (
                            <tr key={pet.id}>
                                <td>{pet.nome}</td>
                                <td>{clientes.filter(cliente => cliente.id === pet.clienteId)[0].nome}</td>
                                <td>{pet.tipo}</td>
                                <td>{pet.porte}</td>
                                <td>{Intl.DateTimeFormat("pt-br").format(Date.parse(pet.dataNasc))}</td>
                                <td>
                                    <Button className="m-2">
                                        <i className="bi bi-trash-fill"></i>
                                    </Button>
                                    <Button className="m-2">
                                        <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table> :
            <Loader />}
        </div>
    );
}
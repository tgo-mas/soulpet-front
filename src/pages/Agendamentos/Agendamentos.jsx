import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { format } from 'date-fns'; // para formatar a data que vem do banco de dados.


export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);

    useEffect(() => {
        consultarAgendamentos();
    }, []);

    function consultarAgendamentos() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
                <Button as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Agendamento
                </Button>
            </div>
            {
                agendamentos === null ?
                    <Loader />
                    :
                    <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Data agendada</th>
                                <th>Pet</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => {
                                
                                //formatar a data de: 2023-05-01T00:00:00.000Z para 01/05/2023.
                                const data = new Date(agendamento.dataAgendada);
                                const dataFormatada = format(data, 'dd/MM/yyyy');
                                
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.servico.nome}</td>
                                        <td>{dataFormatada}</td>
                                        <td>{agendamento.pet.nome}</td>
                                        <td>{agendamento.realizada === false ? "pendente" : "concluído"}</td>
                                        <td className="d-flex justify-content-center gap-2">
                                            <Button>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
        </div>
    );
}
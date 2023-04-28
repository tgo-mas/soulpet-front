import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Servicos() {

    const [servicos, setServicos] = useState([]);
    const [show, setShow] = useState(false);
    const [idServico, setIdServico] = useState(null);
    const [nome, setNome] = useState(null);

    const handleClose = () => {
        setIdServico(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdServico(id);
        setShow(true)
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/servicos/${idServico}`)
        .then(response => {
            setNome(response.data.nome);
        })
        .catch(console.error());
    }, [idServico]);

    // o useEffect passa a ter função de atualizacao e retorno da tabela apos uma ação
    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/servicos")
        .then(response => {
            setServicos(response.data);
        })
        .catch(console.error());
    }

    // função deletar
    function onDelete() {
        axios.delete(`http://localhost:3001/servicos/${idServico}`)
        .then(response => {
            toast.success(response.data.message, { position: "bottom-right", duration: 2000 })
            initializeTable();
        })
        .catch(error => {
            console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
        });
        handleClose();
    }

    return (
        <div className="servicos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Serviços</h1>
                <Button as={Link} to ="/servicos/novo">Novo Serviço</Button>
            </div>
            <hr />
            {
                servicos === null ?
                <Loader /> :
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map(servico => {
                            return (
                                <tr key={servico.id}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.preco}</td>
                                    <td>
                                        <Button className="m2" onClick={() => handleShow(servico.id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                        <Button className="m-2" as={Link} to={`/servicos/editar/${servico.id}`}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar serviço</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Tem certeza que deseja excluir o serviço ${nome}?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" onClick={onDelete}>Excluir</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

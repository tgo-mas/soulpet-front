import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { format } from 'date-fns'; 
import { toast } from "react-hot-toast";

export function Agendamentos() {

  const [agendamentos, setAgendamentos] = useState(null);
  const [show, setShow] = useState(false);
  const [idAgendamento, setIdAgendamento] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);

  const handleClose = () => {
    setIdAgendamento(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdAgendamento(id);
    setShow(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedAgendamento(null);
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:3001/agendamentos/${idAgendamento}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== idAgendamento));
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  };

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
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Agendamentos</h1>
                <Button as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Agendamento
                </Button>
            </div>
            <hr />
            {
                agendamentos === null ?
                    <Loader />
                    :
                        <Table striped bordered hover className="text-center">   
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
                                
                                const data = new Date(agendamento.dataAgendada);
                                const dataFormatada = format(data, 'dd/MM/yyyy');
                                
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.servico.nome}</td>
                                        <td>{dataFormatada}</td>
                                        <td>{agendamento.pet.nome}</td>
                                        <td>{agendamento.realizado}</td>
                                        <td>
                                            <Button variant="danger" className="m-2" onClick={() => handleShow(agendamento.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button className="m-2" as={Link} to={`/agendamentos/editar/${agendamento.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="success" className="m-2" onClick={() => consultarAgendamentos(agendamento.id)}>
                                                <i className="bi bi-exclamation-square-fill"></i>
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
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o agendamento?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
            
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do Agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {selectedAgendamento && (
                <>
                <p>ID: {selectedAgendamento.id}</p>
                <p>Nome: {selectedAgendamento.nome}</p>
                <p>Email: {selectedAgendamento.email}</p>
                <p>Telefone: {selectedAgendamento.telefone}</p>
                </>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleCloseConfirmationModal}>
                Fechar
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}
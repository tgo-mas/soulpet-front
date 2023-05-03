import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function Clientes() {
    
  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  const handleClose = () => {
    setIdCliente(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdCliente(id);
    setShow(true);
  };

  const showCliente = (id) => {
    buscarCliente(id).then((cliente) => {
      setSelectedCliente(cliente);
      setShowConfirmationModal(true);
    });
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedCliente(null);
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:3001/clientes/${idCliente}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setClientes(clientes.filter((cliente) => cliente.id !== idCliente));
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
    initializeTable();
  }, []);

  const initializeTable = () => {
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscarCliente = (id) => {
    return axios
      .get(`http://localhost:3001/clientes/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const gerarRelatorio = async () => {
  const response = await axios.get("http://localhost:3001/pdf");
  const html = await response.data;
  const doc = new jsPDF();
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  const table = fragment.querySelector('table');
  doc.autoTable({
  html: table,
  });
  const pdfBlob = new Blob([doc.output('blob')], { type: 'application/pdf' });
  const pdfUrl = window.URL.createObjectURL(pdfBlob);
  window.open(pdfUrl);
  };

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Clientes</h1>
                <Button as={Link} to="/clientes/novo">
                    <i className="bi bi-plus-lg me-2"></i> Cliente
                </Button>
            </div>
            <hr />
            {
                clientes === null ?
                    <Loader />
                    :
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>
                                            <Button variant="danger" className="m-2" onClick={() => handleShow(cliente.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button className="m-2" as={Link} to={`/clientes/editar/${cliente.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="success" className="m-2" onClick={() => showCliente(cliente.id)}>
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
                <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
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
          <Modal.Title>Informações do Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {selectedCliente && (
                <>
                <p>ID: {selectedCliente.id}</p>
                <p>Nome: {selectedCliente.nome}</p>
                <p>Email: {selectedCliente.email}</p>
                <p>Telefone: {selectedCliente.telefone}</p>
                </>
            )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleCloseConfirmationModal}>
                Fechar
            </Button>
            </Modal.Footer>
        </Modal>
        <Button className="m-2" onClick={gerarRelatorio}>Gerar Relatório</Button>
        </div>
    );
}
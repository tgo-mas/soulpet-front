import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Paginacao } from "../../components/Paginacao/Paginacao";

export function Pets() {

    const pageSize = 10;
    const [pets, setPets] = useState(null);
    const [clientes, setClientes] = useState(null);
    const [show, setShow] = useState(false);
    const [idPet, setIdPet] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const currentData = useMemo(() => {
        const firstPage = (currentPage - 1) * pageSize;
        const lastPage = firstPage + pageSize;
        return pets ? pets.slice(firstPage, lastPage) : null;
    }, [currentPage, pets]);

    function handleShow(id) {
        setIdPet(id);
        setShow(true);
    }

    function handleClose() {
        setIdPet(null);
        setShow(false);
    }

    const showPet = (id) => {
        buscarPet(id).then((pet) => {
            setSelectedPet(pet);
            setShowConfirmationModal(true);
        });
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
        setSelectedPet(null);
    };

    function onDelete() {
        axios.delete(`http://localhost:3001/pets/${idPet}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    function initializeTable() {
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
    }

    useEffect(() => {
        initializeTable();
    }, [])

    const buscarPet = (id) => {
        return axios
            .get(`http://localhost:3001/pets/${id}`)
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
    const [selectedPet, setSelectedPet] = useState(null);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="m-4">Pets</h1>
                <Button as={Link} to="/pets/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pet
                </Button>
            </div>
            <hr />
            {pets ?
                <>
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
                            {currentData ? currentData.map(pet => {
                                return (
                                    <tr key={pet.id}>
                                        <td>{pet.nome}</td>
                                        <td>{clientes ? clientes.filter(cliente => cliente.id === pet.clienteId)[0].nome : null}</td>
                                        <td>{pet.tipo}</td>
                                        <td>{pet.porte}</td>
                                        <td>{Intl.DateTimeFormat("pt-br").format(Date.parse(pet.dataNasc))}</td>
                                        <td>
                                            <Button className="m-2" onClick={() => handleShow(pet.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button className="m-2" as={Link} to={`/pets/editar/${pet.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button className="m-2" onClick={() => showPet(pet.id)}>
                                                <i className="bi bi-exclamation-square-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }) : null}
                        </tbody>
                    </Table>
                    <br />
                    <Paginacao
                        className="pagination-bar w-100 d-flex justify-content-center mb-4"
                        currentPage={currentPage}
                        totalCount={pets ? pets.length : 0}
                        pageSize={pageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </> :
                <Loader />}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir este pet?</Modal.Body>
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
                    <Modal.Title>Informações do Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPet && (
                        <>
                            <p>ID: {selectedPet.id}</p>
                            <p>Nome: {selectedPet.nome}</p>
                            <p>Tipo: {selectedPet.tipo}</p>
                            <p>Porte: {selectedPet.porte}</p>
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
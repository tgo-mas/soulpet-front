import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";

export function Produto() {
    
  const [produtos, setProdutos] = useState([]);
  const [show, setShow] = useState(false);
  const [idProduto, setIdProduto] = useState(null);

  const handleClose = () => {
    setIdProduto(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setIdProduto(id);
    setShow(true);
  };

  const showProduto = (id) => {
    buscarProduto(id).then((produto) => {
      setSelectedProduto(produto);
      setShowConfirmationModal(true);
    });
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedProduto(null);
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:3001/produtos/${idProduto}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        setProdutos(produtos.filter((produto) => produto.id !== idProduto));
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
      .get("http://localhost:3001/produtos")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buscarProduto = (id) => {
    return axios
      .get(`http://localhost:3001/produtos/${id}`)
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
  const [selectedProduto, setSelectedProduto] = useState(null);

  return (
    <div className="produtos container">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="m-4">Produtos</h1>
        <Button as={Link} to="/produtos/novo">
          <i className="bi bi-plus-lg me-2"></i> Produto
        </Button>
      </div>
      <hr />
      {produtos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>
                <Button className="m-2" onClick={() => handleShow(produto.id)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>
                <Button className="m-2" as={Link} to={`/produto/editar/${produto.id}`}>
                    <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button className="m-2" onClick={() => showProduto(produto.id)}>
                    <i className="bi bi-exclamation-square-fill"></i>
                </Button>
                                        
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o produto?</Modal.Body>
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
          <Modal.Title>Informações do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduto && (
            <>
              <p>ID: {selectedProduto.id}</p>
              <p>Nome: {selectedProduto.nome}</p>
              <p>Descrição: {selectedProduto.descricao}</p>
              <p>Preço: R$ {selectedProduto.preco.toFixed(2)}</p>
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
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import { Form } from 'react-bootstrap';

export function Pedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [clientes, setClientes] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [show, setShow] = useState(false);
  const [codigoPedido, setCodigoPedido] = useState(null);
  const [clienteFiltro, setClienteFiltro] = useState("");
  const [produtoFiltro, setProdutoFiltro] = useState("");


  const handleClose = () => {
    setCodigoPedido(null);
    setShow(false);
  };

  const handleShow = (codigo) => {
    setCodigoPedido(codigo);
    setShow(true);
  };

  useEffect(() => {
    initializeTable();
  }, []);

  const initializeTable = async () => {
    try {
      const pedidosRes = await axios.get("http://localhost:3001/pedidos");
      const clientesRes = await axios.get("http://localhost:3001/clientes");
      const produtosRes = await axios.get("http://localhost:3001/produtos");

      setPedidos(pedidosRes.data);
      setClientes(clientesRes.data.reduce(
        (obj, cliente) => ({ ...obj, [cliente.id]: cliente.nome }), {}
      ));
      setProdutos(produtosRes.data.reduce(
        (obj, produto) => ({ ...obj, [produto.id]: produto.nome }), {}
      ));
    } catch (error) {
      console.log(error);
    }
  }

  const filtrarPedidos = (pedido) => {
    const cliente = clientes[pedido.clienteId]
      ? clientes[pedido.clienteId].toLowerCase()
      : "";
    const produto = produtos[pedido.produtoId]
      ? produtos[pedido.produtoId].toLowerCase()
      : "";
    return (
      cliente.includes(clienteFiltro.toLowerCase()) &&
      produto.includes(produtoFiltro.toLowerCase())
    );
  };

  const onDelete = () => {
    axios.delete(`http://localhost:3001/pedidos/${codigoPedido}`)
      .then(response => {
        toast.success(response.data.message, { position: "bottom-right", duration: 2000, });
        initializeTable();
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response.data.message, { position: "bottom-right", duration: 2000, });
      });
    handleClose();
  };

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
      {pedidos === null ? (
        <Loader />
      ) : (
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
            {pedidos.filter(filtrarPedidos).map((pedido) => {
              return (
                <tr key={pedido.codigo}>
                  <td>{pedido.quantidade}</td>
                  <td>{clientes[pedido.clienteId]}</td>
                  <td>{produtos[pedido.produtoId]}</td>
                  <td className="d-flex justify-content-center">
                    <Button variant="danger" className="m-2" onClick={() => handleShow(pedido.codigo)}>
                      <i className="bi bi-trash-fill"></i>
                    </Button>

                    <Button variant="primary" className="m-2" as={Link} to={`/pedidos/editar/${pedido.codigo}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </Button>

                    <Button variant="success" className="m-2" as={Link} to={`/pedidos/detalhes/${pedido.codigo}`}>
                      <i className="bi bi-exclamation-square-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDelete}>
            Excluir
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

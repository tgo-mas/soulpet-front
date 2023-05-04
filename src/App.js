import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { Pets } from "./pages/Pets/Pets";
import { Servicos } from "./pages/Servicos/Servicos";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { EditaPedido } from "./pages/EditaPedido/EditaPedido";
import { Produto } from "./pages/Produto/Produto";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { EditaServico } from "./pages/EditaServico/EditaServico";
import { EditaProduto } from "./pages/EditaProduto/EditaProduto";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/servicos/editar/:id" element={<EditaServico />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/novo" element={<NovoPedido />} />
          <Route path="/pedidos/editar/:codigo" element={<EditaPedido />} />
          <Route path="/produtos" element={<Produto />} />
          <Route path="/produtos/novo" element={<NovoProduto />} />
          <Route path="/produtos/editar/:id" element={<EditaProduto />} />          
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// comentarios

import "bootstrap-icons/font/bootstrap-icons.css";
import { ConsultarPessoasF } from "./Pages/consulta";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CadastroPessoa } from "./Pages/cadastro";
import { AtualizarPessoa } from "./Pages/atualizar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConsultarPessoasF />} />
          <Route path="cadastro-pessoa" element={<CadastroPessoa />} />
          <Route path="atualizar-pessoa/:id" element={<AtualizarPessoa />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
  // return <ConsultarPessoasF />;
}

export default App;

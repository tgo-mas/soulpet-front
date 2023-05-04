import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { obterEstados, obterCidades } from "../../servicos/ibge";

export function NovoCliente() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [ufSelecionado, setUfSelecionado] = useState('');
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    //const [cep, setCep] = useState('');

    function onSubmit(data) {
        axios.post("http://localhost:3001/clientes", data)
            .then(response => {
                toast.success("Cliente adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/clientes");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        const buscarEstados = async () => {
            const estados = await obterEstados();
            setEstados(estados);
        };
    
        buscarEstados();
    }, []);
    
        const selecionarUf = async (uf) => {
            setUfSelecionado(uf);
            const cidades = await obterCidades(uf);
            setCidades(cidades);
        };
    
        const selecionarCidade = (cidade) => {
            setCidadeSelecionada(cidade);
        };
    
        // caso implemente API correios
        // const handleChangeCep = (event) => {
        //     setCep(event.target.value);
        // };

    return (
        <div className="container">
            <h1>Novo Cliente</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres."} })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "O e-mail é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.email && <Form.Text className="invalid-feedback">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="tel" className={errors.telefone && "is-invalid"} {...register("telefone", { required: "O telefone é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.telefone && <Form.Text className="invalid-feedback">{errors.telefone.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>UF</Form.Label>
                    <Form.Control as="select" 
                        className={errors.endereco?.uf && "is-invalid"} {...register("endereco.uf", { required: "O UF é obrigatório.", message: "Escolha uma UF."})}
                        value={ufSelecionado} onChange={(e) => selecionarUf(e.target.value)}>
                        <option value="">Selecione um estado</option> {estados.map((estado) => (
                        <option key={estado.id} value={estado.sigla}> {estado.nome} </option>))}
                    </Form.Control>
                    {errors.endereco?.uf && <Form.Text className="invalid-feedback">{errors.endereco?.uf.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Cidade</Form.Label>
                <Form.Control as="select" 
                        className={errors.endereco?.cidade && "is-invalid"} {...register("endereco.cidade", { required: "A cidade é obrigatória.", message: "Escolha uma cidade."})}
                        value={cidadeSelecionada} onChange={(e) => selecionarCidade(e.target.value)}>
                        <option value="">Selecione uma cidade</option> {cidades.map((cidade) => (
                        <option key={cidade.id} value={cidade.nome}> {cidade.nome} </option>))}
                    </Form.Control>
                    {errors.endereco?.cidade && <Form.Text className="invalid-feedback">{errors.endereco?.cidade.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.cep && "is-invalid"} {...register("endereco.cep", { required: "O CEP é obrigatório.", pattern: { value: /^[0-9]{5}-[0-9]{3}$/, message: "Digite um CEP válido (ex: 12345-678)." }})} />
                    {errors.endereco?.cep && <Form.Text className="invalid-feedback">{errors.endereco?.cep.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Rua</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.rua && "is-invalid"} {...register("endereco.rua", { required: "A rua é obrigatória.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.endereco?.rua && <Form.Text className="invalid-feedback">{errors.endereco?.rua.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Numero</Form.Label>
                    <Form.Control type="text" className={errors.endereco?.numero && "is-invalid"} {...register("endereco.numero", { required: "O número é obrigatório.", maxLength: { value: 255, message: "Limite de 255 caracteres."} })} />
                    {errors.endereco?.numero && <Form.Text className="invalid-feedback">{errors.endereco?.numero.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}
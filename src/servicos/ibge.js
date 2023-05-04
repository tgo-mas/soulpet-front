import axios from 'axios';

const estadosUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
const cidadesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios';

const obterEstados = async () => {
    const estados = await axios.get(estadosUrl);
    return estados.data;
};

const obterCidades = async (uf) => {
    const cidades = await axios.get(cidadesUrl.replace('{UF}', uf));
    return cidades.data;
};

export { obterEstados, obterCidades };









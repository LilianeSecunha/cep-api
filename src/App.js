import logo from './logo.svg';
import './App.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useEffect, useState } from 'react';


function App() {
  const [dados, setDados] = useState(null);
  const [cep, setCep] = useState(null);

  useEffect(() => {
    if (cep && cep.length >= 8){
      fetch('https://viacep.com.br/ws/'+cep+'/json/')
      .then(resposta => resposta.json())
      .then(dados => setDados(dados))
      .catch(erro => console.error(erro))
    }
  }, [cep]);

  return (
    <>
    <Container>
      <Form>
        <Form.Group className='mb-3' controlId='form-cep'>
          <Form.Label>CEP</Form.Label>
          <Form.Control type='text' value={cep} onChange={e => setCep(e.target.value)} placeholder='Informe um CEP nos formatos 00000000 ou 00000-000' />
        </Form.Group>
      </Form>

      {dados && dados.localidade ? (

        dados.logradouro.length > 0 ? (
          <div id='resultado'>
            <p><strong>Logradouro:</strong> {dados.logradouro}{dados.complemento ? ', '+dados.complemento : ''}</p>
            <p><strong>Bairro:</strong> {dados.bairro}</p>
            <p><strong>Localidade:</strong> {dados.localidade}/{dados.uf}</p>
            <p><strong>DDD:</strong> {dados.ddd}</p>
          </div>
        ) : (
          <div id='resultado'>
          <Alert key='warning' variant='warning'>CEP Municipal Único</Alert>
          <p><strong>Localidade:</strong> {dados.localidade}/{dados.uf}</p>
          <p><strong>DDD:</strong> {dados.ddd}</p>
        </div>
        )
        
      ) : (
        <Alert key='primary'>CEP não encontrado. Informe o CEP no campo acima.</Alert>
      )}

    </Container>
    

    
    
    </>
  );
}

export default App;

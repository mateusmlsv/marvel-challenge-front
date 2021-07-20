import { useHistory } from 'react-router-dom'
import { Form, Input, Modal } from 'antd'

import { useAuth } from '../../hooks/auth';

import { InitialStruct } from '../../components/InitialStruct';

import '../../Styles/auth.scss';
import { api } from '../../services/api';

export function SignUp() {
    const history = useHistory()
    const [form] = Form.useForm()

    const { signIn } = useAuth()

    async function handleSubmit () {
        const { name, email, password } = form.getFieldsValue()

        if (!name || !email || !password) {
            Modal.warning({ title: 'Todos os campos são obrigatórios '})
            return false
        }

        try {
            await api.post('users', { name, email, password })
            
            await signIn({ email, password })

            history.push('search-marvel')
        } catch (err) {
            Modal.warning({ title: err?.response?.data?.error || 'Erro desconhecido ao tentar salvar seu usuário' })
        }
    }
    return (
        <>
        <InitialStruct>
            <div className="main-content">
                <h2>Criar conta</h2>
                <button  className="create-account" onClick={() => history.goBack()}>
                    Voltar para tela de login
                </button>
                <div className="separator">ou crie sua conta</div>
                <Form form={form}>
                    <Form.Item name="name">
                        <Input placeholder="Nome"/>
                    </Form.Item>

                    <Form.Item name="email">
                        <Input placeholder="E-mail"/>
                    </Form.Item>

                    <Form.Item name="password">
                        <Input placeholder="Senha" type="password"/>
                    </Form.Item>
                    <button onClick={handleSubmit} className="create-account login-button">Criar conta</button>
                </Form>
            </div>
        </InitialStruct>
        </>
    )
}
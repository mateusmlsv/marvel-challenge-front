import { useHistory } from 'react-router-dom';
import { Form, Input, Modal } from 'antd'

import { useAuth } from '../../hooks/auth';

import { InitialStruct } from '../../components/InitialStruct';

import '../../Styles/auth.scss';

export function Home() {
    const history = useHistory()
    const [form] = Form.useForm()

    const { signIn } = useAuth()

    async function handleSignIn() {
        const { email, password } = form.getFieldsValue()

        if (!email || !password) {
            Modal.warning({ title: 'Todos os campos são obrigatórios'})
            return false
        }

        try {
            await signIn({ email, password })

            history.push('search-marvel')
        } catch (err) {
            Modal.error({ title: err?.response?.data?.error || 'Erro desconhecido ao logar, tente novamente mais tarde'})
        }
    }

    return (
        <InitialStruct>
            <div className="main-content">
                <h2>Login</h2>
                <button  className="create-account" onClick={() => history.push('signup')}>
                    Crie sua conta
                </button>
                <div className="separator">ou faça login com sua conta</div>
                <Form form={form}>
                    <Form.Item name="email">
                        <Input placeholder="E-mail"/>
                    </Form.Item>

                    <Form.Item name="password">
                        <Input placeholder="Senha" type="password"/>
                    </Form.Item>
                    <button onClick={handleSignIn} className="create-account login-button">Entrar</button>
                </Form>
            </div>
        </InitialStruct>
    )
}
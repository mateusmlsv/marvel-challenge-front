import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Input, Button, Form, Modal } from 'antd'

import { useAuth } from '../../hooks/auth';

import MarvelLogo from '../../assets/marvel.png'

import '../../Styles/room.scss';
import { api } from '../../services/api';

export function MyAccount() {
    const history = useHistory()
    const [form] = Form.useForm()

    const { user, token, signOut } = useAuth()

    useEffect(() => {
        form.setFieldsValue({ name: user.name, email: user.email })
    }, [user, form])

    async function handleSubmit() {
        const { name, email, password, old_password } = form.getFieldsValue()

        if (!name || !email) {
            Modal.warning({ title: 'Nome e E-mail são obrigatórios' })
            return false
        }

        if (password && !old_password) {
            Modal.warning({ title: 'Para alterar a senha você deve fornecer a antiga' })
            return false
        }

        try {
            await api.put(`users`, {
                name,
                email,
                password,
                old_password
            }, { headers: { Authorization: `Bearer ${token}` } })

            Modal.success({ title: 'Alteração realizada com sucesso, faça login novamente, por favor' })

            signOut()

            history.push('')
        } catch (err) {
            Modal.success({ title: err.response.data.error || 'Erro desconhecido ao tentar realizar a alteração' })
        }
    }

    return (
        <div id="page">
            <header>
            <div className="content">
                <img src={MarvelLogo} alt="Marvel"/>
                <Button type="primary" danger onClick={() => history.goBack()}>Página inicial</Button>
            </div>
            </header>

            <main>
                <div className="my-data">
                    <Form form={form}>
                        <Form.Item name="name">
                            <Input placeholder="Nome"/>
                        </Form.Item>

                        <Form.Item name="email">
                            <Input placeholder="E-mail"/>
                        </Form.Item>

                        <Form.Item name="old_password">
                            <Input placeholder="Antiga senha" type="password"/>
                        </Form.Item>

                        <Form.Item name="password">
                            <Input placeholder="Nova senha" type="password"/>
                        </Form.Item>
                        <button onClick={handleSubmit} className="create-account login-button">Editar conta</button>
                    </Form>
                </div>
            </main>
      </div>
    )
}
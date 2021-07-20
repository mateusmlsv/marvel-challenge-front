import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Card, Form, Modal } from 'antd'
import md5 from 'md5';
import { FileSearchOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

import MarvelLogo from '../../assets/marvel.png'

import '../../Styles/room.scss';
import { KeyboardEvent } from 'react';
import { marvel } from '../../services/marvel';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

export function SearchMarvel() {
    const history = useHistory()
    const { Meta } = Card;
    const [form] = Form.useForm()
    const [characters, setCharacters] = useState<[]>([])
    const { token } = useAuth()

    async function handleChange(event: KeyboardEvent) {
        if (event.keyCode !== 13) {
            return false
        }
        const { campo } = form.getFieldsValue()
        const ts = Math.floor(Date.now() / 1000)
        const apiKey = '2b3ad84ff67442e3bef47a05db3b3781'
        const hash = md5(ts + '7a605adf3a67df5a70c82033e3f61b9deb2ad22d' + apiKey)
        try {
            console.log(campo)
            const { data } = await marvel.get(`characters?name=${campo}&ts=${ts}&apikey=${apiKey}&hash=${hash}`)

            setCharacters(data.data.results)
        } catch (err) {
            Modal.error({ title: 'Nenhum dado encontrado para esse nome' })
        }
    }

    async function handleFavorite(character) {
        try {
            await api.post(`favorites`, {
                favorite_type: 'character',
                marvel_id: character.id,
                thumbnail: character.thumbnail
            }, { headers: { Authorization: `Bearer ${token}` } })
        } catch (err) {
            Modal.error({ title: err.response.data.error || 'Erro inesperado' })
        }
    }

    return (
        <div id="page">
            <header>
            <div className="content">
                <img src={MarvelLogo} alt="Marvel"/>
                <Button type="primary" danger onClick={() => history.push('my-account')}>Minhas informações</Button>
            </div>
            </header>

            <main>
                <div className="input-search">
                <Form form={form}>
                    <Form.Item name="campo">
                        <Input 
                            placeholder="Digite seu o nome do seu herói ou comic preferido e tecle enter..." 
                            style={{ width: '100%' }} 
                            onKeyUp={handleChange}
                        />
                    </Form.Item>
                </Form>
                </div>

                <div className="result-list">
                {
                    characters? 
                        characters.map(character => (
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />}
                                actions={[
                                    <StarFilled key="setting" onClick={() => handleFavorite(character)}/>,
                                    <FileSearchOutlined key="details"/>
                                ]}
                            >
                                <Meta title={character.name} description="www.marvel.com" />
                            </Card>
                        ))
                    : null
                }
                </div>
            </main>
      </div>
    )
}
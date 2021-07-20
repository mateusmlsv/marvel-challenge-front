import { ReactNode } from 'react'

import marvelLogo from '../../assets/marvel.png'

type InitialStructProps = {
    children: ReactNode;
}

export function InitialStruct({ children }: InitialStructProps) {
    return (
        <div id="page-auth">
            <aside>
                <img src={marvelLogo} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Desafio Marvel</strong>
                <p>Encontre seus heróis prefiridos</p>
            </aside>
            <main>
                {children}
            </main>
        </div>
    )
}
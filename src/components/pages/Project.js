import styles from './Project.module.css'

import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectFrom, setShowProjectForm] = useState(false)
    const [message, setMensagem] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            }).then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                })

                .catch(err => console.log(err))
        }, 5000);

    }, [id])

    function editPost(project) {
        //budget validation
        if (project.budget < project.cost) {
            setMensagem('O orcamento nao pode ser menor que o custo do projeto!')
            setType('erro')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMensagem('Projeto atualizado!')
                setType('sucess')
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!setShowProjectForm)
    }
    return (<>{project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectFrom ? 'Editar projeto' : 'Fechar'}
                    </button>
                    {!showProjectFrom ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span> R${project.budget}
                            </p>
                            <p>
                                <span>Total Utilizado: </span> R${project.cost}
                            </p>
                        </div>
                    ) : (
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Concluir edicao" projectData={project} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : (
        <Loading />
    )}
    </>
    )
}

export default Project
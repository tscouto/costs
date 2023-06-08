import Message from "../layout/Message.js"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js"
import styles from './Projects.module.css'
import Container from '../layout/Container.js'
import LinkButton from "../layout/LinkButton.js"
import ProjectCard from "../project/ProjectCard.js"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading.js"

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {

        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(resp =>  resp.json())
            .then(data=> {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch(error => console.log(error))
        }, 300);
       

    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
        }).then(resp => resp.json() )
        .then(() =>{
            setProjects(projects.filter((project)=> project.id !== id))
            setProjectMessage('Projeto removido com sucesso')
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container }>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
                </div>
                {/* <a href="#">novo projeto</a> */}
                {message && <Message type="success" msg={message} />}
                {projectMessage && <Message type="success" msg={projectMessage} />}
                <Container customClass="start">
                    {projects.length > 0 && 
                    projects.map((project)=> (
                        <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}

                        />
                   ))}
                   {!removeLoading && <Loading />}
                   {removeLoading && projects.length === 0 && (
                    <p>Nao ha projetos cadastrados</p>

                   )}

                    <p>Projetos...</p>
                </Container>
            

        </div>
    )
}

export default Projects
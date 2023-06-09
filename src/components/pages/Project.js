import styles from './Project.module.css'

import {parse, v4 as uuidv4} from 'uuid'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'


function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectFrom, setShowProjectForm] = useState(false)
    const [services, setServices] = useState([])
    const [showServiceForm,setShowServiceForm] = useState(false)
    const [message, setMensagem] = useState()
    const [type, setType] = useState()
   


    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            }).then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })

                .catch(err => console.log(err))
        }, 300);

    }, [id])

    function editPost(project) {
        setMensagem('')
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

    function createService() {
        setMensagem('')
        // last service
        const latService = project.services[project.services.length - 1]
        latService.id = uuidv4()
        const lastServiceCost = latService.cost
        const newCost = parseFloat(project.cost ) + parseFloat(lastServiceCost)
        //maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMensagem('Orcamento ultrapassado, verifique o valor do servico')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost
        project.cost = newCost

        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then(resp => resp.json())
        .then(data=> {
            setProject(data)
           
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }


    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
      }
      


function removeService(id, cost) {
    const serviceUptaded = project.services.filter((service)=> service.id != id)
    const projectUpdated = project

    projectUpdated.services = serviceUptaded
    projectUpdated.cost = parseFloat(serviceUptaded) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectUpdated)
    }).then((resp)=> resp.json())
    .then((data)=> {
        setProject(projectUpdated)
        setServices(serviceUptaded)
        setMensagem('Servico removido com sucesso!')

    })
    .catch(err => console.log(err))
}



    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return (<>{project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message} />}
                <div>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleServiceForm}>
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
                <div className={styles.service_form}>
                    <h2>Adicione um servico:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar servico' : 'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                        { showServiceForm && (
                            <ServiceForm 
                            handleSubmit={createService}
                            btnText="Adicionar Servico"
                            projectData={project}
                            />
                        )}
                    </div>
                </div>
                <h2>Servicos</h2>
                <Container customClass="start">
                        {services.length > 0 &&
                        services.map((services)=> (
                            <ServiceCard
                            id={services.id} 
                            name={services.name} 
                            cost={services.cost} 
                            description={services.description} 
                            key={services.id}
                            handleRemove={removeService} 
                            
                            />

                        ))
                            
                        }
                        {services.length === 0 && <p>Nao ha servicos cadastrados</p>}
                </Container>
            </Container>
        </div>
    ) : (
        <Loading />
    )}
    </>
    )
}

export default Project
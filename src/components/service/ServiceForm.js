
import styles from '../project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../form/input'
import SubmitButton from '../form/SubmitButton'



function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState()

    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Nome do servico"
                name="name"
                placeholder="Insira o nome do servico"
                handleOnChange={handleChange}
            />
            <Input
                type="number"
                text="Custo do servico"
                name="cost"
                placeholder="Insira o valor total"
                handleOnChange={handleChange}
            />
            <Input
                type="text"
                text="Descricao do servico"
                name="description"
                placeholder="Descreva o servico"
                handleOnChange={handleChange}
            />
            < SubmitButton text={btnText} />
        </form>
    )
}

export default ServiceForm
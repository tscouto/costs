import styles from './ProjectForm.module.css'

function ProjectForm() {
    return (
        <form action="">
            <div>
                <input type="text" placeholder="Insira o nome do projeto" />
            </div>
            <div>
                <input type="number" placeholder="Insira o orçamento total" />
            </div>

            <div>
                <select name="category_id" id="">
                    <option disabled selected>Selecione a categoria</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Criar projeto"/>
            </div>
        </form>
    )
}

export default ProjectForm
import { useState } from "react"
import { ICurso } from "./Curso.type"
import "./CursoList.style.css"
import CursoModal from "./CursoModal"

type Props = {
    list: ICurso[];
    onEdit: (data: ICurso) => void;
}

const CursoList = (props: Props) => {
    const { list, onEdit } = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as ICurso | null);

    const viewCurso = (data: ICurso) => {
        setDataToShow(data);
        setShowModal(true);
    };

    const onCloseModal = () => setShowModal(false);

    return <div>
        <article>
            <h3 className="list-header">Curso List</h3>
        </article>
        <table >
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Vagas</th>
                <th>Modelo</th>
                <th>Opções</th>
            </tr>
            {list.map(curso => {
                return (
                    <tr key={curso.id}>
                        <td>{curso.nome}</td>
                        <td>{curso.descricao}</td>
                        <td>{curso.vagas}</td>
                        <td>{curso.modelo}</td>
                        <td>
                            <input type={"button"} value="View" onClick={() => viewCurso(curso)} />
                            <input type={"button"} value="Edit" onClick={() => onEdit(curso)} />
                        </td>
                    </tr>
                );
            })}


        </table>
        {showModal && dataToShow !== null && (
            <CursoModal onClose={onCloseModal} data={dataToShow} />
        )}
    </div>
}

export default CursoList;
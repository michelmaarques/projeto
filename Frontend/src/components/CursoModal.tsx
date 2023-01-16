import { ICurso } from "./Curso.type";
import "./CursoModal.style.css";

type Props = {
    onClose: () => void;
    data: ICurso;
};

const CursoModal = (props: Props) => {
    const { onClose, data } = props;
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h3>Curso Data</h3>
                <div>
                    <div>
                        <label>Nome : {data.nome}</label>
                    </div>
                    <div>
                        <label>Descrição : {data.descricao}</label>
                    </div>
                    <div>
                        <label>Vagas : {data.vagas}</label>
                    </div>
                    <div>
                        <label>Modelo : {data.vagas}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CursoModal;
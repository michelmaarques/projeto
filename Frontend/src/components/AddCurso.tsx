import { ICurso } from "./Curso.type";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import "./CursoForm.style.css"
import { number, object, string } from "yup";

type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data: ICurso) => void;
}

const schema = object({
    nome: string().required("Campo obrigatório!").max(180, "Não pode ser maior que 180 caracteres!"),
    descricao: string(),
    vagas: number().required("Campo obrigatório!").positive("O número deve ser positivo!").integer("Deve ser um número inteiro!"),
    modelo: string().required("Campo obrigatório!")
})

const AddCurso = (props: Props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ICurso>({ resolver: yupResolver(schema) });
    const { onBackBtnClickHnd, onSubmitClickHnd } = props;


    const onSubmitBtnClickHnd = (data: ICurso) => {
        const dataAdd: ICurso = {
            id: new Date().toJSON().toString(),
            nome: data.nome,
            descricao: data.descricao,
            vagas: data.vagas,
            modelo: data.modelo
        }
        onSubmitClickHnd(dataAdd);
        onBackBtnClickHnd();
    }

    return (
        <div className="form-container">
            <div>
                <h3>Add Curso Form</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmitBtnClickHnd)}>
                <div>
                    <label>Nome : </label>
                    <input type="text" id="nome"  {...register("nome")} />
                </div>
                <span className="error">{errors?.nome?.message}</span>
                <div>
                    <label>Descrição : </label>
                    <input type="text" id="descricao" {...register("descricao")} />
                </div>
                <span className="error">{errors?.descricao?.message}</span>
                <div>
                    <label>Vagas : </label>
                    <input type="number" id="vagas" defaultValue={0} {...register("vagas")} />
                </div>
                <span className="error">{errors?.vagas?.message}</span>
                <div>
                    <label>Modelo : </label>
                    <select id="modelo" {...register("modelo")}>
                        <option defaultValue={"presencial"} value="presencial">Presencial</option>
                        <option value="online">online</option>
                    </select>

                </div>
                <span className="error">{errors?.modelo?.message}</span>
                <div>
                    <input type="button" value="Back" onClick={onBackBtnClickHnd} />
                    <input type="submit" value="Add" />
                </div>
            </form>

        </div>
    )
}

export default AddCurso;
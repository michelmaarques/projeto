import { useState, useEffect } from "react";
import AddCurso from "./AddCurso";
import { ICurso, PageEnum } from "./Curso.type";
import EditCurso from "./EditCurso";
import CursoList from "./CursoList";
import api from "../service/api";
import "./Home.style.css"
import Popup from "reactjs-popup";

const Home = () => {

    const [cursoList, setCursoList] = useState([] as ICurso[]);
    const [showPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as ICurso);

    useEffect(() => {
        getCursos();
    }, []);

    useEffect(() => {
        getCursos();
    }, [cursoList]);

    async function getCursos() {
        const res = await api.get('/listCursos');
        setCursoList(res.data)
    }

    const onAddCursoClickHnd = () => {
        setShowPage(PageEnum.add)
    }

    const showListPage = () => {
        setShowPage(PageEnum.list)
    }

    async function addCurso(data: ICurso) {
        try {
            await api.post('/createCurso', data)
        } catch {
            alert("Não foi possivel criar o curso")
        }
    }


    const EditCursoData = (data: ICurso) => {
        setShowPage(PageEnum.edit);
        setDataToEdit(data);
    }

    async function updateData(data: ICurso) {
        try {
            await api.post('/updateCurso', data)
        } catch (error) {
            alert("Não foi possível atualixzar!")
        }

    };


    return <>

        <article className="article-header">
            <header>
                <h1> Cursos</h1>
            </header>
        </article>

        <section className="section-content">
            {showPage === PageEnum.list && (
                <>
                    <input type="button" value="Adicionar" onClick={onAddCursoClickHnd} className="add-curso-btn" />
                    <CursoList
                        list={cursoList}
                        onEdit={EditCursoData}
                    />
                </>
            )}
            {showPage === PageEnum.add &&
                <AddCurso onBackBtnClickHnd={showListPage} onSubmitClickHnd={addCurso} />
            }
            {showPage === PageEnum.edit &&
                <EditCurso
                    data={dataToEdit}
                    onBackBtnClickHnd={showListPage}
                    onUpdateClickHnd={updateData}
                />
            }


        </section>
    </>
}

export default Home;
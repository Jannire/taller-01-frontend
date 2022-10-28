import React, { useEffect, useState } from "react"
import {Container, Row, Col, FormText} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import GridCursos from "../ListadoCursos/components/GridCursos"
import GridCiclos from "./components/GridCiclos"
import FiltroCarrera from "../ListadoCursos/components/FiltroCarrera"
import InputGroup from 'react-bootstrap/InputGroup';

const ListadoCiclosPage = () => {
    const [listadoCiclos, setListadoCiclos] = useState([])
    const [listadoCarreras, setListadoCarreras] = useState([])
    const [listadoCursos, setListadoCursos] = useState([])

    const httpObtenerCiclos = async () => {
        
        const resp = await fetch("http://localhost:4444/ciclos")
        const data = await resp.json()
        console.log(data)
        setListadoCiclos(data)
    }

    const httpObtenerCarreras = async () => {
        const resp = await fetch("http://localhost:4444/carreras")
        const data = await resp.json()
        console.log(data)
        setListadoCarreras(data)
    }

    const httpObtenerCursos = async (carreraId = null) => {
        const ruta = carreraId == null ? 
            "http://localhost:4444/cursos" : 
            `http://localhost:4444/cursos?carrera=${carreraId}`

        const resp = await fetch(ruta)
        const data = await resp.json()
        console.log(data)
        setListadoCursos(data)
    }

    useEffect(() => {
        httpObtenerCiclos()
    }, [])

    useEffect(() => {
        httpObtenerCarreras()
        httpObtenerCursos()
    }, [])

    const onCarreraSelected = (carreraId) => {
        console.log("Se selecciono carrera " +  carreraId)
        httpObtenerCursos(carreraId)
    }

    return <Layout
        makeHeader={ () => <Header titulo="Listado de Ciclos y Cursos" /> }
        makeBody={ 
            () =>  <Row>
                <Col>
                    <h2>Ciclos</h2>
                    <InputGroup className="mb-3">
                    <Form.Control placeholder="Ciclo" aria-label="Ciclo" aria-describedby="basic-addon2"/>
                    <Button variant="outline-secondary" id="button-addon2">
                        +
                    </Button>
        </InputGroup>
                    <GridCiclos className="col" ciclos={ listadoCiclos }/>
                </Col>
                <Col>
                    <h2>Cursos</h2>
                    <FiltroCarrera
                        carreras={ listadoCarreras }
                        onCarreraSelected={ onCarreraSelected }/>
                    <GridCursos cursos={ listadoCursos }/>
                </Col>
            </Row>
        }
        makeFooter={ () => <Footer /> }
    />
}

export default ListadoCiclosPage
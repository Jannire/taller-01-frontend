import React, { useEffect, useState } from "react"
import {Container} from 'react-bootstrap'
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import GridCiclos from "./components/GridCiclos"

const ListadoCiclosPage = () => {
    const [listadoCiclos, setListadoCiclos] = useState([])

    const httpObtenerCiclos = async () => {
        
        const resp = await fetch("http://localhost:4444/ciclos")
        const data = await resp.json()
        console.log(data)
        setListadoCiclos(data)
    }

    useEffect(() => {
        httpObtenerCiclos()
    }, [])

    return <Layout
        makeHeader={ () => <Header titulo="Listado de Ciclos" /> }
        makeBody={ 
            () =>  <div>
                <GridCiclos ciclos={ listadoCiclos }/>
            </div>
        }
        makeFooter={ () => <Footer /> }
    />
}

export default ListadoCiclosPage
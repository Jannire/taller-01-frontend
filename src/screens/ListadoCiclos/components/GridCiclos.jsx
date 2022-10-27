import React from "react";

import { Row, Col, Card } from 'react-bootstrap'

const GridCiclos = (props) => {

    return <div className="mt-4 mb-4">
        {
            props.ciclos.map((ciclo) => {
                return <Row className="mb-2">
                    <Col>
                        <Card>
                            <Card.Body>{ ciclo.nombre }</Card.Body>
                        </Card>
                    </Col>
                </Row>
            })
        }
    </div>
}

export default GridCiclos
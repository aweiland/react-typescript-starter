import {Glyphicon, Row, Col} from 'react-bootstrap'
import * as React from "react";

export class Spinner extends React.Component<any, any> {
    public render() {
        const cssStyle = {
            textAlign: 'center'
        };

        return (
            <Row>
                <Col>
                    <div style={cssStyle}>
                        <Glyphicon glyph="refresh" className="spinning large" />
                    </div>
                </Col>
            </Row>
        )
    }
}
import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ListGroupItem } from 'reactstrap'

export default class MenuItem extends Component {
    render() {
        const { item, icon } = this.props

        return <ListGroupItem>
            <div className='d-flex justify-content-between align-items-end'>
                <h5>{item.name}</h5>
                <div className='d-flex align-items-center'>
                    ${item.price}

                    <Button onClick={this.callback.bind(this)} color='plain'>
                        <FontAwesomeIcon icon={icon} />
                    </Button>
                </div>
            </div>
        </ListGroupItem>
    }

    callback() {
        this.props.onClick(this.props.item)
    }
}
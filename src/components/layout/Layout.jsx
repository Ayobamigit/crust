import React, { Component } from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import './layout.scss'

export default class Layout extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="sidebar">
                    <Sidebar title={this.props.title} />
                </div>

                <div id="main">
                    <div>
                        <Header title={this.props.title} />
                    </div>
                    <div id="children">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}


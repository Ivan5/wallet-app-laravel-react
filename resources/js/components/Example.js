import React, { Component } from "react";
import ReactDOM from "react-dom";
import TransferForm from "./TransferForm";
import TransferList from "./TransferList";

export default class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            money: 0.0,
            transfers: [],
            error: null
        };
    }

    async componentDidMount() {
        try {
            let response = await fetch("http://127.0.0.1:8000/api/wallet");
            let data = await response.json();
            this.setState({
                money: data.money,
                transfers: data.transfers
            });
        } catch (error) {
            this.setState({
                error
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 m-t-md">
                        <p className="title">$ {this.state.money}</p>
                    </div>
                    <div className="col-md-12">
                        <TransferForm />
                    </div>
                </div>
                <div className="m-t-md">
                    <TransferList transfers={this.state.transfers} />
                </div>
            </div>
        );
    }
}

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}

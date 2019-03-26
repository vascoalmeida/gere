import React, {Component} from "react";
import "./dashboard.css";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            filters: {
                status: "",
            },
            order: {
                date: "",
            },
        }

        this.applyOptions = this.applyOptions.bind(this);
        this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this);
        this.handleDateOrderChange = this.handleDateOrderChange.bind(this);
    }

    applyOptions() {
        var filters_order = {
            filters: this.state.filters,
            order: this.state.order,
        }
        //console.log(this.props)
        console.log("FILTERS_ORDER:", filters_order);
        this.props.get_data("POST", filters_order);
    }

    handleStatusFilterChange(ev) {
        this.setState({
            filters: {
                status: ev.target.value,
            }
        }, () => this.applyOptions());
    }    

    handleDateOrderChange(ev) {
        this.setState({
            order: {
                date: ev.target.value,
            }
        }, () => this.applyOptions());
    }

    render() {
        var options = [];

        if(this.props.filter_status) {
            options.push(
                <div className="d-section">
                    <label className="label-title">Estado</label>
                    <select className="filter-search" onChange={this.handleStatusFilterChange}>
                        <option value="" selected>---</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Aceite">Aceite</option>
                        <option value="Recusado">Recusado</option>
                        <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
            );
        }

        if(this.props.order_by_day) {
            options.push(
                <div className="d-section">
                    <label className="label-title">Dia criado</label>
                    <select className="filter-search" onChange={this.handleDateOrderChange}>
                        <option value="DESC">Mais recentes</option>
                        <option value="ASC" selected>Mais antigos</option>
                    </select>
                </div>
            );
        }

        if(this.props.filter_user_status) {
            options.push(
                <div className="d-section">
                    <label className="label-title">Estado</label>
                    <select className="filter-search" onChange={this.handleStatusFilterChange}>
                        <option value="" selected>---</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </div>
            );
        }

        return(
            <div id="dashboard">

                {options.map(section => section)}

                <div className="d-section button-container">
                    {
                        this.props.main_action ?
                        
                        <div className="form-button" onClick={this.props.main_action}>{this.props.main_action_msg}</div>

                        :

                        null 
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;
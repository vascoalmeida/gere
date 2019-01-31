import React, {Component} from "react";
import ConfirmAction from "../../../popups/confirmAction/confirmAction";
import "./userItem.css";

class UserItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: this.props.email,
            class: "",
            status: "",
            clearance: "",
            deactivate_popup_visible: false,
        }

        this.deactivateUser = this.deactivateUser.bind(this);
        this.showDeactivateUserConfirm = this.showDeactivateUserConfirm.bind(this);
        this.closePopups = this.closePopups.bind(this);
        this.renderRegisteredUser = this.renderRegisteredUser.bind(this);
        this.renderPendentUser = this.renderPendentUser.bind(this);
    }

    componentDidMount() {
        fetch("/user/info/" + this.props.email, {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(r => {
            r.json()
            .then(res => {
                this.setState({
                    name: res.name,
                    class: res.class,
                    status: res.status,
                    clearance: res.clearanceLvl,
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => console.log(err));
    }

    deactivateUser() {
        fetch("/user/deactivate/" + this.props.email, {
            method: "GET",
        })
        .then(r => {
            console.log(r);
        })
        .catch(err => console.log(err));
    }

    showDeactivateUserConfirm() {
        this.setState({
            deactivate_popup_visible: true,
        });
    }

    closePopups() {
        this.setState({
            deactivate_popup_visible: false,
        });
    }

    renderRegisteredUser() {
        var status_color;
        this.state.status === "Ativo" ? status_color = "text-green" : status_color = "text-red";

        return(
            <div className="section">
                <div className="sub-section">
                    <h1 className="name">{this.state.name}</h1>
                </div>

                <div className="sub-section">
                    <div>
                        <label className="label-title">E-mail:</label>
                        <span className="text">{this.state.email}</span>
                    </div>
                    
                    <div>
                        <label className="label-title">Turma:</label>
                        <span className="text">{this.state.class}</span>
                    </div>
                </div>

                <div className="sub-section">
                    <div>
                        <label className="label-title">Estado:</label>
                        <span className={"text status " + status_color}>{this.state.status}</span>
                    </div>

                    <div>
                        <label className="label-title">Estatuto:</label>
                        <span className="text">Aluno</span>
                    </div>
                </div>
            </div>
        );
    }

    renderPendentUser() {
        return(
            <div className="section">
                <div className="sub-section">
                    <label className="label-title">E-mail:</label>
                    <span className="text">{this.state.email}</span>
                </div>

                <div className="sub-section">
                    <div>
                        <label className="label-title">Estado:</label>
                        <span className="text status">{this.state.status}</span>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        var buttons;
        var active_popup;

        if(this.state.status === "Ativo") {
            buttons = (
                <div className="form-button red-btn" onClick={this.showDeactivateUserConfirm}>Desativar</div>
            );
        }

        else if(this.state.status === "Inativo") {
            buttons = (
                <div className="form-button white-btn">Reativar</div>
            )
        }

        if(this.state.deactivate_popup_visible) {
            active_popup = <ConfirmAction message={"Tem a certeza de que deseja desativar o utilizador '" + this.state.name +"'?"} reject_btn_msg="Sim, desativar" accept_btn_msg="Não, voltar" reject_btn_action={this.deactivateUser} accept_btn_action={this.closePopups} close_popup={this.closePopups} />
        }

        return(
            <React.Fragment>
            {active_popup}

            <div className="user">
                
                {this.state.status !== "Pendente" ? this.renderRegisteredUser() : this.renderPendentUser()}

                <div className="section btn-container">
                    {buttons}
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default UserItem;
import React, {Component} from "react";
import "./addUser.css";

class AddUser extends Component {

    constructor() {
        super();

        this.state = {
            emails_file: "",
            css_hide_class: "hidden",
        }

        this.handleEmailsFileChange = this.handleEmailsFileChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    handleEmailsFileChange(ev) {
        this.setState({
            emails_file: ev.target.files[0],
            css_hide_class: "",
        });
    }

    handleSubmission() {
        var file_reader = new FileReader();
        file_reader.onloadend = (data) => {
            fetch("/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({emails: file_reader.result}),
            })
            .then(r => {
                alert("Utilizador(es) criado(s) com sucesso!");
            })
            .catch(err => console.log(err));
        }

        file_reader.readAsText(this.state.emails_file);
    }

    render() {
        return(
            <div id="add-user">
                <div className="au-section">
                    <h1 className="section-title">Emails permitidos</h1>
                    <p className="section-desc text">Caso necessário, é possível carregar uma lista de emails para criar utilizadores mais rapidamente, poupando ao trabalho de adicionar um utilizador de cada vez. Carregue no botão abaixo para carregar um ficheiro (do tipo ".txt" ou ".csv") que contenha os emails dos utilizadores que deseja criar.</p>

                    <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleEmailsFileChange} accept=".csv,text/plain" required />
                    <label className="form-button" htmlFor="file">Importar emails</label>
                    <div className={"form-button white-btn " + this.state.css_hide_class} onClick={this.handleSubmission}>Gravar alterações</div>
                </div>
            </div>
        );
    }
}

export default AddUser;
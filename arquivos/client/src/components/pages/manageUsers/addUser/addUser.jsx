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
            .then(r => console.log(r))
            .catch(err => console.log(err));
        }

        file_reader.readAsText(this.state.emails_file);
    }

    render() {
        return(
            <div id="add-user">
                <div className="au-section">
                    <h1 className="section-title">Emails permitidos</h1>
                    <p className="section-desc text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod, sapien at mollis sodales, felis nibh vestibulum est, ut malesuada libero tortor ut arcu. Proin faucibus ultricies erat mattis ultrices.</p>

                    <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleEmailsFileChange} accept=".csv,text/plain" required />
                    <label className="form-button" htmlFor="file">Importar emails</label>
                    <div className={"form-button white-btn " + this.state.css_hide_class} onClick={this.handleSubmission}>Gravar alterações</div>
                </div>
            </div>
        );
    }
}

export default AddUser;
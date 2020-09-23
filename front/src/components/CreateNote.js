import axios from 'axios';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
const token = localStorage.getItem("Authorized")  

export default class CreateNote extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: '',
            content: '',
            grupo:'',
            date: '',
            notes: []
        }
               
    }
    onSubmit = async (e) => {
        e.preventDefault();              
        await axios.post('http://localhost:4000/api/notes/' + token, {

            title:this.state.title,
            content:this.state.content,
            grupo: this.state.grupo,
            date:this.state.date
        })
         .then((a) => {
                //console.log(a.data)
               if (!a.data.err ){
                this.setState({ modal: !this.state.modal })
                this.getNotes();
               } else
               console.log(a.data)
        })      

    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })             
    }
    activarM = (e) => {
        e.preventDefault();
        this.setState({ modal: !this.state.modal })
    }
    async componentDidMount(){
            this.getNotes();
            
    }
    getNotes =  async() => {
        const res =  await axios.get('http://localhost:4000/api/notes/'+ token)
        this.setState({
            notes: res.data
        })
    }
    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }

    render() {
        const modalStyles = {
            position: 'adsolute',
            
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col col-lg-2">
                      <button type="submit" onClick={this.activarM}>Nueva Nota</button>
                    </div>
                    <div className="col" >
                        <div className="container">
                        {
                            this.state.notes.map(note => (
                                <div className="col-md-4 p-2" key={note._id}>
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between">
                                            <h5>{note.title}</h5>
                                            
                                        </div>
                                        <div className="card-body">
                                            <p>
                                                {note.content}
                                            </p>
                                            <p>
                                                {note.date}
                                            </p>                                   
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-danger " onClick={() => this.deleteNote(note._id)} >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                           
                    </div>

                </div>
                
                <div className="  justify-content-center">
                    <Modal   isOpen={this.state.modal} style={modalStyles}>
                        <ModalHeader>
                            Nueva nota
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup noValidate className="form-group">
                                <Label htmlFor="title">Title</Label>
                                <input
                                    className="form-control-file"
                                    placeholder="title"
                                    type="text"
                                    name="title"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                            <FormGroup noValidate className="form-group">
                                <Label htmlFor="content">Content</Label>
                                <input
                                    className="form-control-file"
                                    placeholder="content"
                                    type="text"
                                    name="content"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                            <FormGroup noValidate className="form-group">
                                <Label htmlFor="grupo">Grupo</Label>
                                <input
                                    className="form-control-file"

                                    placeholder="Grupo"
                                    type="text"
                                    name="grupo"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                            <FormGroup noValidate className="form-group">
                                <Label htmlFor="date">Date</Label>
                                <input
                                    className="form-control-file"
                                    placeholder="Date"
                                    type="date"
                                    name="date"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" onClick={this.onSubmit}className="btn btn-primary">Nueva</Button>
                            <Button type="submit" onClick={this.activarM} className="btn btn-primary">Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                  
                </div>
                
            </div>

        )
    }
}

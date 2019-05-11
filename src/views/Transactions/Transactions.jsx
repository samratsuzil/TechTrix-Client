import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Form
} from "reactstrap";

import { thead, tbody } from "variables/general";
import "./Transactions.css";
import withAuth from "components/Login/withAuth";
import Api from "service/Api";
const api = new Api();
class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      transactions: {},
      projectname : "",
      description : "",
      parentproject :"",
      budget: ""

    };
    this.toggle = this.toggle.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeParent = this.handleChangeParent.bind(this);
    this.handleChangeBudget = this.handleChangeBudget.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    api.getData("/transactions").then(res => {
        console.log(res);
        this.setState({
          transactions: res.data
        });
      
    });
  }

  handleChangeProject(event) {
    this.setState({projectname: event.target.value});
  }
  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }
  handleChangeParent(event) {
    this.setState({parentproject: event.target.value});
  }
  handleChangeBudget(event) {
    this.setState({budget: event.target.value});
  }


  handleSubmit(event) {
    event.preventDefault();
     }
  render() {
    let tdata = Object.entries(this.state.transactions).map( (res)=>{
        let transactions = res[1];
        let transactioninfo = res[1].TransactionInfo
        return (
        <tr>
            {/* <td>{transactions.HashID}</td> */}
            <td>{Date(transactioninfo.CreatedAt)}</td>
            <td>{transactioninfo.Subject}</td>
            <td>{transactioninfo.Body}</td>
            <td>{
              Object.entries(this.state.transactions).map((res)=>{
                if(transactions.ParentHash === res[0]){
                  return(res[1].TransactionInfo.Subject);
                }

              })
              
              }</td>
            <td>{transactioninfo.Amount}</td>
        </tr>);
        }    
    );

    

    return (
      <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader>Add New Transaction</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Project Name:</label>
                  <input
                    type="text"
                    value={this.state.projectname}
                    onChange={this.handleChangeProject}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Description:</label>
                  <textarea
                    value={this.state.description}
                    onChange={this.handleChangeDescription}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Parent Project:</label>
                  <select>
                  {Object.keys(this.state.transactions).map((key)=>{
                    return (
                      <option>{  
                        Object.entries(this.state.transactions).map((res)=>{
                          if(res[0]==key){
                          return (res[1].TransactionInfo.Subject)
                          }
                        })
                      }</option>
                      );
                  })}
                  </select>
                  {/* <input
                    type="textarea"
                    value={this.state.parentproject}
                    onChange={this.handleChangeParent}
                    className="form-control"
                  /> */}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <label>Budget:</label>
                  <input
                    type="textarea"
                    value={this.state.budget}
                    onChange={this.handleChangeBudget}
                    className="form-control"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Transactions
                </CardTitle>
                <i id="addtransaction" className="nc-icon nc-simple-add" onClick={this.toggle} />

                
              </CardHeader>
              <CardBody>
                <div id="transactions">
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                   {tdata}
                  </tbody>
                </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Transactions;

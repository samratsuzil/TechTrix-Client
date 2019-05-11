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
      transactions: {}
    };
    this.toggle = this.toggle.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
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
      console.log(res.data);
      if (res.data.length > 0) {
        this.setState({
          transactions: res.data
        });
      }
    });
  }

  render() {
    console.log(this.state.transactions);
    return (
      <div className="content">
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form>
            <ModalHeader>Add New Transaction</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Team:</label>
                  <input
                    type="text"
                    value={this.state.team}
                    onChange={this.handleChangeTeam}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Country:</label>
                  <input
                    type="text"
                    value={this.country}
                    onChange={this.handleChangeCountry}
                    className="form-control"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>
                Do Something
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
                <CardTitle tag="h4">Transactions</CardTitle>
                <div className="addtransaction right" onClick={this.toggle}>
                  <i className="nc-icon nc-simple-add" />
                </div>
              </CardHeader>
              <CardBody>
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
                    {/* {this.state.transactions.map(key => {
                      return <tr key={key} />;
                    })} */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Transactions;

import React, { Component } from "react";
import Tree from "react-d3-tree";
import Api from "service/Api";
import TransformData from "service/utilities.js";

const api = new Api();

const myTreeData = [
  {
    name: "Metropolitan",
    attributes: {
      Project: "Bharatpur Metropolitan",
      Description: "Bharatpur Metropolitan City Budget",
      Amount: "10000000"
    },
    children: [
      {
        name: "Education",
        attributes: {
          Description: "Education budget Bharatpur Metropolitan City",
          Amount: "1000000"
        },
        children:[
          {
            name: "College Remuneration",
            attributes: {
              Description:
                "College Remuneration budget Bharatpur Metropolitan City",
              Amount: "10000000"
            }
          },
          {
            name: "Scholarship",
            attributes: {
              Description:
                "Scholarship  budget Bharatpur Metropolitan City",
              Amount: "13300000"
            }
          },
        ]
      },
      {
        name: "General Infrastructure",
        attributes: {
          Description:
            "General Infrastructure budget Bharatpur Metropolitan City",
          Amount: "5000000"
        },
        children: [
          {
            name: "Road Infrastructure",
            attributes: {
              Description:
                "Road Infrastructure budget Bharatpur Metropolitan City",
              Amount: "500000"
            }
          },
          {
            name: "Bridges Infrastructure",
            attributes: {
              Description:
                "Bridges Infrastructure budget Bharatpur Metropolitan City",
              Amount: "600000"
            }
          },
        ]
      }
    ]
  }
];

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
    this.getGraph = this.getGraph.bind(this);
  }
  componentDidMount() {
    this.getGraph();
  }

  getGraph() {
    api.getData("/transactions").then(res => {
      //console.log(res.data);

      let t = TransformData(res.data);
      console.log(t);

      this.setState({
        transactions: t
      });
    });
  }
  //this.state.transactions
  render() {
    return (
      <div className="content">
        <div id="treeWrapper" style={{ width: "100em", height: "50em" }}>
          <Tree data={myTreeData} />
        </div>
      </div>
    );
  }
}

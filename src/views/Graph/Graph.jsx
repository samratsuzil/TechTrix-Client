import React, { Component } from "react";
import Tree from "react-d3-tree";
import Api from "service/Api";
import TransformData from "service/utilities.js";

const api = new Api();

const myTreeData = [
  {
    name: "Top Level",
    attributes: {
      keyA: "val A",
      keyB: "val B",
      keyC: "val C"
    },
    children: [
      {
        name: "Level 2: A",
        attributes: {
          keyA: "val A",
          keyB: "val B",
          keyC: "val C"
        }
      },
      {
        name: "Level 2: B"
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

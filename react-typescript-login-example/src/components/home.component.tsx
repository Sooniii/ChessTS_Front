import { Component } from "react";
import React from "react";

import UserService from "../services/user.service";

type Props = {};

type State = {
  content: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data,
        });
        console.log("TEST RESPONSE DATA",response.data)
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
        console.log("CONSOLE LOG ERROR",error);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <p>{}</p>
        </header>
      </div>
    );
  }
}

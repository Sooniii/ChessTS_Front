import { Component, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import {IUser} from "../interfaces/user.type";
//import React from "react";
import * as React from 'react';
import cat from '../img/wp7446337-ugly-cats-wallpapers.jpeg';

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}

export default class Profile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { accessToken: "" }
        };
      }
    
      componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        //if (!currentUser) this.setState({ redirect: "/home" });
        //this.setState({ currentUser: currentUser, userReady: true })
      }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
        <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Profile
              </h3>
            </header>
            <p>
              <strong>Token:</strong>{" "}
              {currentUser.accessToken.substring(0, 20)} ...{" "}
              {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
              <strong>Id:</strong>{" "}
              {currentUser.id}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
              {currentUser.roles &&
                currentUser.roles.map((role: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => <li key={index}>{role}</li>)}
            </ul>
          </div> : null}
          <div className="container">
          <img src={ cat }/>
        </div>
      </div>
    );
  }
}
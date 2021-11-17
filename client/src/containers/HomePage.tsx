import React, { Component } from "react";
import Header from "../components/Header";
import AccountList from "../components/AccountList";

export class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <AccountList />
      </div>
    );
  }
}

export default HomePage;

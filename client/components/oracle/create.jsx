import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

import Editor from '../elements/Editor';
import Btn from '../elements/btn';

import NoMetaMask from '../elements/NoMetaMask';
import wallet from '../../models/wallet';

export default class Oracule extends Component {
  state = {
    id: null,
    title: '',
    description: '',
    email: '',
    done: false
  };

  onTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onEditChange = description => {
    this.setState({ description });
  };

  onSubmit = () => {
    if (wallet.isHaveMetaMast() && wallet.isAuth()) {
      const { title, description, email } = this.state;

      axios
        .post('/api/oracle', {
          title,
          description,
          email
        })
        .then(res => {
          this.setState(
            state => ({
              ...state,
              ...res.data,
              done: true
            }),
            () => {
              wallet.send(1);
            }
          );
        });
    }
  };

  getJoinText() {
    if (wallet.isAuth()) {
      return 'Create';
    } else {
      return 'Sign up to Create'
    }
  }

  render() {
    if (this.state.done) {
      return (
        <Content>
          <Title>Added pull oracles with id: {this.state.id}</Title>
        </Content>
      );
    }

    return (
      <Content>
        <NoMetaMask />
        <Title>Create new pull oracles</Title>
        <Input onChange={this.onTitleChange} placeholder="Title" />
        <Input onChange={this.onEmailChange} placeholder="Email" />
        <Editor canEdit={false} onChange={this.onEditChange} />
        <div>
          <Btn title={this.getJoinText()} onClick={this.onSubmit} />
        </div>
      </Content>
    );
  }
}

const Cont = styled.div`
  flex-grow: 1;
`;

const Content = styled.div`
  padding-top: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.color.icons.main};
  outline: none;
  padding: 10px;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 4px;
`;

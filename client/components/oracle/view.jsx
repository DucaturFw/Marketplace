import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Modal from 'react-modal';

import Editor from '../elements/Editor';
import Btn from '../elements/btn';
import NoMetaMask from '../elements/NoMetaMask';

import wallet from '../../models/wallet';

const CONTRACT_URL = 'https://raw.githubusercontent.com/DucaturFw/elastico/master/contracts/elastico.sol';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    border: '1px solid #ddd',
    boxShadow: '0px 11px 30px 1px rgba(0,0,0,0.32)'
  }
};

export default class Oracule extends Component {
  state = {
    title: '',
    description: '',
    email: '',
    contract: '',
    showContrcat: false,
    isLoaded: false,
    modalIsOpen: true,
    isAgree: false
  };

  componentDidMount() {
    const { id } = this.props;

    axios.get(`/api/oracle/${id}`).then(res => {
      this.setState(state => ({
        ...state,
        isLoaded: true,
        ...res.data
      }));
    });

    axios.get(CONTRACT_URL).then(res => {
      this.setState(state => ({
        ...state,
        contract: res.data
      }));
    })
  }

  handleCheckbox = (e) => {
    this.setState(state => ({
      ...state,
      isAgree: !state.isAgree
    }))
  }

  onShowPopup = () => {
    if (wallet.isAuth()) {
      this.setState({ modalIsOpen: true })
    }
  }

  onJoin = () => {
    if (wallet.isAuth()) {
      wallet.send(0.1);
    }
  };

  onBuy = () => {
    this.setState(state => ({
      ...state,
      showContrcat: true
    }));
  };

  setCode(code) {
    const filename = 'custom.sol';
    const config = `{"left-offset":205,"right-offset":252,"terminal-top-offset":694,"currentFile":"browser/${filename}","autoCompile":false}`;

    window.localStorage.setItem(`sol:${filename}`, code);
    window.localStorage.setItem('sol:.remix.config', config);

    document.getElementById('remix').contentWindow.location.reload();
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  getJoinText() {
    if (wallet.isAuth()) {
      return 'Join';
    } else {
      return 'Sign up to Join'
    }
  }

  render() {
    const { id } = this.props;

    if (!this.state.isLoaded) {
      return (
        <Content>
          <Title style={{ marginTop: '150px' }}>
            <Icon
              name={'spinner'}
              size={'4x'}
              spin
            />
          </Title>
        </Content>
      )
    }

    return (
      <Content>
        <NoMetaMask />
        <Title>Oracle: {id}</Title>
        <Header>{this.state.title}</Header>
        <Header>{this.state.email}</Header>
        <ReactMarkdown source={this.state.description} />
        <Actions>
          <Btn title={this.getJoinText()} onClick={this.onShowPopup} />
          <Btn title={'Connect'} onClick={this.onBuy} />
        </Actions>
        <Popover show={this.state.showContrcat}>
          <IDE
            id="remix"
            src={'/remix/'}
          />
        </Popover>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <ModalCont>
            <ModalTitle>Join to Oracle</ModalTitle>
            <ModalText
              readonly="readonly">
              Ducatur is beta software. Do not use it in main net!
            </ModalText>
            <ModalLabel>
              <Checkbox type="checkbox" name="agree" onChange={this.handleCheckbox} checked={this.state.isAgree} />
              I agree
            </ModalLabel>
            <Actions style={{ marginTop: '20px' }}>
              <Btn title="Join" onClick={this.onJoin} disabled={!this.state.isAgree} />
            </Actions>
          </ModalCont>
        </Modal>
      </Content>
    );
  }
}


const Icon = styled(FontAwesome) `
  color: ${props => props.theme.color.background.main};
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

const Header = styled.div`
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

const Actions = styled.div`
  margin-top: 50px;
  display: flex;
`;

const Popover = styled.div`
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: ${props => props.show ? 'block' : 'none'};
`;

const IDE = styled.iframe`
  width: 100%;
  height: 100%;
`;

const ModalCont = styled.div`
  width: 450px;
  height: 350px;
  font-size: 14px;
`;

const ModalText = styled.textarea`
  resize: none;
  width: 100%;
  height: 180px;
  border: 1px solid #eee;
`

const ModalTitle = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const ModalLabel = styled.label`
  display: block;
  margin-top: 10px;
`;

const Checkbox = styled.input`
  font-size: 16px;
  position: relative;
  top: -0.1rem;
  margin: 0 1rem 0 0;
  cursor: pointer;

  &:before {
    transition: all 0.3s ease-in-out;
    content: "";
    position: absolute;
    left: 0;
    z-index: 1;
    width: 1.6rem;
    height: 1.6rem;
    border: 2px solid #f2f2f2;
  }

  &:checked:before {
    transform: rotate(-45deg);
    height: .5rem;
    border-color: #009688;
    border-top-style: none;
    border-right-style: none;
  }

  &:after {
    content: "";
  position: absolute;
    top: -0.325rem;
    left: 0;
    width: 1.6rem;
    height: 1.6rem;
    background: #fff;
    cursor: pointer;
  }
`;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

export default class Marketplace extends Component {

  state = {
    oracles: [],
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(`/api/oracle`).then(res => {
      const { oracles } = res.data;

      this.setState({ oracles, isLoaded: true });
    });
  }

  get items() {
    return this.state.oracles.map((item, idx) => {
      return (
        <StyleLink
          key={idx}
          to={`/oracle/${item.id}`}
        >
          <Item delay={idx}>
            <SmallTitle>
              {item.title}
            </SmallTitle>
            <Icon name="bitcoin" size="4x" color="gray" />
          </Item>
        </StyleLink>
      );
    });
  }

  render() {

    if (!this.state.isLoaded) {
      return (
        <Content>
          <Title style={{ marginTop: '150px' }}>
            <Icon
              name={'spinner'}
              size={'2x'}
              spin
            />
          </Title>
        </Content>
      )
    }

    return (
      <div>
        <Content>
          <Title>Oracles Ledger</Title>
        </Content>
        <List>{this.items}</List>
      </div>
    );
  }
}

const List = styled.div`
  font-size: 1.4rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(4, 1fr);
`;
const Item = styled.div`
  position: relative;
  height: 150px;
  background-color: ${props => props.theme.color.background.gray};
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transform: translateY(2.4rem);
  animation: oracleCardIn 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
  animation-delay: ${props => (props.delay ? props.delay * 0.05 : 0)}s;
`;
const Icon = styled(FontAwesome) `
  color: ${props => props.color && props.color === 'gray' ? props.theme.color.icons.main : props.theme.color.background.main};
  text-decoration: none;
`;

const Content = styled.div`
position: relative;
  text-align: center;
  height: 100px;
  padding-top: 50px;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const SmallTitle = styled.h4`
  position: absolute;
  text-align: center;
  font-size: 1.5rem;
  color: inherit;
  text-decoration: none;

  top: 5px;
  width: 100%;

  z-index: 1;
`;

const StyleLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

export default class Marketplace extends Component {

  state = {
    oracles: []
  }

  componentDidMount() {
    axios.get(`/api/oracle`).then(res => {
      let { oracles } = res.data;

      this.setState({ oracles });
    });
  }

  get items() {
    return this.state.oracles.map((item, idx) => {
      return (
        <StyleLink
          key={idx}
          to={`/patent/${item.id}`}
        >
          <Item delay={idx}>
            <PatentNumber>
              ПАТЕНТ №{item.patent_id}
            </PatentNumber>
            <SmallTitle>
              {item.title}
            </SmallTitle>
          </Item>
        </StyleLink>
      );
    });
  }

  render() {
    return (
      <div>
        <Content>
          <Title>Список патентов</Title>
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
  justify-content: center;
  align-items: center;

  opacity: 0;
  transform: translateY(2.4rem);
  animation: oracleCardIn 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
  animation-delay: ${props => (props.delay ? props.delay * 0.05 : 0)}s;
  
  grid-template-columns: 10px auto 10px;
  grid-template-rows: 20px auto 10px;

  padding: 1px;  
  padding-left: 10px;
  padding-right: 10px;
`;
const Icon = styled(FontAwesome) `
  color: ${props => props.theme.color.icons.main};
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

const PatentNumber = styled.h4`
  margin-top: 10px;
  text-align: center;
  font-size: 1.6rem;
  color: inherit;
  text-decoration: none;

`;
const SmallTitle = styled.div`
  margin-top: 10px;
  text-align: center;
`

const StyleLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;

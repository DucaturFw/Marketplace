import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../elements/logo';
import Wrapper from '../elements/Wrapper';

export default class Footer extends Component {
  render() {
    return (
      <Cont>
        <Wrapper>
          <Inner>
            <Left>
              <List>
                <Item>
                  <Linker>Патенты</Linker>
                </Item>
                <Item>
                  <Linker>Вопросы</Linker>
                </Item>
                <Item>
                  <Linker>Помощь</Linker>
                </Item>
                <Item>
                  <Linker>Поддержка</Linker>
                </Item>
              </List>
              <List>
                <Item>
                  <Linker>О компании</Linker>
                </Item>
                <Item>
                  <Linker>Пресса</Linker>
                </Item>
                <Item>
                  <Linker>Разработчикам</Linker>
                </Item>
              </List>
            </Left>
            <Right>
              <StyleLink to={'/'}>
                <Logo />
                <Title>Роспатент</Title>
              </StyleLink>
            </Right>
          </Inner>
          <Politics>
            <Linker>Условия использования</Linker>
            <Linker>Информация о сайте</Linker>
          </Politics>
        </Wrapper>
      </Cont>
    );
  }
}

const Cont = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 220px;
  font-size: 1.4rem;
  background-color: ${props => props.theme.color.background.main};
  margin-top: 50px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 30px auto 0;
`;

const Right = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const Title = styled.h4`
  font-weight: 400;
`;

const Left = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const Item = styled.li`
  font-size: 1.5rem;
  margin-top: 5px;
`;
const Linker = styled.a`
  cursor: pointer;
  margin: 0 2.4rem;
`;

const Politics = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyleLink = styled(Link) `
  text-decoration: none;
  color: inherit;
`;

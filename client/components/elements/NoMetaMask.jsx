import React, { Component } from 'react';
import styled from 'styled-components';

import wallet from '../../models/wallet';

export default function Main({ children }) {

    if (!wallet.isHaveMetaMast()) {
        return (
            <Error>
                To continue you need install <a href="https://metamask.io/" target="_black">MetaMask</a>.
            </Error>
        );
    }

    if (!wallet.isAuth()) {
        return (
            <Warning>
                To continue you sign in to <a href="https://metamask.io/" target="_black">MetaMask</a>.
            </Warning>
        );
    }

    return null;
}

const Cont = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
`;

const Error = styled(Cont) `
  background: ${props => props.theme.color.background.red};
`;


const Warning = styled(Cont) `
  background: ${props => props.theme.color.background.yellow};
`;

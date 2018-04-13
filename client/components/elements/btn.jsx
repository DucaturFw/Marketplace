import React, { Component } from 'react';
import styled from 'styled-components';

const noop = () => { }

export default function Main({ onClick, title, disabled }) {
  return <Action onClick={disabled ? noop : onClick} disabled={disabled}>{title}</Action>;
}

const Action = styled.button`
  width: 200px;
  text-align: center;
  margin: 0 auto;
  font-size: 2rem;
  padding: 1.25rem 2.5rem;
  display: block;
  color: #ffffff;
  cursor: ${props => props.disabled == true ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.disabled == true ? '#ddd' : '#009ac9'};
  border: 1px solid transparent;
  font-weight: 300;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${props => props.disabled == true ? '#ddd' : '#ffffff'};
    color: ${props => props.disabled == true ? '#ffffff' : '#009ac9'};
    border-color: ${props => props.disabled == true ? 'transparent' : '#009ac9'};
  }
`;

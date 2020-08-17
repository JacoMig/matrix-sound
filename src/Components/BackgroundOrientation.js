import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icon from '../images/exchange.svg';

const BackGround = styled.div`
position: fixed;
background: black;
width: 100vw;
display: flex;
height: 100vh;
flex-direction: column;
justify-content: center;
`

const Text = styled.p`
    color: white;
    font-size: 24px;
    text-align: center;
`

const Img = styled.img`
    width: 50%;
    margin: 0 auto;
    display: block;
`


const BackgroundOrientation = props => {
    return (
        <BackGround>
            <Img src={icon} />
            <Text>
                Please use landscape orientation
            </Text>
        </BackGround>
    );
};

BackgroundOrientation.propTypes = {
    
};

export default BackgroundOrientation;
import React, {useState, useEffect} from 'react';
import * as THREE from 'three';
import styled from 'styled-components'

const FaderDIV = styled.div`

`

const FaderINPUT = styled.input`
    -webkit-appearance: slider-vertical;
    background: white;
`

const Fader = () => {
    
    const handleChange = (e) => {
        
    }

    useEffect(() => {
        
    }, [])
    
    return  <FaderDIV>
                <FaderINPUT onChange={handleChange} name="attack" type='range' min={0} max={10}/>
                <FaderINPUT onChange={handleChange} name="release" type='range' min={0} max={10}/>
            </FaderDIV>
}

export default Fader
import React, {useEffect} from 'react';
import styled from 'styled-components'
// import Fader from './Fader'

const Rack = styled.div`
    border: 1px solid slategrey;
    border-radius: 4px;
    width: 64%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 25px;
    z-index: 200;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const Title = styled.h3`
    color: white;
    position: absolute;
`

const FaderINPUT = styled.input`
    -webkit-appearance: slider-vertical;
    background: white;
    height: 100%;
    width: 20px;
`

const Envelope = ({setEnvelope, envelope}) => {
    
    const handleChange = (e) => {
        const name = e.target.name
        let value = name !== 'sustain' ? (e.target.value/100) + 0.01 : e.target.value
        console.log(name)
        /* if(e.target.value === 0){
            value = 0.01
        }else {
            value = e.target.value
        } */

        setEnvelope(state => ( {...state, [name]: Number(value)}))    
        
    }

    useEffect(() => {
       
    },[])
    
    return (
        <Rack className="enveloper-rack">
            <Title>Envelope</Title>
            <FaderINPUT onChange={handleChange} name="attack" defaultValue={0}  type='range' min={0} max={200}/>
            <FaderINPUT onChange={handleChange} name="decay" defaultValue={0} type='range' min={0} max={200}/>
            <FaderINPUT onChange={handleChange} name="sustain" defaultValue={1} type='range' min={0} max={10}/>
            <FaderINPUT onChange={handleChange} name="release" defaultValue={0} type='range' min={0} max={400}/>
        </Rack>
    )    

};

export default Envelope;
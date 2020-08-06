import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
// import Fader from './Fader'
import Knob from './Knob';
import Slider from 'react-rangeslider';

const Rack = styled.div`
    width: 150px;
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
top: -45px;
position: absolute;
right: 0;
left: 0;
text-align: center;
`
/* const FaderContainer = styled.div`
    h4 {
        color: white;
        padding: 0;
        margin: 0;
    }
` */

const FaderINPUT = styled.input`
    -webkit-appearance: none;
    height: 20px;
    width: 100%;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    border: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
    transform: rotateZ(-90deg);
    &:hover {
        opacity: 1;
    };
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background: white;
        cursor: pointer;
    };
    &::-webkit-slider-runnable-track {
        background: rgba(${props => props.colorTrack}, 0,108);
        border: 0;
        width: 100%;
        height: 20px;
        transition: background .3s;
    }
    
`

const Envelope = ({setEnvelope, envelope}) => {
    const [colorTrack, setColorTrack] = useState({'attack': 0, 'release': 0});
    
    const handleChange = (e) => {
        console.log(e.target.value)
        const val = e.target.value;
        const name = e.target.name;
        let value = e.target.name !== 'sustain' ? (val/5) + 0.01  : val
        // console.log(val)
        setEnvelope(state => ( {...state, [name]: Number(value.toFixed(3))}))
        setColorTrack(state => ({...state, [name]: Math.floor(val*10)}))
    }

    useEffect(() => {
       
    },[])
    
    return (
        <Rack className="enveloper-rack">
            <Title>Envelope</Title>
            {/* <div className='slider orientation-reversed'>
            <div className='slider-vertical'>
            <Slider
              min={0}
              max={20}
              value={envelope.attack}
              orientation='vertical'
              onChange={(val) => handleChange(val, 'attack')}
            />
            </div>
            </div> */}
            {/* <Knob
                numTicks={8}
                degrees={220}
                min={0}
                max={20}
                value={envelope.attack}
                size={35}
                onChange={(val) => handleChange(val, 'attack')}
            />
            <Knob
                numTicks={8}
                degrees={220}
                min={0}
                max={30}
                value={envelope.release}
                size={35}
                onChange={(val) => handleChange((val*2), 'release')}
            /> */}
            
                <FaderINPUT onChange={handleChange} colorTrack={colorTrack.attack} name="attack" defaultValue={0}  type='range' min={0} max={20}/>
            
            
           {/*  <FaderINPUT onChange={handleChange} name="decay" defaultValue={0} type='range' min={0} max={200}/>
            <FaderINPUT onChange={handleChange} name="sustain" defaultValue={1} type='range' min={0} max={5}/> */}
            <FaderINPUT onChange={handleChange} colorTrack={colorTrack.release} name="release" defaultValue={0} type='range' min={0} max={30}/>
        </Rack>
    )    

};

export default Envelope;
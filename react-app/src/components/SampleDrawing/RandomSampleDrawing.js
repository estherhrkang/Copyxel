import { useRef } from 'react';
import styles from '../../css-modules/RandomSampleDrawing.module.css';

import appletree from '../../assets/samples/appletree.png';
import balloon from '../../assets/samples/balloon.png';
import bird from '../../assets/samples/bird.png';
import butterfly from '../../assets/samples/butterfly.png';
import cactus from '../../assets/samples/cactus.png';
import fire from '../../assets/samples/fire.png';
import flower from '../../assets/samples/flower.png';
import hedgehog from '../../assets/samples/hedgehog.png';
import house from '../../assets/samples/house.png';
import ladybug from '../../assets/samples/ladybug.png';
import rainbow from '../../assets/samples/rainbow.png';
import rose from '../../assets/samples/rose.png';
import ship from '../../assets/samples/ship.png';
import strawberry from '../../assets/samples/strawberry.png';
import watermelon from '../../assets/samples/watermelon.png';
import xmastree from '../../assets/samples/xmastree.png';

export default function RandomSampleDrawing() {

    const samples = [
        appletree, balloon, bird, butterfly, 
        cactus, fire, flower, hedgehog, 
        house, ladybug, rainbow, rose,
        ship, strawberry, watermelon, xmastree
    ];
    const randomIdx = useRef(Math.floor(Math.random() * (samples.length - 1)));
    const randomSample = samples[randomIdx.current];   
    console.log('randomIdx', randomIdx); 
    console.log('randomSample', randomSample); 

    return (
        <div>
            <img src={randomSample} alt='sample drawing' className={styles.sampleImg}/>
        </div>
    );
};
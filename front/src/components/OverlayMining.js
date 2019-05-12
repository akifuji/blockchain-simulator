import React, { Component } from 'react'
import { Keyframes, animated, config } from 'react-spring/renderprops'
import './App.css';

// downloaded icons from https://www.flaticon.com

const Content = Keyframes.Spring(async next => {
    // None of this will cause React to render, the component renders only once :-)
    while (true) {
        await next({
            from: { width: 20, height: 20, transformOrigin: "0% 100%"},
            config: config.default,
            transform:
                'rotate(0deg)',

        })
        await next({
            config: config.default,
            transform:
                'rotate(35deg)',
        })
    }
});


class OverlayMining extends Component {
    render() {
        return (
                <Content native>
                    {props => (
                        <animated.svg
                            className="StateIconBottomRight"
                            style={{ ...props }}
                            viewBox="0 0 512 512"
                            fill="black"
                            stroke="darkblue"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="0.5">
                            <path d="M350.648,61.604C257.17-1.187,141.054-15.98,36.878,17.25l-2.229,26.827
		c84.846,9.292,167.722,40.71,239.293,94.225L350.648,61.604z"/>
	<path d="M450.4,161.346l-76.707,76.708c53.524,71.58,84.933,154.447,94.233,239.302l26.828-2.239
		C527.984,370.949,513.191,254.825,450.4,161.346z"/>
	<path d="M440.352,112.543L399.461,71.65c-7.244-7.236-18.975-7.236-26.211,0l-84.837,84.838l67.102,67.102
		l84.837-84.837C447.589,131.517,447.589,119.787,440.352,112.543z"/>
	<path d="M6.389,451.197c-8.52,8.52-8.52,22.324,0.009,30.853l23.556,23.556c8.52,8.52,22.324,8.52,30.844,0
		l270.424-270.415l-54.409-54.41L6.389,451.197z"/>
                        </animated.svg>
                    )}
                </Content>
        );
    }
}

OverlayMining.defaultProps = {
    duration: 500
};


export default OverlayMining;

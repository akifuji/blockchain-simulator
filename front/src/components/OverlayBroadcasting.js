import React, { Component } from 'react'
import { Keyframes, animated } from 'react-spring/renderprops'
import './App.css';

const Content = Keyframes.Spring(async next => {
    // None of this will cause React to render, the component renders only once :-)
    while (true) {
        await next({
            from: { width: 40, height: 40 },
            config: { duration: 100 },
            transform:
                'scale(1)',

        })
        await next({
            config: { duration: 700 },
            transform:
                'scale(2)'
        })
    }
});


class OverlayBroadcasting extends Component {
    render() {
        const { stroke } = this.props;

        return (
            <Content native>
                {(props) => (
                    <animated.svg
                        className="StateIconOverlay"
                        style={{ ...props }}
                        viewBox="0 0 40 40"
                        fill="none"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2">
                        <circle cx="20" cy="20" r="18" />
                    </animated.svg>
                )}
            </Content>
        );
    }
}

OverlayBroadcasting.defaultProps = {
    duration: 500,
};


export default OverlayBroadcasting;

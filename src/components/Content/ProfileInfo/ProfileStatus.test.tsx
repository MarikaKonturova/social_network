import React from "react";
import {create} from 'react-test-renderer'
import {ProfileStatus} from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test(('Status from props should be in state'), () => {
        const component = create(<ProfileStatus status={'It-kamasutra.com'} updateUserStatus={() => {
        }}/>)
        const instance = component.getInstance()
        // @ts-ignore
        let span = component.root.findByType('span')
        expect(span).not.toBeNull()
        // @ts-ignore
        expect(instance.state.status).toBe('It-kamasutra.com')


    })
    test(('Input should not be displayed after creation '), () => {
        const component = create(<ProfileStatus status={'It-kamasutra.com'} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        expect(() => {
            let input = root.findByType('input')
        }).toThrow();

    })
    test(('Input should be displayed after DoubleClick '), () => {
        const component = create(<ProfileStatus status={'It-kamasutra.com'} updateUserStatus={() => {
        }}/>)
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')

        expect(input.props.value).toBe('It-kamasutra.com')

    })
})
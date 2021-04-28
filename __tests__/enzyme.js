import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import toJson from 'enzyme-to-json';

import SearchContainer from '../client/components/SearchContainer';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
    describe('SearchContainer', () => {
        let wrapper;
        const props = {
            //not sure about including the set methods here....
            zip: '',
            setZip: '',
            gState: '',
            setGState: '',
        };

        beforeAll(() => {
            wrapper = shallow(<SearchContainer {...props} />)
        });

        it('renders a <div> tag with the className of zip-search', () => {
            expect(wrapper.type()).toEqual('div');
        });

        it('should contain an <h1> element', () => {
            expect(wrapper.contains(<h1>Enter Your ZIP to search, or click on the map below</h1>)).toEqual(true);
        });

        // it('should contain a form with two inputs', () => {

        // })

    });
})




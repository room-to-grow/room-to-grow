/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
// import { configure, shallow } from 'enzyme';  //  ERROR -> Cannot find module 'enzyme-adapter-react-16' from '__tests__/enzyme.js'
// eslint-disable-next-line max-len
// import Adapter from 'enzyme-adapter-react-16';  //  ERROR -> Cannot find module 'enzyme-adapter-react-16' from '__tests__/enzyme.js'

// import toJson from 'enzyme-to-json';

import SearchContainer from '../client/components/SearchContainer';

// configure({ adapter: new Adapter() });  //  ERROR -> ReferenceError: Adapter is not defined

describe('React unit tests', () => {
  describe('SearchContainer', () => {
    let wrapper;
    const props = {
      // not sure about including the set methods here....
      zip: '',
      setZip: '',
      gState: '',
      setGState: '',
    };

    beforeAll(() => {
      wrapper = shallow(<SearchContainer {...props} />);
    });

    xit('renders a <div> tag with the className of zip-search', () => {
      expect(wrapper.type()).toEqual('div');
    });

    xit('should contain an <h1> element', () => {
      expect(wrapper.contains(<h1>Enter Your ZIP to search, or click on the map below</h1>))
        .toEqual(true);
    });

    // it('should contain a form with two inputs', () => {

    // })
  });
});

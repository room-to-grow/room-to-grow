import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';



configure({ adapter: new Adapter() });

import App from '../components/App.js';
import FamilyList from '../components/FamilyList';
import Favorites from '../components/Favorites';
import USMap from '../components/USMap'; 

//list of things to test:

//before test we need to initialize a dummy state

//1. number of li items matches the length familiesData
//2. verify that button invokes setFamily method
//3. setFamily method changes family state
//4. test that useEffect is not getting invoked when gState.name is null
        // -the useEffect method is getting invoked when gState.name is not null
//

describe('React App TEST', () => {
  describe('FamilyList', () => {
    let wrapper;
    const props = {
      familiesData: [1,2,3,4,5,6,7,8,9,10],
      gState: {
        slug: 'slug', 
        name: 'Georgia',
      },
      setFamily: () => {
        return 'setFamily works'; 
      }, 
      setPlant: () => {
        return 'setPlant works';
      }, 
      setPlantDetails: () => {
        return 'setPlantDetails works'; 
      },
    }
    beforeAll(() => {
      wrapper = shallow(<FamilyList {...props} />)
    })

    it('should render a list populated with whatever is passed into familiesData', () => {
      
      // const listArr = wrapper.find('li').getElements();
      // for(let i = 0; i < listArr.length; i += 1) {
      //   expect(listArr[i])
      // }
      // expect(wrapper.setFamily()).toEqual
      // expect(wrapper.find('li').getElements().length).toEqual(10);
      expect(wrapper.containsMatchingElement(<button className="list-buttons"></button>)).toEqual(true)
      expect(wrapper.contains(<FamilyList gState='Georgia' />)).toEqual(true)
    })

  })
})


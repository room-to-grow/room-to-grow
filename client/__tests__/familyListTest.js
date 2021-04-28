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
      setFamily: (arg) => {
        return 'setFamily works' + arg; 
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

    // beforeEach(() )

    it('should render a list of buttons populated with whatever is passed into familiesData', () => {
      
      // const listArr = wrapper.find('li').getElements();
      for(let i = 0; i < 10; i += 1) {
        expect(wrapper.containsMatchingElement(<button className="list-buttons">{i}</button>));
      }
      // expect(wrapper.setFamily()).toEqual
      // expect(wrapper.find('li').getElements().length).toEqual(10);
      // expect(wrapper.containsMatchingElement(<button className="list-buttons">1</button>)).toEqual(true)
      //expect(wrapper.contains(<button className = "list-buttons" />)).toEqual(true)
    })

    // it('should invoke setFamily, setPlant, and setPlantDetails when a button is clicked', () => {
    //   // const mockCallback = jest.fn(); 
    //   // const tempWrapper = shallow(<FamilyList {...props}/>)
    //   const newWrapper = shallow(<button onClick={() => {setFamily(props.familiesData[0])}}></button>)
    //   // tempWrapper.find('.list-buttons').simulate('click')
    //   newWrapper.simulate('click')
    //   // wrapper.find('button').simulate('click'); 
    //   expect(setFamily()).toHaveBeenCalled(); 
    // })

  })
})

/*
describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

*/


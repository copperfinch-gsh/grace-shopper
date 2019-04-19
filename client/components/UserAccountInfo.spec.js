/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { UserAccountInfo } from './UserAccountInfo';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('UserAccountInfo', () => {
  let userAccountInfo;

  beforeEach(() => {
    userAccountInfo = shallow(<UserAccountInfo user={{ firstName: 'Cody' }} />);
  });

  it('renders the name in an h3', () => {
    expect(userAccountInfo.find('h3').text()).to.be.equal('Welcome Cody!');
  });
});

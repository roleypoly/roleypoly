import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import enableHooks from 'jest-react-hooks-shallow';

Enzyme.configure({ adapter: new Adapter() });

// pass an instance of jest to `enableHooks()`
enableHooks(jest);

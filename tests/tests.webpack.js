import Enzyme, { render, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '../dist/pilipa.min.css'
Enzyme.configure({ adapter: new Adapter() })
const context = require.context('./', true, /\.spec.js$/)
context.keys().forEach(context)

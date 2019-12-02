const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const Library = require('../index');

const { expect } = chai;

chai.use(sinonChai);

let library;

// Replace with actual tests
describe('Library', () => {
  beforeEach(() => library = new Library());

  it("should get the library's name", () => {
    const spy = sinon.spy(library, '_getName');
    const name = library._getName();
    expect(name).to.eql('example-lib');
    spy.restore();
    expect(spy).to.have.been.called;
  });
});

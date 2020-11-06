const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')
const { app } = require('electron')

describe('Application launch', function () {
  this.timeout(10000)

  before(() => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  after(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', async () => {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  });
  it('shows title', async () => {
    const title = await this.app.client.getText('#title');
    return assert.equal(title, 'Basic Calculator');
  })
  it('should input numbers and perform addition', async () => {
    await this.app.client.element('//input[@id="num1"]').setValue("1234");
    await this.app.client.element('//input[@id="num2"]').setValue("1234");
    await this.app.client.element('//button[@id="add"]').click();
    return this.app.client.getText('#result').then(function (value) {
        assert.equal(value, '2468.0')
    })
  });
  it('should handle big integers', async () => {
    await this.app.client.element('//input[@id="num1"]').setValue("123456789009876543211234567890");
    await this.app.client.element('//input[@id="num2"]').setValue("123456789009876543211234567890");
    await this.app.client.element('//button[@id="add"]').click();
    return this.app.client.getText('#result').then(function (value) {
        assert.equal(value, '2.469135780197531e+29')
    })
  });
  it('should handle scientific notation', async () => {
    await this.app.client.element('//input[@id="num1"]').setValue("1.2e+2");
    await this.app.client.element('//input[@id="num2"]').setValue("1.2e-3");
    await this.app.client.element('//button[@id="add"]').click();
    return this.app.client.getText('#result').then(function (value) {
        assert.equal(value, '120.0012')
    })
  });
  it('should handle infinity', async () => {
    await this.app.client.element('//input[@id="num1"]').setValue("inf");
    await this.app.client.element('//input[@id="num2"]').setValue("-inf");
    await this.app.client.element('//button[@id="add"]').click();
    return this.app.client.getText('#result').then(function (value) {
        assert.equal(value, 'Undefined Expression!')
    })
  });
})
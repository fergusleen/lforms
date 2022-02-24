import { TestPage } from "./lforms_testpage.po";
import TestUtil from "./util";
import { browser, logging, element, by, WebElementPromise, ExpectedConditions } from 'protractor';
import { AddFormToPageTestPage } from "./addFormToPageTest.po"
let LForms: any = (global as any).LForms;
let tp: TestPage = new TestPage();
let po = new AddFormToPageTestPage();


describe('addFormToPage test page', function() {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it('should have two forms displayed on the page', function() {
    po.openPage();
    // three tags
    element.all(by.tagName('wc-lhc-form')).then(function (items) {
      expect(items.length).toBe(3);
    });
    // two forms
    element.all(by.css('.lhc-form-title')).then(function (items) {
      expect(items.length).toBe(2);
    });

  });

  it('should have a drug name field in the RxTerms form', function() {
    expect(po.rxDrugNameField.isDisplayed()).toBeTruthy();
    TestUtil.sendKeys(po.rxDrugNameField, 'ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
  });


  it('should have a drug name field in the "full featured" form', function() {
    po.ffDrugNameField.click();
    expect(po.searchResults.isDisplayed()).toBeFalsy();
    expect(po.ffDrugNameField.isDisplayed()).toBeTruthy();
    TestUtil.sendKeys(po.ffDrugNameField, 'ar');
    browser.wait(function() {
      return po.searchResults.isDisplayed();
    }, tp.WAIT_TIMEOUT_1);
  });

  it('DTM datetime picker should work', function () {
    var minMax:Array<any> = [TestUtil.getCurrentDTMString(-60000), TestUtil.getCurrentDTMString(+60000)]; // -/+ a minute
    po.openPage();
    let dtmInput = element(by.id('/type7/1')).element(by.css("input"));
    let nowButton = element(by.css(".ant-picker-now-btn"));
    let okButton = element(by.css(".ant-picker-ok")).element(by.css("button"))
    dtmInput.click()
    nowButton.click()
    okButton.click()
    expect(dtmInput.getAttribute("value")).toBeGreaterThanOrEqual(minMax[0]);
    expect(dtmInput.getAttribute("value")).toBeLessThanOrEqual(minMax[1]);

  });

  describe('addFormToPage', function () {
    beforeEach(function(done) {
      po.openPage();
      // Pre-condition -- Form USSG-FHT should not be in formContainer
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") === -1');
      }, tp.WAIT_TIMEOUT_2);
      browser.driver.executeAsyncScript(
          "var callback = arguments[arguments.length - 1];" +
          "$.getJSON('/test-data/form-data/FHTData.json', function(FHTData) {window.FHTData = FHTData; callback();})"
      ).then(function() {
        done()
      });
    });

    it('should be able to be called with FHIR Questionnaire', function () {
      // Put form USSG-FHP on the page using a FHIR object
      browser.driver.executeAsyncScript(function () {
        var callback = arguments[arguments.length - 1];
        fetch('/test-data/e2e/R4/ussg-fhp.json')
        .then(function(response) { 
          return response.json();
        })
        .then(function(fhirData) {
          LForms.Util.addFormToPage(fhirData, 'formContainer', { fhirVersion: 'R4' }); 
          callback(); 
        });
      }).then(function () {
        // Confirm it is there
        TestUtil.waitForElementPresent(element(by.css(".lhc-form-title")));
        expect(element(by.id('formContainer')).getText()).toContain("US Surgeon General family health portrait");
      });
    });

    it('should be able to called a second time with a new form for the same form '+
       'container', function() {
      // Now put form USSG-FHT on the page, using the variable name method
      // (FHTData).
      browser.driver.executeScript(
          "LForms.Util.addFormToPage('FHTData', 'formContainer');"
          );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a form object',  function() {
      // Now put form USSG-FHT on the page, using the form object method
      browser.driver.executeScript(
          "LForms.Util.addFormToPage(FHTData, 'formContainer');"
      );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to take a JSON form definition',  function() {
      // Now put form USSG-FHT on the page, using the form JSON string method
      browser.driver.executeScript(
          "LForms.Util.addFormToPage(JSON.stringify(FHTData), 'formContainer')"
      );
      // Confirm it is there
      browser.wait(function() {
        return browser.driver.executeScript(
          'return $("#formContainer").html().indexOf("USSG-FHT") >= 0');
      }, tp.WAIT_TIMEOUT_2);
    });

    it('should be able to display a very nested form', function() {
      tp.loadFromTestData('very-nested-form.json'); // uses addFormToPage
      // Make sure the error message div is blank
      expect(element(by.id('loadMsg')).getText()).toBe('');
    });
  });
});

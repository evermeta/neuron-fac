/******************************************************************************
 * 
 * 
 * *****************************************************************************/
import { expect } from 'chai';
import * as dotenv from 'dotenv' 
// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
/*******************************************************************************/

import { thisPage } from '../../../../src/utils/process/types';
/*******************************************************************************/

dotenv.config()
/*******************************************************************************/
const testSuite = async ()=>{
    describe('nameOfPage', () => {
        it('should return the name of the page', () => {
            expect(thisPage()).to.deep.eq('types-test');
        });
    });
}

describe("Variable Environments", () => {
    it("My .env file contains the test variable 'TEST_VAR'", () => {
        expect(process.env.TEST_VAR).to.eq("test");
    });
});


if(process.env.GITHUB_TOKEN) {
    console.log(`GITHUB_TOKEN is set for tests at ${thisPage()}`);
    testSuite();
} else {
    console.log([
        `This test suite in ${thisPage()} can't run because GITHUB_TOKEN is not set` ,
        "Please set GITHUB_TOKEN in your .env file"].join(''))
}
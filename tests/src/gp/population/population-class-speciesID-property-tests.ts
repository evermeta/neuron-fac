import { expect } from "chai";
import { Program } from "../../../../src/gp/programs/program-class";

// eslint-disable-next-line no-undef
describe("population, making a new instance", () => {
    // eslint-disable-next-line no-undef
    it("A population can be built without a species ID in its building options", () => {
        
        const program = new Program(
            "js", 
            { a: { index: 0, type: "number" } }, 
            "number","");
        expect(program.ID).to.be.a("string");
        expect(program.ID.length).to.be.eq(36);
    });

    it(`However, if there is a speciesID in its building options, it will only store 
    programs that contain that speciedID`, () => {
        const program = new Program("js", { a: { index: 0, type: "number" } }, 
            "number",
            "", 
            { speciesID: "foo" });

        expect(program.ID).to.be.a("string");
        expect(program.ID.length).to.be.eq(36);
    });





});
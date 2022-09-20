import { expect } from "chai";
import { getUUID } from "../../../src/utils/uuid";

describe("getUUID function", () => {
    it("It returns a new uuid", () => {
        const uuid = getUUID();
        expect(uuid).to.be.a("string");
        expect(uuid).to.have.lengthOf(36);
    });
});

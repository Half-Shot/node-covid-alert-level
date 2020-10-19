import { expect } from "chai";
import UkGovAreaProvider from "../src/providers/UkGov"

const DOWNING_STREET_POSTCODE = "SW1A 2AA";

describe("UkGovAreaProvider", () => {
    it("should be able to lookup a postcode", async () => {
        const ukProvider = new UkGovAreaProvider();
        const level = await ukProvider.getLevelForPostalCode(DOWNING_STREET_POSTCODE);
        expect(level).to.deep.equal({
            level: "High",
            guidanceUrl: "/guidance/local-covid-alert-level-high",
            areaDescription: "City of Westminster"
        });
    });
})
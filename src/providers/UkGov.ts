import AreaProvider, { LevelResult } from "./AreaProvider";
import Axios from "axios";
import parser from "node-html-parser";

const LEVEL_LOOKUP_URL = "https://www.gov.uk/find-coronavirus-local-restrictions";
const LEVEL_QUERY_SELECTOR = "html body main .govuk-grid-row .govuk-grid-column-two-thirds h1";
const LEVEL_QUERY_SELECTOR_AREA_NAME = "html body main .govuk-grid-row .govuk-grid-column-two-thirds .govuk-body";
const LEVEL_QUERY_SELECTOR_LINK = "html body main .govuk-grid-row .govuk-grid-column-two-thirds .govuk-body .govuk-link";

export enum UkGovLevels {
    "Medium",
    "High",
    "Very High",
}

export default class UkGovAreaProvider implements AreaProvider {
    public async getLevelForPostalCode(postcode: string): Promise<LevelResult> {
        const params = new URLSearchParams();
        params.append('postcode-lookup', postcode);
        const res = await Axios.post(LEVEL_LOOKUP_URL, params)
        const document = parser(res.data);
        if (!document.valid) {
            throw Error('HTML document was malformed');
        }
        const heading = document.querySelector(LEVEL_QUERY_SELECTOR).innerText;
        const level = heading.trim().replace("Local COVID Alert Level: ", "");
        if (level === "Find out the coronavirus restrictions in a local area") {
            throw Error('No result returned. postcode could be invalid');
        }
        if (!(level in UkGovLevels)) {
            throw Error(`Unable to determine level, got unlikely level: ${level}`);
        }
        const guidanceUrl = document.querySelector(LEVEL_QUERY_SELECTOR_LINK).getAttribute("href");
        let areaDescription = document.querySelector(LEVEL_QUERY_SELECTOR_AREA_NAME).innerText;
        const match = /to (.+)./.exec(areaDescription);
        areaDescription = match ? match[1] : "Unknown";
        return {
            level: level,
            areaDescription,
            guidanceUrl,
        };

    }

    public async getRulesForLevel(level: string): Promise<string[]> {
        return [level];
    }
}

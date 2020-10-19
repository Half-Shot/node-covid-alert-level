export interface LevelResult {
    areaDescription: string;
    level: string;
    guidanceUrl?: string;
}

export default interface AreaProvider {
    getLevelForPostalCode(postcode: string): Promise<LevelResult>;
}
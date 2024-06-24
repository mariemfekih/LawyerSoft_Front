import { LocationType } from "../LocationType";

export class LocationTypeTranslator {
    static translateFrLocation(app: LocationType): string {
        switch (app) {
            case LocationType.ONLINE:
                return 'En ligne';
            case LocationType.IN_PERSON:
                return 'Face à face';
        }
    }
}

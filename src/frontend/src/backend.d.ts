import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VastuTip {
    title: string;
    description: string;
    category: string;
    benefit: string;
}
export type Time = bigint;
export interface KundaliRequest {
    id: bigint;
    placeOfBirth: string;
    dateOfBirth: string;
    name: string;
    email: string;
    timeOfBirth: string;
}
export interface Horoscope {
    date: Time;
    message: string;
    rashi: string;
}
export interface Astrologer {
    name: string;
    languages: string;
    experience: bigint;
    specialization: string;
    rating: number;
}
export interface Rashi {
    element: string;
    description: string;
    rulingPlanet: string;
    englishName: string;
    hindiName: string;
    dateRange: string;
}
export interface Numerology {
    title: string;
    strengths: string;
    description: string;
    number: bigint;
    challenges: string;
}
export interface backendInterface {
    findRashi(name: string): Promise<Rashi>;
    getAllAstrologers(): Promise<Array<Astrologer>>;
    getAllNumerology(): Promise<Array<Numerology>>;
    getAllRashis(): Promise<Array<Rashi>>;
    getAllVastuTips(): Promise<Array<VastuTip>>;
    getAstrologersByExperience(): Promise<Array<Astrologer>>;
    getAstrologersBySpecialization(specialization: string): Promise<Array<Astrologer>>;
    getHoroscope(rashi: string): Promise<Horoscope>;
    getKundaliRequest(id: bigint): Promise<KundaliRequest>;
    getNumerology(number: bigint): Promise<Numerology>;
    getVastuByCategory(category: string): Promise<Array<VastuTip>>;
    submitKundaliRequest(name: string, dateOfBirth: string, timeOfBirth: string, placeOfBirth: string, email: string): Promise<bigint>;
    updateHoroscope(rashi: string, message: string): Promise<void>;
}

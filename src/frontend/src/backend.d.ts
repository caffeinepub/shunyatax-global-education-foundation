import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactForm {
    id: string;
    name: string;
    read: boolean;
    submittedAt: bigint;
    email: string;
    message: string;
}
export interface Event {
    id: string;
    status: string;
    title: string;
    venue: string;
    date: bigint;
    publishedAt: bigint;
    description: string;
    image?: ExternalBlob;
    location: string;
}
export type Principal = Principal;
export interface SiteSettings {
    backgroundColor: string;
    footerLinks: Array<SiteSettingsLink>;
    primaryColor: string;
    headerLogo?: ExternalBlob;
    headerLinks: Array<SiteSettingsLink>;
    socialMediaLinks: Array<SiteSettingsLink>;
    newsletterSignupText: string;
    headerSlogan: string;
    fontFamily: string;
    secondaryColor: string;
    copyright: string;
    footerText: string;
}
export interface Donation {
    id: string;
    name: string;
    message: string;
    timestamp: bigint;
    amount: number;
}
export interface SiteSettingsLink {
    url: string;
    order: bigint;
    icon: string;
    text: string;
}
export interface Program {
    id: string;
    title: string;
    description: string;
    outcomes: Array<string>;
    category: string;
    image?: ExternalBlob;
    objectives: Array<string>;
}
export interface TeamMember {
    id: string;
    bio: string;
    displayOrder: bigint;
    name: string;
    role: string;
    visible: boolean;
    photo?: ExternalBlob;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    displayOrder: bigint;
    visible: boolean;
    category: string;
    image: ExternalBlob;
    altText: string;
}
export interface ImpactStory {
    id: string;
    title: string;
    published: boolean;
    story: string;
    image?: ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDonation(name: string, amount: number, message: string): Promise<Donation>;
    addEvent(title: string, date: bigint, location: string, description: string, status: string, image: ExternalBlob | null, venue: string): Promise<Event | null>;
    addFooterLink(newLink: {
        url: string;
        order: bigint;
        icon: string;
        text: string;
    }): Promise<void>;
    addGalleryItem(title: string, altText: string, category: string, image: ExternalBlob, displayOrder: bigint): Promise<GalleryItem | null>;
    addHeaderLink(newLink: {
        url: string;
        order: bigint;
        icon: string;
        text: string;
    }): Promise<void>;
    addImpactStory(title: string, story: string, image: ExternalBlob | null): Promise<ImpactStory | null>;
    addProgram(title: string, description: string, category: string, objectives: Array<string>, outcomes: Array<string>, image: ExternalBlob | null): Promise<Program | null>;
    addSocialMediaLink(newLink: {
        url: string;
        order: bigint;
        icon: string;
        text: string;
    }): Promise<void>;
    addTeamMember(name: string, role: string, bio: string, photo: ExternalBlob | null, displayOrder: bigint): Promise<TeamMember | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    associateEmailWithPrincipal(email: string, principal: Principal): Promise<void>;
    deleteContactForm(id: string): Promise<boolean>;
    deleteEvent(id: string): Promise<boolean>;
    deleteGalleryItem(id: bigint): Promise<boolean>;
    deleteImpactStory(id: string): Promise<boolean>;
    deleteProgram(id: string): Promise<boolean>;
    deleteTeamMember(id: string): Promise<boolean>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllDonations(): Promise<Array<Donation>>;
    getAllEvents(): Promise<Array<Event>>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllGalleryItemsAdmin(): Promise<Array<GalleryItem>>;
    getAllImpactStories(): Promise<Array<ImpactStory>>;
    getAllImpactStoriesAdmin(): Promise<Array<ImpactStory>>;
    getAllPrograms(): Promise<Array<Program>>;
    getAllTeamMembers(): Promise<Array<TeamMember>>;
    getAllTeamMembersAdmin(): Promise<Array<TeamMember>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<{
        totalPastEvents: bigint;
        totalEvents: bigint;
        totalContactForms: bigint;
        totalTeamMembers: bigint;
        totalImpactStories: bigint;
        totalPrograms: bigint;
        totalDonations: bigint;
        totalUpcomingEvents: bigint;
    }>;
    getEvent(id: string): Promise<Event | null>;
    getEventByYear(year: bigint): Promise<Array<Event>>;
    getGalleryItem(id: bigint): Promise<GalleryItem | null>;
    getGalleryItemsByCategory(category: string): Promise<Array<GalleryItem>>;
    getPastEvents(): Promise<Array<Event>>;
    getProgram(id: string): Promise<Program | null>;
    getProgramsByCategory(category: string): Promise<Array<Program>>;
    getSiteSettings(): Promise<SiteSettings>;
    getUpcomingEvents(): Promise<Array<Event>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    grantAdminRoleByEmail(email: string, emailPrincipal: Principal): Promise<void>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    markContactFormAsRead(id: string, read: boolean): Promise<boolean>;
    registerEmail(email: string): Promise<void>;
    removeFooterLink(index: bigint): Promise<void>;
    removeHeaderLink(index: bigint): Promise<void>;
    removeSocialMediaLink(index: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<ContactForm>;
    updateEvent(id: string, title: string, date: bigint, location: string, description: string, status: string, image: ExternalBlob | null, venue: string): Promise<Event | null>;
    updateGalleryItem(id: bigint, title: string, altText: string, category: string, image: ExternalBlob, displayOrder: bigint, visible: boolean): Promise<GalleryItem | null>;
    updateImpactStory(id: string, title: string, story: string, image: ExternalBlob | null, published: boolean): Promise<ImpactStory | null>;
    updateProgram(id: string, title: string, description: string, category: string, objectives: Array<string>, outcomes: Array<string>, image: ExternalBlob | null): Promise<Program | null>;
    updateSiteSettings(newSettings: SiteSettings): Promise<void>;
    updateTeamMember(id: string, name: string, role: string, bio: string, photo: ExternalBlob | null, displayOrder: bigint, visible: boolean): Promise<TeamMember | null>;
}

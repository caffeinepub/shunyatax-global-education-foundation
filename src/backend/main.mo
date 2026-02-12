import AccessControl "authorization/access-control";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principals "mo:core/Principal";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  let adminEmails = Map.empty<Text, Principals.Principal>();

  // Site Settings
  public type SiteSettings = {
    logo : ?Storage.ExternalBlob;
    headerLinks : [SiteSettingsLink];
    headerSlogan : Text;
    footerText : Text;
    footerLinks : [SiteSettingsLink];
    socialMediaLinks : [SiteSettingsLink];
    copyright : Text;
    newsletterSignupText : Text;
    primaryColor : Text;
    secondaryColor : Text;
    backgroundColor : Text;
    fontFamily : Text;
  };

  public type SiteSettingsLink = {
    text : Text;
    url : Text;
    icon : Text;
    order : Nat;
  };

  var siteSettings : SiteSettings = {
    logo = null;
    headerLinks = [];
    headerSlogan = "Helping Hands, Changing Lives";
    footerText = "Together, we can make a difference. Supporting children, families, and communities.";
    footerLinks = [];
    socialMediaLinks = [];
    copyright = "© 2024 Help Hands. All rights reserved.";
    newsletterSignupText = "Sign up for updates and share our mission.";
    primaryColor = "#0A87FF";
    secondaryColor = "#FFD700";
    backgroundColor = "#E7F1FF";
    fontFamily = "Roboto, Arial, sans-serif";
  };

  public shared ({ caller }) func updateSiteSettings(newSettings : SiteSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update site settings");
    };
    siteSettings := newSettings;
  };

  public query ({ caller }) func getSiteSettings() : async SiteSettings {
    siteSettings;
  };

  public shared ({ caller }) func addHeaderLink(newLink : {
    text : Text;
    url : Text;
    icon : Text;
    order : Nat;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add header links");
    };

    let link : SiteSettingsLink = {
      text = newLink.text;
      url = newLink.url;
      icon = newLink.icon;
      order = newLink.order;
    };

    siteSettings := {
      siteSettings with
      headerLinks = Array.tabulate(siteSettings.headerLinks.size() + 1, func(i) { if (i < siteSettings.headerLinks.size()) { siteSettings.headerLinks[i] } else { link } })
    };
  };

  public shared ({ caller }) func addFooterLink(newLink : {
    text : Text;
    url : Text;
    icon : Text;
    order : Nat;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add footer links");
    };

    let link : SiteSettingsLink = {
      text = newLink.text;
      url = newLink.url;
      icon = newLink.icon;
      order = newLink.order;
    };

    siteSettings := {
      siteSettings with
      footerLinks = Array.tabulate(siteSettings.footerLinks.size() + 1, func(i) { if (i < siteSettings.footerLinks.size()) { siteSettings.footerLinks[i] } else { link } })
    };
  };

  public shared ({ caller }) func addSocialMediaLink(newLink : {
    text : Text;
    url : Text;
    icon : Text;
    order : Nat;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add social media links");
    };

    let link : SiteSettingsLink = {
      text = newLink.text;
      url = newLink.url;
      icon = newLink.icon;
      order = newLink.order;
    };

    siteSettings := {
      siteSettings with
      socialMediaLinks = Array.tabulate(siteSettings.socialMediaLinks.size() + 1, func(i) { if (i < siteSettings.socialMediaLinks.size()) { siteSettings.socialMediaLinks[i] } else { link } })
    };
  };

  public shared ({ caller }) func removeHeaderLink(index : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove header links");
    };

    if (index >= siteSettings.headerLinks.size()) {
      Runtime.trap("Index out of bounds");
    };

    siteSettings := {
      siteSettings with
      headerLinks = Array.tabulate(siteSettings.headerLinks.size() - 1, func(i) { if (i < index) { siteSettings.headerLinks[i] } else { siteSettings.headerLinks[i + 1] } })
    };
  };

  public shared ({ caller }) func removeFooterLink(index : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove footer links");
    };

    if (index >= siteSettings.footerLinks.size()) {
      Runtime.trap("Index out of bounds");
    };

    siteSettings := {
      siteSettings with
      footerLinks = Array.tabulate(siteSettings.footerLinks.size() - 1, func(i) { if (i < index) { siteSettings.footerLinks[i] } else { siteSettings.footerLinks[i + 1] } })
    };
  };

  public shared ({ caller }) func removeSocialMediaLink(index : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove social media links");
    };

    if (index >= siteSettings.socialMediaLinks.size()) {
      Runtime.trap("Index out of bounds");
    };

    siteSettings := {
      siteSettings with
      socialMediaLinks = Array.tabulate(siteSettings.socialMediaLinks.size() - 1, func(i) { if (i < index) { siteSettings.socialMediaLinks[i] } else { siteSettings.socialMediaLinks[i + 1] } })
    };
  };

  // User Management
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principals.Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public shared ({ caller }) func registerEmail(email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can register emails");
    };
    adminEmails.add(email, Principals.fromText("anonymous"));
  };

  public shared ({ caller }) func associateEmailWithPrincipal(email : Text, principal : Principals.Principal) : async () {
    if (caller != principal and not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Can only associate your own principal or be an admin");
    };
    switch (adminEmails.get(email)) {
      case (null) {
        Runtime.trap("Email not registered");
      };
      case (?existing) {
        if (existing != Principals.fromText("anonymous")) {
          Runtime.trap("Email already associated with a principal");
        };
        adminEmails.add(email, principal);
      };
    };
  };

  public shared ({ caller }) func grantAdminRoleByEmail(email : Text, emailPrincipal : Principals.Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can grant admin roles by email.");
    };

    switch (adminEmails.get(email)) {
      case (?principal) {
        switch (principal) {
          case (existingPrincipal) {
            if (existingPrincipal == Principals.fromText("anonymous")) {
              Runtime.trap("Email not yet associated with a principal.");
            } else if (existingPrincipal == caller) {
              AccessControl.assignRole(accessControlState, caller, existingPrincipal, #admin);
            } else if (existingPrincipal == emailPrincipal) {
              AccessControl.assignRole(accessControlState, caller, existingPrincipal, #admin);
            } else {
              Runtime.trap("Auth failed: Principal does not match.");
            };
          };
        };
      };
      case (null) {
        Runtime.trap("Email not registered.");
      };
    };
  };

  public type UserProfile = {
    name : Text;
    // Other user metadata
  };

  let userProfiles = Map.empty<Principals.Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user: Principals.Principal) : async ?UserProfile {
      if(caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("User not authorized for requested action. Only owner can access this data.");
      };
      userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type Program = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    objectives : [Text];
    outcomes : [Text];
    image : ?Storage.ExternalBlob;
  };

  public type TeamMember = {
    id : Text;
    name : Text;
    role : Text;
    bio : Text;
    photo : ?Storage.ExternalBlob;
    displayOrder : Nat;
    visible : Bool;
  };

  public type ImpactStory = {
    id : Text;
    title : Text;
    story : Text;
    image : ?Storage.ExternalBlob;
    published : Bool;
  };

  public type ContactForm = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Int;
    read : Bool;
  };

  public type Donation = {
    id : Text;
    name : Text;
    amount : Float;
    message : Text;
    timestamp : Int;
  };

  public type Event = {
    id : Text;
    title : Text;
    date : Int;
    location : Text;
    description : Text;
    status : Text;
    image : ?Storage.ExternalBlob;
    publishedAt : Int;
    venue : Text;
  };

  module Program {
    public func compare(p1 : Program, p2 : Program) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  module TeamMember {
    public func compare(t1 : TeamMember, t2 : TeamMember) : Order.Order {
      Text.compare(t1.name, t2.name);
    };
  };

  module ImpactStory {
    public func compare(i1 : ImpactStory, i2 : ImpactStory) : Order.Order {
      Text.compare(i1.title, i2.title);
    };
  };

  module Event {
    public func compare(e1 : Event, e2 : Event) : Order.Order {
      if (e1.date < e2.date) { #less } else if (e1.date > e2.date) { #greater } else {
        Text.compare(e1.title, e2.title);
      };
    };
  };

  public type GalleryItem = {
    id : Nat;
    title : Text;
    altText : Text;
    category : Text;
    image : Storage.ExternalBlob;
    displayOrder : Nat;
    visible : Bool;
  };

  // Programs Management
  let programsMap = Map.empty<Text, Program>();

  public shared ({ caller }) func addProgram(
    title : Text,
    description : Text,
    category : Text,
    objectives : [Text],
    outcomes : [Text],
    image : ?Storage.ExternalBlob
  ) : async ?Program {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add programs");
    };
    let program : Program = {
      id = title.concat("_").concat(category);
      title;
      description;
      category;
      objectives;
      outcomes;
      image;
    };
    programsMap.add(program.id, program);
    ?program;
  };

  public shared ({ caller }) func updateProgram(
    id : Text,
    title : Text,
    description : Text,
    category : Text,
    objectives : [Text],
    outcomes : [Text],
    image : ?Storage.ExternalBlob
  ) : async ?Program {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update programs");
    };
    switch (programsMap.get(id)) {
      case (null) { null };
      case (?_) {
        let updatedProgram : Program = {
          id;
          title;
          description;
          category;
          objectives;
          outcomes;
          image;
        };
        programsMap.add(id, updatedProgram);
        ?updatedProgram;
      };
    };
  };

  public shared ({ caller }) func deleteProgram(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete programs");
    };
    switch (programsMap.get(id)) {
      case (null) { false };
      case (?_) {
        programsMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllPrograms() : async [Program] {
    programsMap.values().toArray().sort();
  };

  public query ({ caller }) func getProgramsByCategory(category : Text) : async [Program] {
    programsMap.values().toArray().filter(
      func(program) { program.category == category }
    );
  };

  public query ({ caller }) func getProgram(id : Text) : async ?Program {
    programsMap.get(id);
  };

  // Team Management
  let teamMembersMap = Map.empty<Text, TeamMember>();

  public shared ({ caller }) func addTeamMember(
    name : Text,
    role : Text,
    bio : Text,
    photo : ?Storage.ExternalBlob,
    displayOrder : Nat
  ) : async ?TeamMember {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add team members");
    };
    let teamMember : TeamMember = {
      id = name.concat("_").concat(role);
      name;
      role;
      bio;
      photo;
      displayOrder;
      visible = true;
    };
    teamMembersMap.add(teamMember.id, teamMember);
    ?teamMember;
  };

  public shared ({ caller }) func updateTeamMember(
    id : Text,
    name : Text,
    role : Text,
    bio : Text,
    photo : ?Storage.ExternalBlob,
    displayOrder : Nat,
    visible : Bool
  ) : async ?TeamMember {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update team members");
    };
    switch (teamMembersMap.get(id)) {
      case (null) { null };
      case (?_) {
        let updatedTeamMember : TeamMember = {
          id;
          name;
          role;
          bio;
          photo;
          displayOrder;
          visible;
        };
        teamMembersMap.add(id, updatedTeamMember);
        ?updatedTeamMember;
      };
    };
  };

  public shared ({ caller }) func deleteTeamMember(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete team members");
    };
    switch (teamMembersMap.get(id)) {
      case (null) { false };
      case (?_) {
        teamMembersMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllTeamMembers() : async [TeamMember] {
    let activeMembers = teamMembersMap.values().toArray().sort();
    activeMembers.filter(
      func(member) { member.visible }
    );
  };

  public query ({ caller }) func getAllTeamMembersAdmin() : async [TeamMember] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all team members");
    };
    teamMembersMap.values().toArray().sort();
  };

  // Impact Stories Management
  let impactStoriesMap = Map.empty<Text, ImpactStory>();

  public shared ({ caller }) func addImpactStory(
    title : Text,
    story : Text,
    image : ?Storage.ExternalBlob
  ) : async ?ImpactStory {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add impact stories");
    };
    let impactStory : ImpactStory = {
      id = title.concat("_").concat(story.size().toText());
      title;
      story;
      image;
      published = false;
    };
    impactStoriesMap.add(impactStory.id, impactStory);
    ?impactStory;
  };

  public shared ({ caller }) func updateImpactStory(
    id : Text,
    title : Text,
    story : Text,
    image : ?Storage.ExternalBlob,
    published : Bool
  ) : async ?ImpactStory {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update impact stories");
    };
    switch (impactStoriesMap.get(id)) {
      case (null) { null };
      case (?_) {
        let updatedStory : ImpactStory = {
          id;
          title;
          story;
          image;
          published;
        };
        impactStoriesMap.add(id, updatedStory);
        ?updatedStory;
      };
    };
  };

  public shared ({ caller }) func deleteImpactStory(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete impact stories");
    };
    switch (impactStoriesMap.get(id)) {
      case (null) { false };
      case (?_) {
        impactStoriesMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllImpactStories() : async [ImpactStory] {
    let publishedStories = impactStoriesMap.values().toArray().sort();
    publishedStories.filter(
      func(story) { story.published }
    );
  };

  public query ({ caller }) func getAllImpactStoriesAdmin() : async [ImpactStory] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all impact stories");
    };
    impactStoriesMap.values().toArray().sort();
  };

  // Contact Form Management
  let contactFormsMap = Map.empty<Text, ContactForm>();

  public shared ({ caller }) func submitContactForm(
    name : Text,
    email : Text,
    message : Text
  ) : async ContactForm {
    let form : ContactForm = {
      id = name.concat("_").concat(email).concat("_").concat(Time.now().toText());
      name;
      email;
      message;
      submittedAt = Time.now();
      read = false;
    };
    contactFormsMap.add(form.id, form);
    form;
  };

  public shared ({ caller }) func markContactFormAsRead(id : Text, read : Bool) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can mark contact forms as read");
    };
    switch (contactFormsMap.get(id)) {
      case (null) { false };
      case (?form) {
        let updatedForm : ContactForm = {
          id = form.id;
          name = form.name;
          email = form.email;
          message = form.message;
          submittedAt = form.submittedAt;
          read;
        };
        contactFormsMap.add(id, updatedForm);
        true;
      };
    };
  };

  public shared ({ caller }) func deleteContactForm(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete contact forms");
    };
    switch (contactFormsMap.get(id)) {
      case (null) { false };
      case (?_) {
        contactFormsMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact forms");
    };
    contactFormsMap.values().toArray();
  };

  // Donations Management
  let donationsMap = Map.empty<Text, Donation>();

  public shared ({ caller }) func addDonation(
    name : Text,
    amount : Float,
    message : Text
  ) : async Donation {
    let donation : Donation = {
      id = name.concat("_").concat(amount.toText()).concat("_").concat(Time.now().toText());
      name;
      amount;
      message;
      timestamp = Time.now();
    };
    donationsMap.add(donation.id, donation);
    donation;
  };

  public query ({ caller }) func getAllDonations() : async [Donation] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view donations");
    };
    donationsMap.values().toArray();
  };

  // Event Management
  let eventsMap = Map.empty<Text, Event>();

  public shared ({ caller }) func addEvent(title : Text, date : Int, location : Text, description : Text, status : Text, image : ?Storage.ExternalBlob, venue : Text) : async ?Event {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add events");
    };
    let event : Event = {
      id = title.concat("_").concat(date.toText());
      title;
      date;
      location;
      description;
      status;
      image;
      publishedAt = Time.now();
      venue;
    };
    eventsMap.add(event.id, event);
    ?event;
  };

  public shared ({ caller }) func updateEvent(
    id : Text,
    title : Text,
    date : Int,
    location : Text,
    description : Text,
    status : Text,
    image : ?Storage.ExternalBlob,
    venue : Text
  ) : async ?Event {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update events");
    };
    switch (eventsMap.get(id)) {
      case (null) { null };
      case (?_) {
        let updatedEvent : Event = {
          id;
          title;
          date;
          location;
          description;
          status;
          image;
          publishedAt = Time.now();
          venue;
        };
        eventsMap.add(id, updatedEvent);
        ?updatedEvent;
      };
    };
  };

  public shared ({ caller }) func deleteEvent(id : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete events");
    };
    switch (eventsMap.get(id)) {
      case (null) { false };
      case (?_) {
        eventsMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllEvents() : async [Event] {
    eventsMap.values().toArray();
  };

  public query ({ caller }) func getUpcomingEvents() : async [Event] {
    let currentTime = Time.now();
    let upcoming = eventsMap.values().toArray().filter(
      func(event) { event.date > currentTime }
    );
    upcoming.sort();
  };

  public query ({ caller }) func getPastEvents() : async [Event] {
    let currentTime = Time.now();
    let past = eventsMap.values().toArray().filter(
      func(event) { event.date < currentTime }
    );
    past.sort();
  };

  public query ({ caller }) func getEventByYear(year : Int) : async [Event] {
    let eventsForYear = eventsMap.values().toArray().filter(
      func(event) {
        let eventYear = 1970 + (event.date / (365 * 24 * 60 * 60 * 1000000000));
        eventYear == year;
      }
    );
    eventsForYear;
  };

  public query ({ caller }) func getEvent(id : Text) : async ?Event {
    eventsMap.get(id);
  };

  // Admin Dashboard Statistics
  public query ({ caller }) func getDashboardStats() : async {
    totalTeamMembers : Nat;
    totalImpactStories : Nat;
    totalPrograms : Nat;
    totalContactForms : Nat;
    totalDonations : Nat;
    totalEvents : Nat;
    totalUpcomingEvents : Nat;
    totalPastEvents : Nat;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };
    let currentTime = Time.now();
    let allEvents = eventsMap.values().toArray();

    let upcomingEventsCount = allEvents.filter(
      func(event) { event.date > currentTime }
    ).size();

    let pastEventsCount = allEvents.filter(
      func(event) { event.date < currentTime }
    ).size();

    {
      totalTeamMembers = teamMembersMap.size();
      totalImpactStories = impactStoriesMap.size();
      totalPrograms = programsMap.size();
      totalContactForms = contactFormsMap.size();
      totalDonations = donationsMap.size();
      totalEvents = allEvents.size();
      totalUpcomingEvents = upcomingEventsCount;
      totalPastEvents = pastEventsCount;
    };
  };

  // Gallery Management
  let galleryItemsMap = Map.empty<Nat, GalleryItem>();
  var lastGalleryId : Nat = 0;

  public shared ({ caller }) func addGalleryItem(
    title : Text,
    altText : Text,
    category : Text,
    image : Storage.ExternalBlob,
    displayOrder : Nat
  ) : async ?GalleryItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };

    let galleryItem : GalleryItem = {
      id = lastGalleryId + 1;
      title;
      altText;
      category;
      image;
      displayOrder;
      visible = true;
    };

    galleryItemsMap.add(galleryItem.id, galleryItem);
    lastGalleryId += 1;
    ?galleryItem;
  };

  public shared ({ caller }) func updateGalleryItem(
    id : Nat,
    title : Text,
    altText : Text,
    category : Text,
    image : Storage.ExternalBlob,
    displayOrder : Nat,
    visible : Bool
  ) : async ?GalleryItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update gallery items");
    };

    switch (galleryItemsMap.get(id)) {
      case (null) { null };
      case (?_) {
        let updatedGalleryItem : GalleryItem = {
          id;
          title;
          altText;
          category;
          image;
          displayOrder;
          visible;
        };
        galleryItemsMap.add(id, updatedGalleryItem);
        ?updatedGalleryItem;
      };
    };
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };

    switch (galleryItemsMap.get(id)) {
      case (null) { false };
      case (?_) {
        galleryItemsMap.remove(id);
        true;
      };
    };
  };

  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    let visibleItems = galleryItemsMap.values().toArray().filter(
      func(item) { item.visible }
    );
    visibleItems.sort(
      func(a, b) {
        Nat.compare(a.displayOrder, b.displayOrder);
      }
    );
  };

  public query ({ caller }) func getGalleryItemsByCategory(category : Text) : async [GalleryItem] {
    let filteredItems = galleryItemsMap.values().toArray().filter(
      func(item) { item.category == category and item.visible }
    );
    filteredItems.sort(
      func(a, b) {
        Nat.compare(a.displayOrder, b.displayOrder);
      }
    );
  };

  public query ({ caller }) func getGalleryItem(id : Nat) : async ?GalleryItem {
    galleryItemsMap.get(id);
  };

  public query ({ caller }) func getAllGalleryItemsAdmin() : async [GalleryItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all gallery items");
    };
    let allItems = galleryItemsMap.values().toArray();
    allItems.sort(
      func(a, b) {
        Nat.compare(a.displayOrder, b.displayOrder);
      }
    );
  };
};


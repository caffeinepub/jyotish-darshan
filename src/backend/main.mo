import Array "mo:core/Array";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type Rashi = {
    englishName : Text;
    hindiName : Text;
    dateRange : Text;
    element : Text;
    rulingPlanet : Text;
    description : Text;
  };

  type Horoscope = {
    rashi : Text;
    message : Text;
    date : Time.Time;
  };

  type KundaliRequest = {
    name : Text;
    dateOfBirth : Text;
    timeOfBirth : Text;
    placeOfBirth : Text;
    email : Text;
    id : Nat;
  };

  type Numerology = {
    number : Nat;
    title : Text;
    description : Text;
    strengths : Text;
    challenges : Text;
  };

  type VastuTip = {
    category : Text;
    title : Text;
    description : Text;
    benefit : Text;
  };

  type Astrologer = {
    name : Text;
    specialization : Text;
    experience : Nat; // years
    languages : Text;
    rating : Float; // 1-5
  };

  module Astrologer {
    public func compareByExperience(a : Astrologer, b : Astrologer) : Order.Order {
      Nat.compare(a.experience, b.experience);
    };
  };

  let rashis = List.fromArray<Rashi>([
    {
      englishName = "Aries";
      hindiName = "Mesh";
      dateRange = "March 21 - April 19";
      element = "Fire";
      rulingPlanet = "Mars";
      description = "Dynamic, confident, and courageous.";
    },
    {
      englishName = "Taurus";
      hindiName = "Vrishabh";
      dateRange = "April 20 - May 20";
      element = "Earth";
      rulingPlanet = "Venus";
      description = "Reliable, patient, and practical.";
    },
    {
      englishName = "Gemini";
      hindiName = "Mithun";
      dateRange = "May 21 - June 20";
      element = "Air";
      rulingPlanet = "Mercury";
      description = "Adaptable, curious, and communicative.";
    },
    {
      englishName = "Cancer";
      hindiName = "Kark";
      dateRange = "June 21 - July 22";
      element = "Water";
      rulingPlanet = "Moon";
      description = "Emotional, intuitive, and nurturing.";
    },
    {
      englishName = "Leo";
      hindiName = "Singh";
      dateRange = "July 23 - August 22";
      element = "Fire";
      rulingPlanet = "Sun";
      description = "Generous, charismatic, and confident.";
    },
    {
      englishName = "Virgo";
      hindiName = "Kanya";
      dateRange = "August 23 - September 22";
      element = "Earth";
      rulingPlanet = "Mercury";
      description = "Analytical, practical, and organized.";
    },
    {
      englishName = "Libra";
      hindiName = "Tula";
      dateRange = "September 23 - October 22";
      element = "Air";
      rulingPlanet = "Venus";
      description = "Diplomatic, fair-minded, and social.";
    },
    {
      englishName = "Scorpio";
      hindiName = "Vrishchik";
      dateRange = "October 23 - November 21";
      element = "Water";
      rulingPlanet = "Mars";
      description = "Passionate, resourceful, and brave.";
    },
    {
      englishName = "Sagittarius";
      hindiName = "Dhanu";
      dateRange = "November 22 - December 21";
      element = "Fire";
      rulingPlanet = "Jupiter";
      description = "Optimistic, adventurous, and independent.";
    },
    {
      englishName = "Capricorn";
      hindiName = "Makar";
      dateRange = "December 22 - January 19";
      element = "Earth";
      rulingPlanet = "Saturn";
      description = "Disciplined, responsible, and ambitious.";
    },
    {
      englishName = "Aquarius";
      hindiName = "Kumbh";
      dateRange = "January 20 - February 18";
      element = "Air";
      rulingPlanet = "Saturn";
      description = "Innovative, independent, and humanitarian.";
    },
    {
      englishName = "Pisces";
      hindiName = "Meen";
      dateRange = "February 19 - March 20";
      element = "Water";
      rulingPlanet = "Jupiter";
      description = "Compassionate, intuitive, and artistic.";
    },
  ]);

  let horoscopeStore = Map.empty<Text, Horoscope>();
  let kundaliRequests = Map.empty<Nat, KundaliRequest>();
  var nextKundaliId = 1;

  let numerologyStore = List.fromArray<Numerology>([
    {
      number = 1;
      title = "The Leader";
      description = "Independent, ambitious, and innovative.";
      strengths = "Courage, determination, leadership.";
      challenges = "Self-centeredness, stubbornness.";
    },
    {
      number = 2;
      title = "The Peacemaker";
      description = "Diplomatic, sensitive, and cooperative.";
      strengths = "Harmony, intuition, adaptability.";
      challenges = "Indecisiveness, avoidance of conflict.";
    },
    {
      number = 3;
      title = "The Communicator";
      description = "Creative, optimistic, and expressive.";
      strengths = "Inspiration, sociability, enthusiasm.";
      challenges = "Frivolousness, scattering energy.";
    },
    {
      number = 4;
      title = "The Builder";
      description = "Practical, disciplined, and reliable.";
      strengths = "Organization, hard work, stability.";
      challenges = "Rigidity, stubbornness.";
    },
    {
      number = 5;
      title = "The Explorer";
      description = "Adventurous, adaptable, and resourceful.";
      strengths = "Versatility, curiosity, freedom-loving.";
      challenges = "Restlessness, impatience.";
    },
    {
      number = 6;
      title = "The Nurturer";
      description = "Responsible, caring, and harmonious.";
      strengths = "Loyalty, compassion, balance.";
      challenges = "Overprotection, self-sacrifice.";
    },
    {
      number = 7;
      title = "The Seeker";
      description = "Analytical, intuitive, and introspective.";
      strengths = "Wisdom, spiritual growth, perception.";
      challenges = "Isolation, distrust.";
    },
    {
      number = 8;
      title = "The Achiever";
      description = "Ambitious, authoritative, and confident.";
      strengths = "Material success, leadership, efficiency.";
      challenges = "Authoritarianism, materialism.";
    },
    {
      number = 9;
      title = "The Humanitarian";
      description = "Compassionate, idealistic, and selfless.";
      strengths = "Generosity, artistic talent, global awareness.";
      challenges = "Over-sensitivity, unrealistic expectations.";
    },
    {
      number = 11;
      title = "The Visionary";
      description = "Inspiring, intuitive, spiritual leader.";
      strengths = "Creativity, insight, enlightenment.";
      challenges = "Nervous tension, self-doubt.";
    },
    {
      number = 22;
      title = "The Master Builder";
      description = "Practical, ambitious, visionary.";
      strengths = "Achievement, large-scale impact, wisdom.";
      challenges = "Overworking, self-neglect.";
    },
    {
      number = 33;
      title = "The Master Teacher";
      description = "Compassionate, selfless, nurturing.";
      strengths = "Humanitarianism, unconditional love, counsel.";
      challenges = "Self-sacrifice, avoidance of personal needs.";
    },
  ]);

  let vastuStore = List.fromArray<VastuTip>([
    {
      category = "North";
      title = "North Direction Tip";
      description = "Keep the north side open and light.";
      benefit = "Promotes wealth and prosperity.";
    },
    {
      category = "Bedroom";
      title = "Bedroom Vastu";
      description = "Place the bed in the southwest corner.";
      benefit = "Enhances stability and relationships.";
    },
    {
      category = "Kitchen";
      title = "Kitchen Placement";
      description = "Kitchen should be in the southeast direction.";
      benefit = "Improves health and digestion.";
    },
    {
      category = "Living Room";
      title = "Living Room Arrangement";
      description = "Keep living room in northeast direction.";
      benefit = "Brings harmony and positivity.";
    },
  ]);

  let astrologerStore = List.fromArray<Astrologer>([
    {
      name = "Pandit Sharma";
      specialization = "Vedic Astrology";
      experience = 15;
      languages = "Hindi, English";
      rating = 4.8;
    },
    {
      name = "Astrologer Singh";
      specialization = "Numerology";
      experience = 10;
      languages = "Hindi, Punjabi";
      rating = 4.5;
    },
    {
      name = "Tarot Reader Patel";
      specialization = "Tarot Reading";
      experience = 7;
      languages = "English, Gujarati";
      rating = 4.7;
    },
  ]);

  // Rashi Methods
  public query ({ caller }) func getAllRashis() : async [Rashi] {
    rashis.toArray();
  };

  public query ({ caller }) func findRashi(name : Text) : async Rashi {
    switch (rashis.find(func(r) { r.englishName.contains(#text name) or r.hindiName.contains(#text name) })) {
      case (null) { Runtime.trap("Rashi not found") };
      case (?rashi) { rashi };
    };
  };

  // Horoscope Methods
  public shared ({ caller }) func updateHoroscope(rashi : Text, message : Text) : async () {
    let horoscope : Horoscope = {
      rashi;
      message;
      date = Time.now();
    };
    horoscopeStore.add(rashi, horoscope);
  };

  public query ({ caller }) func getHoroscope(rashi : Text) : async Horoscope {
    switch (horoscopeStore.get(rashi)) {
      case (null) { Runtime.trap("No horoscope found for this rashi") };
      case (?horoscope) { horoscope };
    };
  };

  // Kundali Methods
  public shared ({ caller }) func submitKundaliRequest(
    name : Text,
    dateOfBirth : Text,
    timeOfBirth : Text,
    placeOfBirth : Text,
    email : Text,
  ) : async Nat {
    let request : KundaliRequest = {
      name;
      dateOfBirth;
      timeOfBirth;
      placeOfBirth;
      email;
      id = nextKundaliId;
    };
    kundaliRequests.add(nextKundaliId, request);
    nextKundaliId += 1;
    request.id;
  };

  public query ({ caller }) func getKundaliRequest(id : Nat) : async KundaliRequest {
    switch (kundaliRequests.get(id)) {
      case (null) { Runtime.trap("Kundali request not found") };
      case (?request) { request };
    };
  };

  // Numerology Methods
  public query ({ caller }) func getNumerology(number : Nat) : async Numerology {
    switch (numerologyStore.find(func(n) { n.number == number })) {
      case (null) { Runtime.trap("Numerology for this number not found") };
      case (?n) { n };
    };
  };

  public query ({ caller }) func getAllNumerology() : async [Numerology] {
    numerologyStore.toArray();
  };

  // Vastu Methods
  public query ({ caller }) func getVastuByCategory(category : Text) : async [VastuTip] {
    vastuStore.filter(func(v) { v.category == category }).toArray();
  };

  public query ({ caller }) func getAllVastuTips() : async [VastuTip] {
    vastuStore.toArray();
  };

  // Astrologer Methods
  public query ({ caller }) func getAllAstrologers() : async [Astrologer] {
    astrologerStore.toArray();
  };

  public query ({ caller }) func getAstrologersByExperience() : async [Astrologer] {
    astrologerStore.toArray().sort(Astrologer.compareByExperience);
  };

  public query ({ caller }) func getAstrologersBySpecialization(specialization : Text) : async [Astrologer] {
    astrologerStore.filter(func(a) { a.specialization.contains(#text specialization) }).toArray();
  };
};

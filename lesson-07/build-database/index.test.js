const { MongoClient } = require("mongodb");

const DATABASE_NAME = "shop";
const COLLECTION_NAME = "books";

// All books borrowed from here: https://www.bookdepository.com/back-to-the-90s

describe("Create a database full of books", () => {
  let client;
  let coll;

  beforeAll(async () => {
    if (!process.env.MONGODB_URL) {
      throw new Error(
        "You must create a .env file containing MONGODB_URL=your-mongodb-atlas-connection-string"
      );
    }
    client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    coll = client.db(DATABASE_NAME).collection(COLLECTION_NAME);
  });

  afterAll(async () => {
    await client.close();
  });

  // TESTS START HERE
  it("contains Fight Club", async () => {
    const fightClubBook = await coll.findOne({ title: "Fight Club" });
    expect(fightClubBook).toMatchObject({
      title: "Fight Club",
      author: "Chuck Palahniuk",
      price: 78.82,
      currency: "DKK",
      isbn13: "9780099765219",
    });
    expect(fightClubBook.description).toBe(
      "Every weekend, in basements and parking lots across the country, young men with good white-collar jobs and absent fathers take off their shoes and shirts and fight each other barehanded for as long as they have to. Then they go back to those jobs with blackened eyes and loosened teeth and the sense that they can handle anything. Fight Club is the invention of Tyler Durden, projectionist, waiter and dark, anarchic genius. And it's only the beginning of his plans for revenge on a world where cancer support groups have the corner on human warmth."
    );
    expect(fightClubBook.starRating).toBeCloseTo(4.19);
    expect(fightClubBook.ratingsCount).toBeGreaterThan(534300);
    expect(fightClubBook.ratingsCount).toBeLessThan(534400);
    expect(fightClubBook.language).toBe("English");
    expect(fightClubBook.publicationDate).toEqual(new Date("2006-05-01"));
    expect(fightClubBook.publisher).toMatch(/vintage publishing/i);
    expect(fightClubBook.categories).toEqual(["Contemporary Fiction"]);
    expect(fightClubBook.reviews).toHaveLength(1);
    expect(fightClubBook.reviews[0].author).toBe("Jan Pupik");
    expect(fightClubBook.reviews).toContainEqual(
      expect.objectContaining({
        description: "This is the most entertaining book I've ever read.",
        starRating: 5,
      })
    );
  });

  it("contains Jurrasic Park", async () => {
    const jurassicParkBook = await coll.findOne({ title: "Jurassic Park" });
    expect(jurassicParkBook).toMatchObject({
      title: "Jurassic Park",
      author: "Michael Crichton",
      price: 111.56,
      currency: "DKK",
      isbn13: "9781784752224",
    });
  });

  it("contains twelve books", async () => {
    const allBooks = await coll.find().toArray();
    // There should be twelve books
    expect(allBooks).toHaveLength(12);
    // They should have these titles
    expect(allBooks.map(({ title }) => title)).toEqual(
      expect.arrayContaining([
        "A Game of Thrones",
        "Bridget Jones's Diary",
        "The Perks of Being a Wallflower",
        "Fight Club",
        "Jurassic Park",
        "The Green Mile",
        "The God of Small Things",
        "Infinite Jest",
        "High Fidelity",
        "The English Patient",
        "About a Boy",
        "White Teeth",
      ])
    );
    // They should all have the required fields
    allBooks.forEach((book) => {
      expect(book).toMatchObject({
        title: expect.any(String),
        author: expect.any(String),
        price: expect.any(Number),
        currency: expect.any(String),
        ratingsCount: expect.any(Number),
        starRating: expect.any(Number),
        description: expect.any(String),
        isbn13: expect.stringMatching(/[0-9]{13}/),
        language: expect.any(String),
        publicationDate: expect.any(Date),
        publisher: expect.any(String),
        categories: expect.arrayContaining([expect.any(String)]),
        reviews: expect.arrayContaining([
          {
            description: expect.any(String),
            author: expect.any(String),
            starRating: expect.any(Number),
          },
        ]),
      });
    });
  });
});

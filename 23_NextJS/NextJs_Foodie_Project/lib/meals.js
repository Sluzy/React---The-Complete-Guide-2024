import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

// Doesn't need to be a promise (async) with sqlite3
export async function getMeals() {
    // This simulates loading time and can be removed
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Used to show/test error handling
    // throw new Error("Loading meals failed");

    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    // There should be added some form of uniqe/random to the filename
    // to avoid users overriding stored images

    // random number between 0 and 9999
    const randomNumber = Math.floor(Math.random() * 10000);
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}-${randomNumber}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Saving image failed!");
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}